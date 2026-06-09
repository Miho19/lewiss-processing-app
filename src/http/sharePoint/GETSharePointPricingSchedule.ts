import type { PricingSchedule } from "../../type/process/pricingScheduleType";
import type { BlindType } from "../../type/process/productType";
import type { GETSharePointJSONFileResponse } from "../../type/sharePoint/folder/folderType";
import { blindTypeToSharePointPricingScheduleFileId } from "./pricingSchedule";

function GETSharePointPricingScheduleEndpoint() {
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

export async function GETSharePointPricingSchedule(
  blindType: BlindType,
  endpoint: URL = GETSharePointPricingScheduleEndpoint(),
): Promise<PricingSchedule> {
  try {
    const sharePointItemId: string | undefined =
      blindTypeToSharePointPricingScheduleFileId[blindType];
    if (typeof sharePointItemId === "undefined")
      throw new Error(`Could not fetch pricing schedule for ${blindType}`);

    const fetchOptions = GETSharePointJSONFileFetchOptions(sharePointItemId);

    const response: Response = await fetch(endpoint, fetchOptions);
    if (!response.ok) throw new Error("Unexpected server response");
    const jsonBody: GETSharePointJSONFileResponse = await response.json();

    const jsonContent = JSON.parse(jsonBody.content);

    // we are going to use ZOD here
    return jsonContent;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    throw new Error("Failed to fetch pricing schedule", { cause: error });
  }
}

export default GETSharePointPricingSchedule;
