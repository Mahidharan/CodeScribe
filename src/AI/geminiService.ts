import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";

dotenv.config();

const API_KEY = "AIzaSyAxTsijZUEPBsCxKZgdvABBQxNz83SysBw";

export async function generateReadme(context: string): Promise<string> {
  if (!API_KEY) {
    throw new Error("Gemini API key not found.");
  }

  const genAI = new GoogleGenerativeAI(API_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });

  const prompt = `
  You are an expert software documentation assistant.

Based on the structured project information below, generate a professional project summary (2–3 paragraphs).

Do not include markdown headings.
Do not generate folder structure.
Only generate a clean summary describing:
- What the project is
- Technologies used
- Key features

Project Information:
${context}

Generate sections:
# Project Title
## Description
## Tech Stack
## Installation
## Usage
## Folder Structure
## Available Scripts
## License
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;

  const text = response.text();

  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }
  return text;
}
