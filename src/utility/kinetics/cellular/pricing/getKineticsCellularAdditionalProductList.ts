/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ProcessName } from "../../../../type/process/processType";
import type { BlindType } from "../../../../type/process/productType";
import type { KineticsCellularTableEntry } from "../../../../type/process/tableEntry/kineticsTableEntryType";
import type { AdditionalProduct } from "../../../../type/process/worksheetType";
import { mapProcessNameToBlindType } from "../../../process/processUtility";

// note that blindtype is going to be 10mm cellular regardless whether it is 10 or 20mm
export async function getKineticsCellularAdditionalProductListAsync(
  tableEntryList: KineticsCellularTableEntry[],
  processName: ProcessName,
) {
  const blindType = mapProcessNameToBlindType(processName);

  return [];
}

export async function getKineticsCellularMotorAdditionalProductListAsync(
  tableEntryList: KineticsCellularTableEntry[],
  blindType: BlindType,
): Promise<AdditionalProduct[]> {
  return [];
}
