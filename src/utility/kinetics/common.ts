import type {
  Column,
  Content,
  ContentColumns,
  ContentImage,
  ContentStack,
} from "pdfmake/interfaces";
import getImageAsBase64 from "../getBase64Image";
import windowWareLogo from "../../asset/Windoware-Logo-1.png";
import type { TableEntry } from "../pdfmake/commonFunction";
import type {
  BlindType,
  ProcessTitleType,
} from "../../zod/sharePointProjectFile";
import type { PricingScheduleType } from "../../zod/kinetics/common";
import GETSharePointPricingSchedule from "../../http/GETSharePointPricingSchedule";
import { queryClient } from "../../http/queryClient";
import { getKineticsRollerAdditionalProductArrayAsync } from "./roller/kineticsRollerPricing";
import { getKineticsCellularAdditionalProductArrayAsync } from "./cellular/kineticsCellularPricing";

export function createCustomerInformation(
  name: string,
  reference: string,
  consultant: string,
): ContentColumns {
  const leftStack1: ContentStack = {
    stack: [{ text: "Client", marginBottom: 4 }, { text: "Reference" }],
  };

  const leftStack2: ContentStack = {
    stack: [{ text: name, marginBottom: 4 }, { text: reference }],
  };

  const leftColumn: Column[] = [
    { width: "auto", ...leftStack1 },
    { width: "auto", ...leftStack2 },
  ];

  const rightStack1: ContentStack = {
    stack: [{ text: "Date", marginBottom: 4 }, { text: "Consultant" }],
  };

  const rightStack2: ContentStack = {
    stack: [
      {
        text: new Date().toLocaleDateString(),
        marginBottom: 4,
        alignment: "right",
      },
      { text: consultant, alignment: "right" },
    ],
  };

  const rightColumn: Column[] = [
    { width: "auto", ...rightStack1 },
    { width: "auto", ...rightStack2 },
  ];

  const customerInformationColumn: Column[] = [
    { width: "auto", columns: [...leftColumn], columnGap: 24 },
    { width: "*", text: " " },
    { width: "auto", columns: [...rightColumn], columnGap: 24 },
  ];

  const content: Content = {
    columns: customerInformationColumn,
    marginBottom: 14,
  };

  return content;
}

export async function createWindowWareHeader() {
  const windowWareLogoAsBase64: string = await getImageAsBase64(windowWareLogo);

  const image: ContentImage = {
    image: windowWareLogoAsBase64,
    width: 100,
  };

  const content: Content[] = [
    {
      columns: [{ width: "*", text: " " }, image],
    },
  ];

  return content;
}

type RemoteChannelObjectType = {
  remote: number;
  channel: number;
};

function getMaxRemote(entries: TableEntry[]) {
  return entries.reduce(
    (max, curr) => (curr.remote > max ? curr.remote : max),
    0,
  );
}

function getMaxChannel(entries: TableEntry[]) {
  return entries.reduce(
    (max, curr) =>
      curr["remote channel"] > max ? curr["remote channel"] : max,
    0,
  );
}

export function getRemoteAndChannel(
  location: string,
  control: string,
  entries: TableEntry[],
): RemoteChannelObjectType {
  // to make it more general, need an array of known motor items that remotes are allowed for
  if (control !== "Lithium-ion") return { remote: 0, channel: 0 };

  const roomName = location.split("-")[0].trim();

  const filtered = entries.filter(
    (e) =>
      e.location.split("-")[0].trim() === roomName &&
      e.control === "Lithium-ion",
  );

  if (filtered.length === 0)
    return { remote: getMaxRemote(entries) + 1, channel: 1 };

  const maxChannel = getMaxChannel(filtered);

  return { remote: filtered[0].remote, channel: maxChannel + 1 };
}

export function getBlindIndex(entries: TableEntry[]): number {
  if (entries.length === 0) return 1;
  const currentMax = entries.reduce(
    (max, entry) => (entry["blind index"] > max ? entry["blind index"] : max),
    -1,
  );
  return currentMax + 1;
}

export async function getPricingScheduleAsync(
  blindType: BlindType,
): Promise<PricingScheduleType | undefined> {
  try {
    const pricingSchedule = await queryClient.ensureQueryData({
      queryKey: [`pricing schedule ${blindType}`],
      queryFn: () => GETSharePointPricingSchedule(blindType),
    });
    return pricingSchedule;
  } catch (error) {
    console.error(`Failed to fetch ${blindType} pricing schedule ${error}`);

    return undefined;
  }
}

export type WorksheetCostObjectAdditionalProductType = {
  name: string;
  cost: number;
  quantity: number;
};

export type WorksheetCostObjectType = {
  blindSubTotal: number;
  additional: WorksheetCostObjectAdditionalProductType[];
  gst: number;
  total: number;
};

export async function getWorksheetCostObjectAsync(
  tableEntries: TableEntry[],
  processTitle: ProcessTitleType,
): Promise<WorksheetCostObjectType> {
  const blindSubTotal = getBlindSubTotal(tableEntries);

  const additionalArray = await getAdditionalProductArray(
    tableEntries,
    processTitle,
  );

  const gst = getGST(blindSubTotal, additionalArray);

  const total = getTotal(blindSubTotal, additionalArray, gst);

  const costObjcet: WorksheetCostObjectType = {
    blindSubTotal: blindSubTotal,
    additional: [...additionalArray],
    gst: gst,
    total: total,
  };

  return costObjcet;
}

function getBlindSubTotal(tableEntries: TableEntry[]): number {
  try {
    const blindSubTotal = tableEntries.reduce(
      (acc, entry) => parseInt(entry.price) + acc,
      0,
    );
    return blindSubTotal;
  } catch {
    return 0;
  }
}

// potential to just use record <processTitle, func>
async function getAdditionalProductArray(
  tableEntries: TableEntry[],
  processTitle: ProcessTitleType,
): Promise<WorksheetCostObjectAdditionalProductType[]> {
  switch (processTitle) {
    case "blockout-roller":
    case "light-filtering-roller":
    case "sunscreen-roller":
      return await getKineticsRollerAdditionalProductArrayAsync(
        tableEntries,
        processTitle,
      );
    case "cellular-blind":
      return await getKineticsCellularAdditionalProductArrayAsync(
        tableEntries,
        processTitle,
      );
    default:
      return [];
  }
}

function getGST(
  blindSubTotal: number,
  additionalProductArray: WorksheetCostObjectAdditionalProductType[],
): number {
  return 0;
}

function getTotal(
  blindSubTotal: number,
  additionalProductArray: WorksheetCostObjectAdditionalProductType[],
  gst: number,
): number {
  return 0;
}

// top level common function, all products are likely to use this...
export function mapProcessTitleToBlindType(
  processTitle: ProcessTitleType,
): BlindType | undefined {
  switch (processTitle) {
    case "blockout-roller":
      return "Kinetics Blockout Roller Blind";
    case "light-filtering-roller":
      return "Kinetics Light Filtering Roller Blind";
    case "sunscreen-roller":
      return "Kinetics Sunscreen Roller Blind";
    case "cellular-blind":
      return "Kinetics 10mm Cellular Blind";
    default:
      return undefined;
  }
}
