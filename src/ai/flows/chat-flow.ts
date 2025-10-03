'use server';
/**
 * @fileOverview A multi-modal chatbot flow that can understand text and images.
 *
 * This flow is designed to analyze transaction screenshots, extract data,
 * and provide both a conversational response and structured JSON data for charting.
 *
 * - chat - The main function to interact with the chatbot.
 * - ChatInput - The input type for the chat function (text and optional image).
 * - ChatOutput - The return type for the chat function (response text and structured data).
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const ChatInputSchema = z.object({
  text: z.string().describe('The user\'s text message.'),
  image: z
    .string()
    .optional()
    .describe(
      "An optional image of a transaction history, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const TransactionDataSchema = z.object({
  category: z.string().describe('The spending category for the transaction (e.g., Food, Transport).'),
  amount: z.number().describe('The numerical amount of the transaction.'),
});

const ChatOutputSchema = z.object({
  response: z.string().describe('A friendly, conversational response to the user.'),
  transactions: z
    .array(TransactionDataSchema)
    .optional()
    .describe(
      'An array of structured transaction data extracted from the image. Only present if an image was successfully analyzed.'
    ),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatPrompt',
  input: {schema: ChatInputSchema},
  output: {schema: ChatOutputSchema},
  prompt: `You are Penny, a friendly and helpful financial assistant for the PennyPilot app. Your goal is to assist users with their financial questions and analyze their spending.

- If the user provides only text, engage in a friendly conversation, answer their question, or guide them.
- If the user provides an image, assume it is a screenshot of their transaction history.
- Analyze the image to identify and extract individual transactions.
- For each transaction, determine a relevant spending category (e.g., Food, Shopping, Transport, Bills, Entertainment, etc.) and the amount.
- Formulate a brief, conversational response summarizing what you found (e.g., "I've analyzed your transactions! It looks like most of your spending was on...").
- **Crucially**, also provide the extracted data in the structured 'transactions' array format.

User message:
"{{{text}}}"

{{#if image}}
User's transaction screenshot:
{{media url=image}}
{{/if}}

Provide your response in the required JSON format.`,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
