import type { PricingSchedule } from "../../process/pricingScheduleType";
import { SantaFeVenetianBlindOptions } from "../../process/product/santaFeType";

export type LewissFauxwoodVenetianPricingSchedule = {
  blindType: string[];
  control: Control;
  fascia: Fascia;
  fabric: FabricCost;
};

type Control = {
  fauxwood50: ControlBase;
  fauxwood63: ControlBase;
};

type ControlBase = {
  cord: ControlCostBase;
  cordless: ControlCostBase;
  cordloop: ControlBase;
};

type ControlCostBase = {
  multiplier: number;
  name: string;
};

type Fascia = {
  name: string;
  perM: number;
};

type FabricCost = {
  heightHeader: number[];
  widthHeader: number[];
  data: number[][];
};

export function isLewissFauxwoodVenetianPricingSchedule(
  pricingSchedule: PricingSchedule,
): pricingSchedule is LewissFauxwoodVenetianPricingSchedule {
  if (typeof pricingSchedule === "undefined") return false;

  if (!("blindType" in pricingSchedule)) return false;

  const blindType = pricingSchedule.blindType;

  const optionSet = new Set<string>(SantaFeVenetianBlindOptions);

  const hasBlindType = blindType.some((bt) => optionSet.has(bt));

  if (!hasBlindType) return false;

  return true;
}
