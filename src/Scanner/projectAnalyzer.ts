import * as fs from "fs";
import { ProjectNode } from "./projectScanner";

export interface ProjectAnalysis {
  projectName: string;
  folders: string[];
  files: string[];
  dependencies: string[];
  devDependencies: string[];
}

export function analyzeProject(root: ProjectNode): ProjectAnalysis {
  const folders: string[] = [];
  const files: string[] = [];
  let dependencies: string[] = [];
  let devDependencies: string[] = [];

  function traverse(node: ProjectNode) {
    if (node.type === "folder") {
      folders.push(node.name);

      if (node.children) {
        node.children.forEach(traverse);
      }
    } else {
      files.push(node.name);

      if (node.name === "package.json") {
        try {
          const content = fs.readFileSync(node.path, "utf-8");
          const parsed = JSON.parse(content);

          dependencies = Object.keys(parsed.dependencies || {});
          devDependencies = Object.keys(parsed.devDependencies || {});
        } catch (error) {
          console.error("Error Parsing package.json", error);
        }
      }
    }
  }
  traverse(root);
  return {
    projectName: root.name,
    folders,
    files,
    dependencies,
    devDependencies,
  };
}
