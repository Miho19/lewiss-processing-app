import type { ProcessName } from "../../../../type/process/processType";
import type { KineticsMikronwoodTableEntry } from "../../../../type/process/tableEntry/kineticsTableEntryType";
import type { AdditionalProduct } from "../../../../type/process/worksheetType";
import { mapProcessNameToBlindType } from "../../../process/processUtility";
import { getKineticsAccessoryProductListAsync } from "../../general/getAccessoryProductListAsync";
import { getMotorAdditionalProductListAsync } from "../../general/getMotorAdditionalProductListAsync";

export async function getKineticsMikronwoodAdditionalProductListAsync(
  tableEntryList: KineticsMikronwoodTableEntry[],
  processName: ProcessName,
): Promise<AdditionalProduct[]> {
  const blindType = mapProcessNameToBlindType(processName);
  if (typeof blindType === "undefined") return [];

  const motorAdditionalProductList: AdditionalProduct[] =
    await getMotorAdditionalProductListAsync(tableEntryList, blindType);

  if (motorAdditionalProductList.length === 0) return [];

  const accessoryProductList: AdditionalProduct[] =
    await getKineticsAccessoryProductListAsync(tableEntryList, blindType);

  return [...motorAdditionalProductList, ...accessoryProductList];
}
