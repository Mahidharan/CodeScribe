import { ProjectAnalysis } from "../Scanner/projectAnalyzer";

export function buildContext(analysis: ProjectAnalysis): string {
  return `
    Project Name: ${analysis.projectName};

    Description:
     ${analysis.description || "No description provided."}

    Dependencies:
    ${analysis.dependencies.length > 0 ? analysis.dependencies.join(", ") : "None"}
    
    Dev Dependencies:
    ${analysis.devDependencies.length > 0 ? analysis.devDependencies.join(", ") : "None"}

    Scripts:
    ${analysis.scripts.length > 0 ? analysis.scripts.join(", ") : "None"}

    Folders:
    ${analysis.folders.join(", ")}

    Files:
    ${analysis.files
      .filter(file => !/\.(png|jpg|jpeg|gif|svg|webp|bmp|ico|tiff)$/i.test(file))
      .slice(0, 20)
      .join(", ")}
`;
}
