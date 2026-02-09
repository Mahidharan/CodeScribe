import { ProjectNode } from "../Scanner/projectScanner";

const IGNORE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".svg",
  ".webp",
  ".mp4",
  ".mp3",
  ".wav",
  ".zip",
  ".rar",
  ".exe",
  ".pdf",
];

function isBinaryFile(fileName: string): boolean {
  return IGNORE_EXTENSIONS.some((ext) => fileName.toLowerCase().endsWith(ext));
}

export function generateMarkdown(node: ProjectNode, depth: number = 0): string {
  const indent = " ".repeat(depth);

  let markdown = "";
  if (node.type === "folder") {
    markdown += `${indent}- **${node.name}/**\n`;
  } else {
    if (isBinaryFile(node.name)) {
      return "";
    }
    markdown += `${indent}-${node.name}\n`;
  }
  if (node.children) {
    for (const child of node.children) {
      markdown += generateMarkdown(child, depth + 1);
    }
  }
  return markdown;
}
