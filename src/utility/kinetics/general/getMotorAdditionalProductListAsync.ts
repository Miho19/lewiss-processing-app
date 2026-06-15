import type { BlindType } from "../../../type/process/productType";
import type { TableEntry } from "../../../type/process/tableEntry/tableEntryType";
import type { AdditionalProduct } from "../../../type/process/worksheetType";
import { getPricingScheduleAsync } from "../../process/pricingScheduleUtility";

export async function getMotorAdditionalProductListAsync(
  tableEntryList: TableEntry[],
  blindType: BlindType,
): Promise<AdditionalProduct[]> {
  const operationRecord = getOperationMap(tableEntryList);

  const pricingSchedule = await getPricingScheduleAsync(blindType);
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

function getOperationMap(tableEntryList: TableEntry[]) {
  const operationMap = new Map<string, number>();

  tableEntryList.forEach((entry) => {
    const operation = entry.control;
    const operationNumber = operationMap.get(operation) ?? 0;
    operationMap.set(operation, operationNumber + 1);
  });

  return operationMap;
}
