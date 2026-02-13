import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

export async function writeReadme(
  projectRoot: string,
  content: string,
): Promise<boolean> {
  const readmePath = path.join(projectRoot, "README.md");

  if (fs.existsSync(readmePath)) {
    const choice = await vscode.window.showWarningMessage(
      "README.md already exists. Do you want to overwrite it?",
      { modal: true },
      "Overwrite",
      "Cancel",
    );

    if (choice !== "Overwrite") {
      vscode.window.showInformationMessage("README.md generation cancelled.");
      return false;
    }
  }

  fs.writeFileSync(readmePath, content, "utf-8");
  return true;
}
