import type { BlindType } from "../type/sharePointProjectFile";
import kineticsCellularPricingSchedule from "../../test/utility/kinetics/cellular/kinetics-cellular-pricing-example.json";
import type { SharePointKineticsCellularPricingType } from "../type/kinetics/sharePointPricingKineticsCellular";
import type { SharePointKineticsRollerPricingType } from "../type/kinetics/sharePointPricingKineticsRoller";
import type { SharePointJSONFileItemType } from "../type/sharePointJSONFile";

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

type PricingScheduleType =
  | SharePointKineticsCellularPricingType
  | SharePointKineticsRollerPricingType;

type SharePointPricingScheduleItemIdRecordType = Record<BlindType, string>;

const sharePointPricingScheduleRecord: SharePointPricingScheduleItemIdRecordType =
  {
    "Kinetics Mikronwood 50mm Venetian": "",
    "Lewis's 25mm Aluminium Venetian": "",
    "Lewis's 50mm Phoenixwood Venetian": "",
    "Santa Fe Normandy Shutter": "",
    "Santa Fe Waterproof Woodlore Plus Shutter": "",
    "Kinetics Sunscreen Roller Blind": "01VFVMOABN3IZBHUHWK5D3GJ7VFKUZAHJL",
    "Kinetics Blockout Roller Blind": "01VFVMOAGZEEB7JDTD7ZGZ5BJT2A4P6X7M",
    "Kinetics Light Filtering Roller Blind":
      "01VFVMOAGZEEB7JDTD7ZGZ5BJT2A4P6X7M",
    "Kinetics 10mm Cellular Blind": "01VFVMOAHWC4LUAIEQDJC3ZSVTJ2Y65NY7",
    "Kinetics 20mm Cellular Blind": "01VFVMOAHWC4LUAIEQDJC3ZSVTJ2Y65NY7",
  };

export async function GETSharePointPricingSchedule(
  blindType: BlindType,
  endpoint: URL = GETSharePointPricingScheduleEndpoint(),
): Promise<PricingScheduleType> {
  try {
    const sharePointItemId: string | undefined =
      sharePointPricingScheduleRecord[blindType];
    if (typeof sharePointItemId === "undefined")
      throw new Error(`Could not fetch pricing schedule for ${blindType}`);

    const fetchOptions = GETSharePointJSONFileFetchOptions(sharePointItemId);

    const response: Response = await fetch(endpoint, fetchOptions);
    if (!response.ok) throw new Error("Unexpected server response");
    const jsonBody: SharePointJSONFileItemType = await response.json();

    const jsonContent = JSON.parse(jsonBody.content);

    // we are going to use ZOD here
    return jsonContent;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    throw new Error("Failed to fetch pricing schedule", { cause: error });
  }
}

export default GETSharePointPricingSchedule;
