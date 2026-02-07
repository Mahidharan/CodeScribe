import * as fs from "fs";
import * as path from "path";

export interface ProjectNode {
  name: string;
  path: string;
  type: "file" | "folder";
  children?: ProjectNode[];
}

const IGNORE_FOLDERS = ["node_modules", ".git", "dist", "build", "next", "out"];

export function scanDirectory(dirPath: string): ProjectNode {
  const stats = fs.statSync(dirPath);
  const node: ProjectNode = {
    name: path.basename(dirPath),
    path: dirPath,
    type: stats.isDirectory() ? "folder" : "file",
  };
  if (stats.isDirectory()) {
    if (IGNORE_FOLDERS.includes(node.name)) {
      return node;
    }

    node.children = fs
      .readdirSync(dirPath)
      .map((child) => scanDirectory(path.join(dirPath, child)));
  }

  return node;
}
