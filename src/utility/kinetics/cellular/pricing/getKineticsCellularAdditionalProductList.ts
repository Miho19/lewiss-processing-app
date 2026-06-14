/* eslint-disable @typescript-eslint/no-unused-vars */
import type { KineticsCellularPricingSchedule } from "../../../../type/pricing/kinetics/kineticsCellularPricingScheduleType";
import type { ProcessName } from "../../../../type/process/processType";
import type { BlindType } from "../../../../type/process/productType";
import type { KineticsCellularTableEntry } from "../../../../type/process/tableEntry/kineticsTableEntryType";
import type { AdditionalProduct } from "../../../../type/process/worksheetType";
import { getPricingScheduleAsync } from "../../../process/pricingScheduleUtility";
import { mapProcessNameToBlindType } from "../../../process/processUtility";
import { getKineticsAccessoryProductListAsync } from "../../general/getAccessoryProductListAsync";

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

export async function getMotorAdditionalProductListAsync(
  tableEntryList: KineticsCellularTableEntry[],
  blindType: BlindType,
): Promise<AdditionalProduct[]> {
  const operationRecord = new Map<string, number>();

  tableEntryList.forEach((entry) => {
    const current = operationRecord.get(entry.control) ?? 0;
    operationRecord.set(entry.control, current + 1);
  });

  const pricingSchedule = (await getPricingScheduleAsync(
    blindType,
  )) as KineticsCellularPricingSchedule;
  if (typeof pricingSchedule === "undefined") return [];

  const motorisationObject = pricingSchedule.control.motorisation;

  const options: AdditionalProduct[] = (
    Object.keys(motorisationObject) as string[]
  ).map((key) => {
    const quantity = operationRecord.get(key) ?? 0;
    const cost =
      motorisationObject[key as keyof typeof motorisationObject].base;
    return { name: key, cost: cost, quantity: quantity };
  });

  const filtered = options.filter((p) => p.quantity !== 0);

  return filtered;
}

export async function getAccessoryProductListAsync() {}
