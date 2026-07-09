import type { BlindTypeMappedToString } from "../../type/process/processType";
import type { BlindType } from "../../type/process/productType";
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
  blindType: BlindType;
  fileName: string;
  data: string;
  endpoint?: URL;
};

export async function POSTSharePointHistoryFile({
  blindType,
  fileName,
  data,
  endpoint = POSTSharePointHistoryFileFileEndpoint(),
}: Parameters): Promise<POSTSharePointJSONFileResponse> {
  try {
    const folderId = blindTypeMappedToSharePointConfirmedFolder[blindType];

    const fetchOptions = POSTSharePointHistoryFileFetchOptions(
      fileName,
      data,
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
  "Kinetics Sunscreen Roller Blind": "01VFVMOADT7SXX4FMGQ5AIUCBIC7TN7DMM",
  "Kinetics Blockout Roller Blind": "01VFVMOADT7SXX4FMGQ5AIUCBIC7TN7DMM",
  "Kinetics Light Filtering Roller Blind": "01VFVMOADT7SXX4FMGQ5AIUCBIC7TN7DMM",
  "Kinetics 10mm Cellular Blind": "01VFVMOADT7SXX4FMGQ5AIUCBIC7TN7DMM",
  "Kinetics 20mm Cellular Blind": "01VFVMOADT7SXX4FMGQ5AIUCBIC7TN7DMM",
  "Kinetics Mikronwood 50mm Venetian": "01VFVMOADT7SXX4FMGQ5AIUCBIC7TN7DMM",
  "Lewis's 25mm Aluminium Venetian": "01VFVMOADT7SXX4FMGQ5AIUCBIC7TN7DMM",
  "Lewis's 50mm Aluminium Venetian": "01VFVMOADT7SXX4FMGQ5AIUCBIC7TN7DMM",
  "Lewis's 50mm Fauxwood Venetian": "01VFVMOADT7SXX4FMGQ5AIUCBIC7TN7DMM",
  "Lewis's 63mm Fauxwood Venetian": "01VFVMOADT7SXX4FMGQ5AIUCBIC7TN7DMM",
  "Lewis's 50mm Phoenixwood Venetian": "01VFVMOADT7SXX4FMGQ5AIUCBIC7TN7DMM",
  "Lewis's 63mm Phoenixwood Venetian": "01VFVMOADT7SXX4FMGQ5AIUCBIC7TN7DMM",
};
