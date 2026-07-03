import type { AccessoryPricingSchedule } from "../../process/pricingScheduleType";
import { KineticsCellularBlindOptions } from "../../process/product/kineticsType";
import type { MotorisationBase } from "./kineticsRollerPricingScheduleType";

export type KineticsAccessoryPricingSchedule = {
  blindType: string[];
  motorisation: MotorisationBase[];
  sillClip: MotorisationBase;
};

export function isKineticsAccessoryPricingSchedule(
  pricingSchedule: AccessoryPricingSchedule,
): pricingSchedule is KineticsAccessoryPricingSchedule {
  if (typeof pricingSchedule === "undefined") return false;

  if (!("blindType" in pricingSchedule)) return false;
  if (!("motorisation" in pricingSchedule)) return false;
  if (!("sillClip" in pricingSchedule)) return false;

  const blindType = pricingSchedule.blindType;
  if (!blindType.includes(KineticsCellularBlindOptions[0])) return false;
  // do i really have to go over entire kinetics product line to prove its for kinetics?
  return true;
}
