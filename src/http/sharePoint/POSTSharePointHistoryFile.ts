import type {
  ProcessName,
  ProcessNameMappedToString,
} from "../../type/process/processType";

import type { POSTSharePointJSONFileResponse } from "../../type/sharePoint/folder/folderType";

function POSTSharePointHistoryFileFileEndpoint() {
  return new URL(
    ``,
    "https://lewiss-measure-pro.netlify.app/.netlify/functions/graph",
  );
}

function POSTSharePointHistoryFileFetchOptions(
  fileName: string,
  content: string,
  folderId: string,
): RequestInit {
  const fetchOptions: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "uploadJson",
      folderId: folderId,
      filename: fileName,
      content: content,
    }),
  };

  return fetchOptions;
}

/** */

type Parameters = {
  processName: ProcessName;
  fileName: string;
  data: string;
  endpoint?: URL;
};

export async function POSTSharePointHistoryFile({
  processName,
  fileName,
  data,
  endpoint = POSTSharePointHistoryFileFileEndpoint(),
}: Parameters): Promise<string> {
  try {
    const folderId = processNameMappedToSharePointConfirmedFolder[processName];

    const fetchOptions = POSTSharePointHistoryFileFetchOptions(
      fileName,
      data,
      folderId,
    );

    const response: Response = await fetch(endpoint, fetchOptions);
    if (!response.ok) throw new Error("Unexpected server response");

    const jsonBody: POSTSharePointJSONFileResponse = await response.json();

    console.log(jsonBody);

    if (!jsonBody.ok) throw new Error(jsonBody.error);

    // we are going to use ZOD here
    return jsonBody.itemId;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    throw new Error("Failed to fetch pricing schedule", { cause: error });
  }
}

// currently /joshua april/exampleFileStructure/History/
const processNameMappedToSharePointConfirmedFolder: ProcessNameMappedToString =
  {
    "cellular-blind": "01VFVMOADT7SXX4FMGQ5AIUCBIC7TN7DMM",
    "sunscreen-roller": "01VFVMOADT7SXX4FMGQ5AIUCBIC7TN7DMM",
    "blockout-roller": "01VFVMOADT7SXX4FMGQ5AIUCBIC7TN7DMM",
    "light-filtering-roller": "01VFVMOADT7SXX4FMGQ5AIUCBIC7TN7DMM",
  };
