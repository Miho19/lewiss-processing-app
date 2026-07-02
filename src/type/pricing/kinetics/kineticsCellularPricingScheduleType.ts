import type { PricingSchedule } from "../../process/pricingScheduleType";
import { KineticsCellularBlindOptions } from "../../process/productType";

export type KineticsCellularPricingSchedule = {
  blindType: string[];
  blockoutMultiplier: number;
  sideChannelCustomColourSurcharge: number;
  sideChannelCostPerMetreHeight: number;
  headRailCustomColourSurcharge: number;
  control: Control;
  fabric: FabricCost;
};

type Control = {
  cord: ControlBase;
  motorisation: Motorisation;
};

type Motorisation = {
  "Lithium-ion": ControlBase;
};

type ControlBase = { base: number; id: string };

type FabricCost = {
  opacity: string[];
  heightHeader: number[];
  widthHeader: number[];
  data: number[][];
};

export function isKineticsCellularPricingSchedule(
  pricingSchedule: PricingSchedule,
): pricingSchedule is KineticsCellularPricingSchedule {
  if (typeof pricingSchedule === "undefined") return false;

  if (!("blindType" in pricingSchedule)) return false;

  const blindType = pricingSchedule.blindType;

  const optionSet = new Set<string>(KineticsCellularBlindOptions);

  const hasBlindType = blindType.some((bt) => optionSet.has(bt));

  if (!hasBlindType) return false;

  return true;
}
