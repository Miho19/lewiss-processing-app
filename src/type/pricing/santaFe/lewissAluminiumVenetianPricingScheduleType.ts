import type { PricingSchedule } from "../../process/pricingScheduleType";
import { SantaFeVenetianBlindOptions } from "../../process/product/santaFeType";

export type LewissAluminiumVenetianPricingSchedule = {
  blindType: string[];
  control: Control;
  fabric: FabricCost;
};

type Control = {
  aluminium25: ControlBase;
  aluminium50: ControlBase;
};

type ControlBase = {
  Corded: ControlCostBase;
  Cordless: ControlCostBase;
};

type ControlCostBase = {
  multiplier: number;
  name: string;
};

type FabricCost = {
  heightHeader: number[];
  widthHeader: number[];
  data: number[][];
};

export function isLewissAluminiumPricingSchedule(
  pricingSchedule: PricingSchedule,
): pricingSchedule is LewissAluminiumVenetianPricingSchedule {
  if (typeof pricingSchedule === "undefined") return false;

  if (!("blindType" in pricingSchedule)) return false;

  const blindType = pricingSchedule.blindType;

  const optionSet = new Set<string>(SantaFeVenetianBlindOptions);

  const hasBlindType = blindType.some((bt) => optionSet.has(bt));

  if (!hasBlindType) return false;

  return true;
}
