import { ProjectNode } from "../Scanner/projectScanner";

export function generateMarkdown(node: ProjectNode, depth: number = 0): string {
  const indent = " ".repeat(depth);

  let markdown = "";
  if (node.type === "folder") {
    markdown += `${indent}-**${node.name}/**\n`;
  } else {
    markdown += `${indent}-${node.name}\n`;
  }
  if (node.children) {
    for (const child of node.children) {
      markdown += generateMarkdown(child, depth + 1);
    }
  }
  return markdown;
}
