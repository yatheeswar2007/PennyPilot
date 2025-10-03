
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
  categorizedText: z
    .string()
    .optional()
    .describe(
      'A simple, plain text, multi-line summary of spending categories and their totals. Example format: "Food: 68.50\\nGroceries: 155.20"'
    ),
  transactions: z
    .array(TransactionDataSchema)
    .optional()
    .describe(
      'An array of structured transaction data extracted from the input. This is used for generating charts.'
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
  prompt: `You are Penny, a specialized financial assistant for the PennyPilot app. Your primary function is to categorize spending data and present it clearly.

**Primary Task: Analyze, Categorize, and Summarize in Two Formats**

1.  **Analyze Input**: The user will provide either a text description of their spending or an image (photo/screenshot) of their transaction history.
2.  **Extract & Categorize**: Identify every individual transaction from the input. Assign a relevant spending category (e.g., Food, Shopping, Transport, Bills, Entertainment, Groceries, Health, Education, Housing, Savings, Others). Handle credits/income appropriately.
3.  **Calculate Category Totals**: Sum the total amount for each category.

**Output Generation (Crucial):**

You MUST generate three distinct outputs:

a.  **\`categorizedText\` (Plain Text Summary)**: First, create a simple, multi-line text summary. Each line must be in the format 'Category: Amount'. Do NOT add currency symbols. This is for quick reading.
    *Example:*
    Food: 68.50
    Groceries: 155.20
    Entertainment: 132.00

b.  **\`transactions\` (JSON for Charting)**: Second, create a structured JSON array for the visual chart. Each item in the array should represent one category and its total amount.
    *Example:* \`[{"category": "Food", "amount": 68.50}, {"category": "Groceries", "amount": 155.20}]\`

c.  **\`response\` (Conversational Text)**: Finally, formulate a brief, friendly response that confirms you've analyzed the data (e.g., "Here is a summary of your spending.").

User message:
"{{{text}}}"

{{#if image}}
User's transaction data (from image):
{{media url=image}}
{{/if}}

Provide your full response in the required JSON format, ensuring all three fields (\`categorizedText\`, \`transactions\`, \`response\`) are populated correctly based on your analysis.`,
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
