import type { BlindTypeMappedToString } from "../../type/process/processType";
import type { BlindType } from "../../type/process/productType";

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
  blindType: BlindType;
  fileName: string;
  fileBase64: string;
  endpoint?: URL;
};

export async function POSTSharePointOrderPDF({
  blindType,
  fileName,
  fileBase64,
  endpoint = POSTSharePointOrderPDFEndpoint(),
}: Parameters): Promise<POSTSharePointJSONFileResponse> {
  try {
    const folderId = blindTypeMappedToSharePointConfirmedFolder[blindType];

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
const blindTypeMappedToSharePointConfirmedFolder: BlindTypeMappedToString = {
  "Kinetics Sunscreen Roller Blind": "01VFVMOACOU2OWM2TEQ5GJ4WTVPHIWJTLT",
  "Kinetics Blockout Roller Blind": "01VFVMOACOU2OWM2TEQ5GJ4WTVPHIWJTLT",
  "Kinetics Light Filtering Roller Blind": "01VFVMOACOU2OWM2TEQ5GJ4WTVPHIWJTLT",
  "Kinetics 10mm Cellular Blind": "01VFVMOACOU2OWM2TEQ5GJ4WTVPHIWJTLT",
  "Kinetics 20mm Cellular Blind": "01VFVMOACOU2OWM2TEQ5GJ4WTVPHIWJTLT",
  "Kinetics Mikronwood 50mm Venetian": "",
  "Lewis's 25mm Aluminium Venetian": "",
  "Lewis's 50mm Aluminium Venetian": "",
  "Lewis's 50mm Fauxwood Venetian": "",
  "Lewis's 63mm Fauxwood Venetian": "",
  "Lewis's 50mm Phoenixwood Venetian": "",
  "Lewis's 63mm Phoenixwood Venetian": "",
};

// 01VFVMOACOU2OWM2TEQ5GJ4WTVPHIWJTLT
