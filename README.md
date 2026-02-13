# CodeScribe

A Visual Studio Code extension that generates, updates, and keeps project documentation in sync with your codebase.

## Key Features

- Generate professional README.md files from project metadata
- Create summaries and API-style docs using AI-powered prompts
- Sync documentation to reflect folder and file structure changes
- Configurable AI backend and temperature/max-token settings

## Requirements

- Visual Studio Code 1.60 or later
- Node.js 16+ (for development tasks)

## Quickstart

1. Install the extension locally or from the Marketplace.
2. Open the Command Palette (Ctrl+Shift+P / Cmd+Shift+P).
3. Run the `CodeScribe: Generate README` command to create a README from your project.

## Configuration

Open Settings and configure the following under the `codescribe` section:

- `codescribe.openRouterApiKey` (string) — Required. Your OpenRouter / DeepSeek API key used for AI generation. Keep this secret; do not commit it to source control.
- `codescribe.defaultTemperature` (number) — Optional. Controls AI creativity (default: 0.4).
- `codescribe.maxTokens` (number) — Optional. Max tokens for generation (default: 1200).

## Commands

- `CodeScribe: Generate README` — Generate or refresh README.md for the current workspace.
- `CodeScribe: Sync Docs` — Scan the project and update documentation files to match folder structure.

## Developer Guide

To build and run the extension locally:

```bash
npm install
npm run compile
```

Run the extension in the debugger:

1. Press `F5` in VS Code or choose Run > Start Debugging.
2. A new Extension Development Host window opens with the extension loaded.

To watch for TypeScript changes while developing:

```bash
npm run watch
```

Run tests:

```bash
npm test
```

Lint and format:

```bash
npm run lint
```

## Security and Secrets

- Do not hard-code API keys in source files. Use the `codescribe.openRouterApiKey` setting or environment variables when running locally.
- Treat generated content as a draft: review AI-generated text before publishing.

## Contributing

Contributions are welcome. Open issues or submit pull requests for bug fixes and enhancements. Follow standard GitHub flow and include tests for new features.

## Troubleshooting

- If AI calls fail, check `codescribe.openRouterApiKey` in Settings and verify network connectivity.
- For TypeScript build errors, run `npm run compile` to see detailed diagnostics.

## License

MIT — see the LICENSE file for details.

## ⚠️ Important: API Key Required

CodeScribe uses AI (via OpenRouter + DeepSeek) to generate README files.

You must provide your own OpenRouter API key:

1. Go to https://openrouter.ai
2. Create a free account
3. Generate an API key
4. Open VS Code Settings
5. Search for `CodeScribe`
6. Paste your API key into `codescribe.openRouterApiKey`

Without an API key, AI generation will not work.
