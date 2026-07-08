import type { BlindType } from "../../type/process/productType";
import type { TableEntry } from "../../type/process/tableEntry/tableEntryType";
import type {
  AdditionalProduct,
  WorksheetCost,
} from "../../type/process/worksheetType";
import { getKineticsCellularAdditionalProductListAsync } from "../kinetics/cellular/pricing";
import { getKineticsMikronwoodAdditionalProductListAsync } from "../kinetics/mikronwood/pricing";
import { getKineticsRollerAdditionalProductListAsync } from "../kinetics/roller/pricing";
import { getLewissAluminiumAdditionalProductListAsync } from "../santaFe/venetian/aluminium/pricing/getLewissAluminiumAdditionalProductList";

const GST = 0.15;

export function getCurrentTableEntryIndex(
  tableEntryList: TableEntry[],
): number {
  if (tableEntryList.length === 0) return 1;
  const currentMax = tableEntryList.reduce(
    (max, entry) => (entry["blind index"] > max ? entry["blind index"] : max),
    -1,
  );
  return currentMax + 1;
}

function getBlindSubTotal(tableEntryList: TableEntry[]): number {
  try {
    const blindSubTotal = tableEntryList.reduce(
      (acc, entry) => parseFloat(entry.price) + acc,
      0,
    );
    return blindSubTotal;
  } catch {
    return 0;
  }
}

export async function getWorksheetCostAsync(
  tableEntryList: TableEntry[],
  blindType: BlindType,
): Promise<WorksheetCost> {
  const blindSubTotal = getBlindSubTotal(tableEntryList);

  const additionalArray = await getAdditionalProductArray(
    tableEntryList,
    blindType,
  );

  const gst = getGST(blindSubTotal, additionalArray);

  const total = getTotal(blindSubTotal, additionalArray, gst);

  const costObjcet: WorksheetCost = {
    blindSubTotal: blindSubTotal,
    additional: [...additionalArray].flat(),
    gst: gst,
    total: total,
  };

  return costObjcet;
}

// potential to just use record <processTitle, func>
async function getAdditionalProductArray(
  tableEntryList: TableEntry[],
  blindType: BlindType,
): Promise<AdditionalProduct[]> {
  switch (blindType) {
    case "Kinetics 10mm Cellular Blind":
    case "Kinetics 20mm Cellular Blind":
      return await getKineticsCellularAdditionalProductListAsync(
        tableEntryList,
        blindType,
      );
    case "Kinetics Blockout Roller Blind":
    case "Kinetics Light Filtering Roller Blind":
    case "Kinetics Sunscreen Roller Blind":
      return await getKineticsRollerAdditionalProductListAsync(
        tableEntryList,
        blindType,
      );
    case "Kinetics Mikronwood 50mm Venetian":
      return await getKineticsMikronwoodAdditionalProductListAsync(
        tableEntryList,
        blindType,
      );
    case "Lewis's 25mm Aluminium Venetian":
    case "Lewis's 50mm Aluminium Venetian":
      return await getLewissAluminiumAdditionalProductListAsync(
        tableEntryList,
        blindType,
      );
    default:
      return [];
  }
}

function getGST(
  blindSubTotal: number,
  additionalProductList: AdditionalProduct[],
  gst: number = GST,
): number {
  const additionalProductListTotalCost = additionalProductList.reduce(
    (acc, current) => current.cost * current.quantity + acc,
    0,
  );

  return (blindSubTotal + additionalProductListTotalCost) * gst;
}

function getTotal(
  blindSubTotal: number,
  additionalProductList: AdditionalProduct[],
  gst: number,
): number {
  const additionalProductListTotalCost = additionalProductList.reduce(
    (acc, current) => current.cost * current.quantity + acc,
    0,
  );

  return blindSubTotal + additionalProductListTotalCost + gst;
}
