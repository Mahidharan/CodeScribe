import * as vscode from "vscode";

export async function generateReadme(context: string): Promise<string> {
  const config = vscode.workspace.getConfiguration("codescribe");
  const apiKey = config.get<string>("openRouterApiKey");

  if (!apiKey) {
    throw new Error(
      "OpenRouter API key not found. Please add it in VS Code Settings.",
    );
  }

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://github.com",
        "X-Title": "CodeScribe",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat",
        temperature: 0.4,
        max_tokens: 1200,
        messages: [
          {
            role: "system",
            content:
              "You are a professional senior software engineer who writes clean, well-structured README.md files.",
          },
          {
            role: "user",
            content: `
Generate a professional README.md file using the project details below.

Project Information:
${context}

README must include:

# Project Title
## Description
## Tech Stack
## Installation
## Usage
## Folder Structure
## Available Scripts
## License

Return only valid markdown.
`,
          },
        ],
      }),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenRouter API Error: ${errorText}`);
  }

  const data: any = await response.json();

  if (!data?.choices?.[0]?.message?.content) {
    throw new Error("Invalid response from DeepSeek model.");
  }

  return data.choices[0].message.content.trim();
}
