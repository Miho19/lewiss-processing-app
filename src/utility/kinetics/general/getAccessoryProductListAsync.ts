import type { KineticsAccessoryPricingSchedule } from "../../../type/pricing/kinetics/kineticsMotorAccessoryPricingScheduleType";
import type { BlindType } from "../../../type/process/productType";
import type {
  KineticsCellularTableEntry,
  KineticsMikronwoodTableEntry,
  KineticsRollerTableEntry,
} from "../../../type/process/tableEntry/kineticsTableEntryType";
import type { AdditionalProduct } from "../../../type/process/worksheetType";
import { getAccessoryPricingScheduleAsync } from "../../process/pricingScheduleUtility";
import { getMaxRemote } from "./motorAccessoryUtility";

type KineticsTableEntry =
  | KineticsRollerTableEntry
  | KineticsCellularTableEntry
  | KineticsMikronwoodTableEntry;

export async function getKineticsAccessoryProductListAsync(
  tableEntryList: KineticsTableEntry[],
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
  tableEntryList: KineticsTableEntry[],
  pricingSchedule: KineticsAccessoryPricingSchedule,
): AdditionalProduct | undefined {
  const numberOfRemotes = getMaxRemote(tableEntryList);

  const remoteCost = pricingSchedule.motorisation.find(
    (m) => m.name.toLowerCase() === "remote",
  );

  if (typeof remoteCost === "undefined") return undefined;

  return {
    name: "15 Channel Remote",
    cost: remoteCost.base,
    quantity: numberOfRemotes,
  };
}

function getUSBChargerAdditionalProduct(
  remote: AdditionalProduct,
  pricingSchedule: KineticsAccessoryPricingSchedule,
): AdditionalProduct | undefined {
  if (typeof remote === "undefined") return undefined;
  if (remote.quantity === 0) return undefined;

  const cost = pricingSchedule.motorisation.find(
    (m) => m.name.toLowerCase() === "usbcharger",
  );
  if (typeof cost === "undefined") return undefined;

  const quantity = remote.quantity > 6 ? 2 : 1;
  return { name: "USB Charger", cost: cost.base, quantity: quantity };
}
