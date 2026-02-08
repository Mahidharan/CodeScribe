import * as fs from "fs";
import * as path from "path";

export function writeReadme(projectRoot: string, markdown: string) {
  const readmepath = path.join(projectRoot, "README.md");
  const content = `# Project Structure \n\n${markdown}`;
  fs.writeFileSync(readmepath, content, "utf-8");
}
