import * as vscode from "vscode";
import { scanDirectory } from "./Scanner/projectScanner";
import { generateMarkdown } from "./Docs/markdownGenerator";
import { writeReadme } from "./Docs/readmeWriter";
import { generateAISummary } from "./Docs/aiSummaryGenerator";

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

      let summary = "";
      try {
        summary = await generateAISummary(projectTree);
      } catch (error) {
        vscode.window.showWarningMessage(
          "AI summary failed. Generating README without summary.",
        );
      }
      const markdown = generateMarkdown(projectTree);
      const success = await writeReadme(rootpath, summary, markdown);

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
