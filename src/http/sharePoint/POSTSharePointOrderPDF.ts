import type {
  ProcessName,
  ProcessNameMappedToString,
} from "../../type/process/processType";

import type { POSTSharePointJSONFileResponse } from "../../type/sharePoint/folder/folderType";

function POSTSharePointOrderPDFEndpoint() {
  return new URL(
    ``,
    "https://lewiss-measure-pro.netlify.app/.netlify/functions/graph",
  );
}

function POSTSharePointOrderPDFFetchOptions(
  fileName: string,
  content: string,
  folderId: string,
): RequestInit {
  const fetchOptions: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "uploadPDF",
      folderId: folderId,
      filename: fileName,
      fileBase64: content,
    }),
  };

  return fetchOptions;
}

/** */

type Parameters = {
  processName: ProcessName;
  fileName: string;
  fileBase64: string;
  endpoint?: URL;
};

export async function POSTSharePointOrderPDF({
  processName,
  fileName,
  fileBase64,
  endpoint = POSTSharePointOrderPDFEndpoint(),
}: Parameters): Promise<POSTSharePointJSONFileResponse> {
  try {
    const folderId = processNameMappedToSharePointConfirmedFolder[processName];

    const fetchOptions = POSTSharePointOrderPDFFetchOptions(
      fileName,
      fileBase64,
      folderId,
    );

    const response: Response = await fetch(endpoint, fetchOptions);
    if (!response.ok) throw new Error("Unexpected server response");
    const jsonBody: POSTSharePointJSONFileResponse = await response.json();
    if (!jsonBody.ok) throw new Error(jsonBody.error);

    // we are going to use ZOD here
    return jsonBody;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    throw new Error("Failed to fetch pricing schedule", { cause: error });
  }
}

// currently /joshua april/exampleFileStructure/History/
const processNameMappedToSharePointConfirmedFolder: ProcessNameMappedToString =
  {
    "cellular-blind": "01VFVMOACOU2OWM2TEQ5GJ4WTVPHIWJTLT",
    "sunscreen-roller": "01VFVMOACOU2OWM2TEQ5GJ4WTVPHIWJTLT",
    "blockout-roller": "01VFVMOACOU2OWM2TEQ5GJ4WTVPHIWJTLT",
    "light-filtering-roller": "01VFVMOACOU2OWM2TEQ5GJ4WTVPHIWJTLT",
  };

// 01VFVMOACOU2OWM2TEQ5GJ4WTVPHIWJTLT
