import type { SharePointJSONFileItemType } from "../zod/sharePointJSONFile";
import type { SharePointProjectFileType } from "../zod/sharePointProjectFile";

function GETSharePointJSONFileEndpoint() {
  return new URL(
    ``,
    "https://lewiss-measure-pro.netlify.app/.netlify/functions/graph",
  );
}

function GETSharePointJSONFileFetchOptions(fileId: string): RequestInit {
  const fetchOptions: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "downloadJson", itemId: fileId }),
  };

  return fetchOptions;
}

async function GETSharePointJSONFile(
  fileId: string,
  endpoint: URL = GETSharePointJSONFileEndpoint(),
): Promise<SharePointJSONFileItemType> {
  try {
    if (typeof fileId === "undefined") throw new Error("FileId is undefined");
    const fetchOptions = GETSharePointJSONFileFetchOptions(fileId);
    const response: Response = await fetch(endpoint, fetchOptions);
    if (!response.ok) throw new Error("Unexpected server response");
    const jsonBody: SharePointJSONFileItemType = await response.json();

    return jsonBody;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    throw new Error("Failed to fetch staff folder", { cause: error });
  }
}

export async function GETSharePointProjectFile(fileId: string) {
  const response = await GETSharePointJSONFile(fileId);
  if (!response.ok) throw new Error("Failed to fetch project file");
  console.log(response.content);
  const jsonContent: SharePointProjectFileType = JSON.parse(response.content);
  return jsonContent;
}

export default GETSharePointJSONFile;
