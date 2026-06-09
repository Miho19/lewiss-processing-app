import type { ProcessName } from "../../type/process/processType";
import type {
  KineticsCellularTableEntry,
  KineticsRollerTableEntry,
} from "../../type/process/tableEntry/kineticsTableEntryType";
import type { TableEntry } from "../../type/process/tableEntry/tableEntryType";
import type {
  AdditionalProduct,
  WorksheetCost,
} from "../../type/process/worksheetType";
import { getKineticsCellularAdditionalProductListAsync } from "../kinetics/cellular/pricing/getKineticsCellularAdditionalProductList";
import { getKineticsRollerAdditionalProductListAsync } from "../kinetics/roller/pricing/getKineticsRollerAdditionalProductList";

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
      (acc, entry) => parseInt(entry.price) + acc,
      0,
    );
    return blindSubTotal;
  } catch {
    return 0;
  }
}

export async function getWorksheetCostAsync(
  tableEntryList: TableEntry[],
  processName: ProcessName,
): Promise<WorksheetCost> {
  const blindSubTotal = getBlindSubTotal(tableEntryList);

  const additionalArray = await getAdditionalProductArray(
    tableEntryList,
    processName,
  );

  // const gst = getGST(blindSubTotal, additionalArray);

  // const total = getTotal(blindSubTotal, additionalArray, gst);

  const costObjcet: WorksheetCost = {
    blindSubTotal: blindSubTotal,
    additional: [...additionalArray],
    gst: 0,
    total: 0,
  };

  return costObjcet;
}

// potential to just use record <processTitle, func>
async function getAdditionalProductArray(
  tableEntryList: TableEntry[],
  processName: ProcessName,
): Promise<AdditionalProduct[]> {
  switch (processName) {
    case "blockout-roller":
    case "light-filtering-roller":
    case "sunscreen-roller":
      return await getKineticsRollerAdditionalProductListAsync(
        tableEntryList as KineticsRollerTableEntry[],
        processName,
      );
    case "cellular-blind":
      return await getKineticsCellularAdditionalProductListAsync(
        tableEntryList as KineticsCellularTableEntry[],
        processName,
      );
    default:
      return [];
  }
}

// function getGST(
//   blindSubTotal: number,
//   additionalProductList: AdditionalProduct[],
// ): number {
//   return 0;
// }

// function getTotal(
//   blindSubTotal: number,
//   additionalProductList: AdditionalProduct[],
//   gst: number,
// ): number {
//   return 0;
// }
