/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ProcessName } from "../../../../type/process/processType";
import type { KineticsCellularTableEntry } from "../../../../type/process/tableEntry/kineticsTableEntryType";
import { mapProcessNameToBlindType } from "../../../process/processUtility";
import { getKineticsAccessoryProductListAsync } from "../../general/getAccessoryProductListAsync";
import { getMotorAdditionalProductListAsync } from "../../general/getMotorAdditionalProductListAsync";

// note that blindtype is going to be 10mm cellular regardless whether it is 10 or 20mm
export async function getKineticsCellularAdditionalProductListAsync(
  tableEntryList: KineticsCellularTableEntry[],
  processName: ProcessName,
) {
  const blindType = mapProcessNameToBlindType(processName);
  if (typeof blindType === "undefined") return [];

  const motorAdditionalProductList = await getMotorAdditionalProductListAsync(
    tableEntryList,
    blindType,
  );

  const accessoryAdditionalProductList =
    await getKineticsAccessoryProductListAsync(tableEntryList, blindType);

  return [...motorAdditionalProductList, ...accessoryAdditionalProductList];
}

export async function getAccessoryProductListAsync() {}
