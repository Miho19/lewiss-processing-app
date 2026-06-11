import type {
  GETSharePointFolderResponse,
  SharePointFolderListItem,
} from "../../type/sharePoint/folder/folderType";

function GETSharePointRootFolderEndpoint() {
  return new URL(
    ``,
    "https://lewiss-measure-pro.netlify.app/.netlify/functions/graph",
  );
}

function GETSharePointRootFolderFetchOptions(): RequestInit {
  const fetchOptions: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "listFolder" }),
  };

  return fetchOptions;
}

export async function GETSharePointRootFolder(
  endpoint: URL = GETSharePointRootFolderEndpoint(),
): Promise<SharePointFolderListItem[]> {
  try {
    const fetchOptions = GETSharePointRootFolderFetchOptions();

    const response: Response = await fetch(endpoint, fetchOptions);
    if (!response.ok) throw new Error("Unexpected server response");

    const jsonBody: GETSharePointFolderResponse = await response.json();

    return jsonBody.children;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    throw new Error("Failed to fetch SharePoint root folder", { cause: error });
  }
}
