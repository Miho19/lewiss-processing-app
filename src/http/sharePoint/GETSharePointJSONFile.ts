import type { GETSharePointJSONFileResponse } from "../../type/sharePoint/folder/folderType";

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

export async function GETSharePointJSONFile(
  fileId: string,
  endpoint: URL = GETSharePointJSONFileEndpoint(),
): Promise<GETSharePointJSONFileResponse> {
  try {
    if (typeof fileId === "undefined") throw new Error("FileId is undefined");
    const fetchOptions = GETSharePointJSONFileFetchOptions(fileId);

    const response: Response = await fetch(endpoint, fetchOptions);
    if (!response.ok) throw new Error("Unexpected server response");

    const jsonBody: GETSharePointJSONFileResponse = await response.json();
    return jsonBody;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    throw new Error("Failed to fetch staff folder", { cause: error });
  }
}
