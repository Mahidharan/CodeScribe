import OpenAI from "openai";
import { ProjectNode } from "../Scanner/projectScanner";
import "dotenv/config";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function collectFileNames(node: ProjectNode, files: string[] = []): string[] {
  if (node.type === "file") {
    files.push(node.name);
  }

  if (node.children) {
    for (const child of node.children) {
      collectFileNames(child, files);
    }
  }
  return files;
}

export async function generateAISummary(tree: ProjectNode): Promise<string> {
  const files = collectFileNames(tree).slice(0, 50);

  const prompt = `You are a senior software engineer.

Given the following project files: ${files.join(",")} 
Write a short project summary (2–3 sentences).
Do NOT list file names.
Explain what the project is about.  System Requirements. `;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.4,
  });

  return response.choices[0].message.content ?? "";
}
