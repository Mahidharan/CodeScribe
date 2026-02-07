import * as vscode from "vscode";
import { scanDirectory } from "./Scanner/projectScanner";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "codescribe" is now active!');

  const disposable = vscode.commands.registerCommand(
    "codescribe.helloWorld",
    () => {
      const workspace = vscode.workspace.workspaceFolders;
      if (!workspace) {
        vscode.window.showErrorMessage("No Workspace folder found");
        return;
      }
      const rootpath = workspace[0].uri.fsPath;
      const projectTree = scanDirectory(rootpath);

      console.log("Project Structure", projectTree);

      vscode.window.showInformationMessage("CodeScribe Scanned your Project");
    },
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
