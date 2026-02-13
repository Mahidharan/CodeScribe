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

  if (node.type === "file") {
    if (isBinaryFile(node.name)) {
      return "";
    }
    return `${indent}- ${node.name}\n`;
  }
  let childrenMarkdown = "";
  if (node.children) {
    for (const child of node.children) {
      childrenMarkdown += generateMarkdown(child, depth + 1);
    }
  }
  if (!childrenMarkdown.trim()) {
    return "";
  }

  let markdown = `${indent}- **${node.name}/**\n`;
  markdown += childrenMarkdown;

  return markdown;
}
