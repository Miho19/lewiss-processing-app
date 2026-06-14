import type { KineticsAccessoryPricingSchedule } from "../../../type/pricing/kinetics/kineticsMotorAccessoryPricingScheduleType";
import type { BlindType } from "../../../type/process/productType";
import type {
  KineticsCellularTableEntry,
  KineticsRollerTableEntry,
} from "../../../type/process/tableEntry/kineticsTableEntryType";
import type { AdditionalProduct } from "../../../type/process/worksheetType";
import { getAccessoryPricingScheduleAsync } from "../../process/pricingScheduleUtility";
import { getMaxRemote } from "./motorAccessoryUtility";

export async function getKineticsAccessoryProductListAsync(
  tableEntryList: KineticsRollerTableEntry[] | KineticsCellularTableEntry[],
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
  tableEntryList: KineticsRollerTableEntry[] | KineticsCellularTableEntry[],
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
