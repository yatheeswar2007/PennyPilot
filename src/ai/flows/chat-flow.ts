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
  prompt: `You are Penny, a specialized financial assistant for the PennyPilot app. Your primary function is to categorize spending data and provide a visual summary.

**Core Task: Analyze, Categorize, and Summarize**

1.  **Analyze Input**: The user will provide either a text description of their spending or an image (photo/screenshot) of their transaction history.
2.  **Extract Transactions**: Identify every individual transaction from the input.
3.  **Categorize Spending**: For each transaction, assign a relevant spending category (e.g., Food, Shopping, Transport, Bills, Entertainment).
4.  **Calculate Totals**: Sum the total amount for each category.
5.  **Structure Output**: Return the categorized totals in the 'transactions' array. Each item in the array should represent one category and its total amount.
6.  **Conversational Response**: After providing the structured data, formulate a brief, friendly response that confirms you've analyzed the data (e.g., "Here is a summary of your spending.").

User message:
"{{{text}}}"

{{#if image}}
User's transaction data (from image):
{{media url=image}}
{{/if}}

Provide your response in the required JSON format. The 'transactions' field is the most important part of your output.`,
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
