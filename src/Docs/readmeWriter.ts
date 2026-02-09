import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

export async function writeReadme(
  projectRoot: string,
  summary: string,
  markdown: string,
): Promise<boolean> {
  const readmepath = path.join(projectRoot, "README.md");
  const content = `# Project Summary \n\n${summary}
  

  ----
    #Project Structure

  ${markdown}
  `;
  if (fs.existsSync(readmepath)) {
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
  fs.writeFileSync(readmepath, content, "utf-8");
  return true;
}
