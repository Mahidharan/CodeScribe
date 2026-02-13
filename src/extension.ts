import * as vscode from "vscode";
import { scanDirectory } from "./Scanner/projectScanner";
import { writeReadme } from "./Docs/readmeWriter";
import { analyzeProject } from "./Scanner/projectAnalyzer";
import { buildContext } from "./AI/contextBuilder";
import { generateReadme } from "./AI/deepseekService";

export function activate(context: vscode.ExtensionContext) {
  console.log("CodeScribe is now active!");

  const generateCommand = vscode.commands.registerCommand(
    "codescribe.generateReadme",
    async () => {
      const workspace = vscode.workspace.workspaceFolders;
      if (!workspace) {
        vscode.window.showErrorMessage("No workspace folder found.");
        return;
      }

      const rootpath = workspace[0].uri.fsPath;

      const config = vscode.workspace.getConfiguration("codescribe");
      let apiKey = config.get<string>("openRouterApiKey");

      if (!apiKey) {
        vscode.window.showErrorMessage(
          "OpenRouter API Key not found. Please set it first.",
        );
        return;
      }

      const projectTree = scanDirectory(rootpath);
      const analysis = analyzeProject(projectTree);
      const contextText = buildContext(analysis);

      let aiReadme = "";

      try {
        aiReadme = await generateReadme(contextText);
      } catch (error: any) {
        console.error("AI Error:", error);
        vscode.window.showErrorMessage(
          "AI generation failed. Generating basic README.",
        );
      }

      const success = await writeReadme(rootpath, aiReadme);

      if (success) {
        vscode.window.showInformationMessage(
          "CodeScribe generated README.md successfully!",
        );
      }
    },
  );

  // 🔹 Set / Update API Key Command
  const setApiKeyCommand = vscode.commands.registerCommand(
    "codescribe.setApiKey",
    async () => {
      const config = vscode.workspace.getConfiguration("codescribe");

      const enteredKey = await vscode.window.showInputBox({
        prompt: "Enter your OpenRouter API Key",
        ignoreFocusOut: true,
        password: true,
      });

      if (!enteredKey) {
        vscode.window.showErrorMessage("API Key cannot be empty.");
        return;
      }

      await config.update(
        "openRouterApiKey",
        enteredKey,
        vscode.ConfigurationTarget.Global,
      );

      vscode.window.showInformationMessage("API Key updated successfully!");
    },
  );

  context.subscriptions.push(generateCommand);
  context.subscriptions.push(setApiKeyCommand);
}

export function deactivate() {}
