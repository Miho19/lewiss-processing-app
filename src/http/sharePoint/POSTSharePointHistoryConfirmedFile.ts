import type { PricingSchedule } from "../../type/process/pricingScheduleType";
import type {
  ProcessName,
  ProcessNameMappedToString,
} from "../../type/process/processType";

import type {
  GETSharePointJSONFileResponse,
  POSTSharePointJSONFileResponse,
} from "../../type/sharePoint/folder/folderType";

function POSTSharePointHistoryConfirmedFileEndpoint() {
  return new URL(
    ``,
    "https://lewiss-measure-pro.netlify.app/.netlify/functions/graph",
  );
}

function POSTSharePointHistoryConfirmedFileFetchOptions(
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

export async function POSTSharePointHistoryConfirmedFile(
  processName: ProcessName,
  fileName: string,
  data: string,
  endpoint: URL = POSTSharePointHistoryConfirmedFileEndpoint(),
): Promise<string> {
  try {
    const folderId = processNameMappedToSharePointConfirmedFolder[processName];

    const fetchOptions = POSTSharePointHistoryConfirmedFileFetchOptions(
      fileName,
      data,
      folderId,
    );

    const response: Response = await fetch(endpoint, fetchOptions);
    if (!response.ok) throw new Error("Unexpected server response");
    const jsonBody: POSTSharePointJSONFileResponse = await response.json();
    if (!jsonBody.ok) throw new Error(jsonBody.error);

    // we are going to use ZOD here
    return jsonBody.itemId;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    throw new Error("Failed to fetch pricing schedule", { cause: error });
  }
}

const processNameMappedToSharePointConfirmedFolder: ProcessNameMappedToString =
  {
    "cellular-blind": "01VFVMOAEPH2B72PIHJNBYWJDJZL2ZZQIW",
    "sunscreen-roller": "01VFVMOAEPH2B72PIHJNBYWJDJZL2ZZQIW",
    "blockout-roller": "01VFVMOAEPH2B72PIHJNBYWJDJZL2ZZQIW",
    "light-filtering-roller": "01VFVMOAEPH2B72PIHJNBYWJDJZL2ZZQIW",
  };
