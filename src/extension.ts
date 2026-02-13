import * as vscode from "vscode";
import { scanDirectory } from "./Scanner/projectScanner";
import { writeReadme } from "./Docs/readmeWriter";
import { analyzeProject } from "./Scanner/projectAnalyzer";
import { buildContext } from "./AI/contextBuilder";
import { generateReadme } from "./AI/deepseekService";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "codescribe" is now active!');

  const disposable = vscode.commands.registerCommand(
    "codescribe.helloWorld",
    async () => {
      const workspace = vscode.workspace.workspaceFolders;
      if (!workspace) {
        vscode.window.showErrorMessage("No Workspace folder found");
        return;
      }
      const rootpath = workspace[0].uri.fsPath;
      const projectTree = scanDirectory(rootpath);
      const analysis = analyzeProject(projectTree);
      const contextText = buildContext(analysis);

      let aiReadme = "";

      try {
        aiReadme = await generateReadme(contextText);
      } catch (error: any) {
        console.error("Gemini Error", error);

        vscode.window.showErrorMessage(
          "AI generation failed .Generating basic README.",
        );
      }

      const success = await writeReadme(rootpath, aiReadme,);

      if (success) {
        vscode.window.showInformationMessage(
          "CodeScribe generated README.md successfully",
        );
      }
    },
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
