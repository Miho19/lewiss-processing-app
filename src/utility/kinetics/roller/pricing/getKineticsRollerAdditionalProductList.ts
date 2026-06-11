import type { KineticsAccessoryPricingSchedule } from "../../../../type/pricing/kinetics/kineticsMotorAccessoryPricingScheduleType";
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
import { getMaxRemote } from "../../general/motorAccessoryUtility";

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
  tableEntryList: KineticsRollerTableEntry[],
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
    const filter = tableEntryList.filter(
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
  tableEntryList: KineticsRollerTableEntry[],
  blindType: BlindType,
): Promise<AdditionalProduct[]> {
  const pricingSchedule = (await getAccessoryPricingScheduleAsync(
    blindType,
  )) as KineticsAccessoryPricingSchedule;
  if (typeof pricingSchedule === "undefined") return [];

  const remote = getRemoteAdditionalProduct(tableEntryList, pricingSchedule);
  if (typeof remote === "undefined") return [];

  const usbCharger = getUSBChargerAdditionalProduct(remote, pricingSchedule);
  if (typeof usbCharger === "undefined") return [];

  return [remote, usbCharger];
}

function getRemoteAdditionalProduct(
  tableEntryList: KineticsRollerTableEntry[],
  pricingSchedule: KineticsAccessoryPricingSchedule,
): AdditionalProduct | undefined {
  const numberOfRemotes = getMaxRemote(tableEntryList);
  const costOfRemote = pricingSchedule.remote;
  if (numberOfRemotes === 0) return undefined;

  return {
    name: "15 Channel Remote",
    cost: costOfRemote,
    quantity: numberOfRemotes,
  };
}

function getUSBChargerAdditionalProduct(
  remote: AdditionalProduct,
  pricingSchedule: KineticsAccessoryPricingSchedule,
): AdditionalProduct | undefined {
  if (typeof remote === "undefined") return undefined;

  const cost = pricingSchedule.usbCharger;
  const quantity = remote.quantity > 6 ? 2 : 1;
  return { name: "USB Charger", cost: cost, quantity: quantity };
}
