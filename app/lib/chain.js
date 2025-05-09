import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";

export async function summarizeReadme(readmeContent) {
  // Define schema for structured output
  const parser = StructuredOutputParser.fromZodSchema(
    z.object({
      summary: z.string().describe("A concise summary of the GitHub repository"),
      cool_facts: z.array(z.string()).describe("List of interesting facts about the repository")
    })
  );

  const formatInstructions = parser.getFormatInstructions();

  const prompt = ChatPromptTemplate.fromTemplate(
    `Please provide a summary and interesting facts about this GitHub repository based on its README.

{format_instructions}

README content:
{readme}`
  );

  const model = new ChatOpenAI({
    temperature: 0,
    modelName: "gpt-3.5-turbo"
  });

  const chain = RunnableSequence.from([
    {
      readme: (input) => input,
      format_instructions: () => formatInstructions
    },
    prompt,
    model,
    parser
  ]);

  const result = await chain.invoke(readmeContent);
  return result;
} 