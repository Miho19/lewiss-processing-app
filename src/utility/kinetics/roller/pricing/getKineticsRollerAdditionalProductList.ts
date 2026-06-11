import type { KineticsRollerPricingSchedule } from "../../../../type/pricing/kinetics/kineticsRollerPricingScheduleType";
import type { ProcessName } from "../../../../type/process/processType";
import type { BlindType } from "../../../../type/process/productType";
import type { KineticsRollerTableEntry } from "../../../../type/process/tableEntry/kineticsTableEntryType";
import type { AdditionalProduct } from "../../../../type/process/worksheetType";
import {
  getAccessoryPricingScheduleAsync,
  getPricingScheduleAsync,
} from "../../../process/pricingScheduleUtility";
import { mapProcessNameToBlindType } from "../../../process/processUtility";

export async function getKineticsRollerAdditionalProductListAsync(
  tableEntryList: KineticsRollerTableEntry[],
  processName: ProcessName,
): Promise<AdditionalProduct[]> {
  const blindType = mapProcessNameToBlindType(processName);
  if (typeof blindType === "undefined") return [];

  const motorAdditionalProductList: AdditionalProduct[] =
    await getMotorAdditionalProductListAsync(tableEntryList, blindType);

  const accessoryProductList: AdditionalProduct[] =
    await getAccessoryProductListAsync(tableEntryList, blindType);

  return [...motorAdditionalProductList, ...accessoryProductList];
}

// its probably better to do this the other way --> loop through entires first to get a list of all operations
// we just use a map ... 8/06/2026
//

async function getMotorAdditionalProductListAsync(
  tableEntries: KineticsRollerTableEntry[],
  blindType: BlindType,
): Promise<AdditionalProduct[]> {
  const pricingSchedule = (await getPricingScheduleAsync(
    blindType,
  )) as KineticsRollerPricingSchedule;

  if (typeof pricingSchedule === "undefined") return [];

  const motorProducts: AdditionalProduct[] = Object.keys(
    pricingSchedule.control.motorisation,
  ).map((k) => {
    return { name: k, cost: 0, quantity: 0 };
  });

  motorProducts.forEach((product) => {
    const filter = tableEntries.filter(
      (e) =>
        e.control.localeCompare(product.name, undefined, {
          sensitivity: "base",
        }) === 0,
    );

    product.quantity = filter.length;

    const motorisationObject =
      pricingSchedule.control.motorisation[
        product.name as keyof typeof pricingSchedule.control.motorisation
      ];

    product.cost = motorisationObject.base;
  });

  const filteredMotorProducts = motorProducts.filter(
    (product) => product.quantity > 0,
  );

  return [...filteredMotorProducts];
}

export async function getAccessoryProductListAsync(
  tableEntries: KineticsRollerTableEntry[],
  blindType: BlindType,
): Promise<AdditionalProduct[]> {
  const pricingSchedule = await getAccessoryPricingScheduleAsync(blindType);
  if (typeof pricingSchedule === "undefined") return [];

  return [];
}
