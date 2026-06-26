import type { SharePointProjectFile } from "../../type/sharePoint/project/projectFileType";
import { GETSharePointJSONFile } from "./GETSharePointJSONFile";

export async function GETSharePointProjectFile(fileId: string) {
  const response = await GETSharePointJSONFile(fileId);

  if (!response.ok) throw new Error("Failed to fetch project file");

  const jsonContent: SharePointProjectFile = JSON.parse(response.content);

  return jsonContent;
}
