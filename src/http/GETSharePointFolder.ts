import type {
  GETSharePointFolderResponseType,
  SharePointFolderItemListType,
} from "../zod/sharePointFolder";

function GETSharePointFolderEndpoint() {
  return new URL(
    ``,
    "https://lewiss-measure-pro.netlify.app/.netlify/functions/graph",
  );
}

function GETSharePointFolderFetchOptions(folderId: string): RequestInit {
  const fetchOptions: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "listFolder", folderId: folderId }),
  };

  return fetchOptions;
}

async function GETSharePointFolder(
  folderId: string,
  endpoint: URL = GETSharePointFolderEndpoint(),
): Promise<SharePointFolderItemListType[]> {
  try {
    if (typeof folderId === "undefined")
      throw new Error("Folder Id is undefined");
    const fetchOptions = GETSharePointFolderFetchOptions(folderId);

    const response: Response = await fetch(endpoint, fetchOptions);
    if (!response.ok) throw new Error("Unexpected server response");

    const jsonBody: GETSharePointFolderResponseType = await response.json();

    return jsonBody.children;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    throw new Error("Failed to fetch SharePoint folder");
  }
}

export default GETSharePointFolder;
