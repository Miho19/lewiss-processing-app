import type { AccessoryPricingSchedule } from "../../process/pricingScheduleType";
import { SantaFeVenetianBlindOptions } from "../../process/product/santaFeType";
import type { BlindType } from "../../process/productType";

export type SantaFeAccessoriesPricingSchedule = {
  blindType: BlindType[];
  spacerBlock: CostBase;
  palladianShelf: PalladianShelf;
  cutOut: CostBase;
  keystone: CostBase;
  valance: CostBase;
  twoOnOne: CostBase;
  phoenixwoodColourSurcharge: PhoenixwoodColourSurcharge;
};

type CostBase = {
  id: string;
  base: number;
  name: string;
};

type PalladianShelf = {
  id: string;
  perM: number;
  name: string;
  colour: Colour[];
};

type Colour = {
  id: string;
  name: string;
  surcharge: number;
};

type PhoenixwoodColourSurcharge = {
  under10: CostBase;
  over10: CostBase;
  colour: Colour[];
};

export function isSantaFeAccessoryPricingSchedule(
  pricingSchedule: AccessoryPricingSchedule,
): pricingSchedule is SantaFeAccessoriesPricingSchedule {
  if (typeof pricingSchedule === "undefined") return false;
  if (!("blindType" in pricingSchedule)) return false;
  const { blindType } = pricingSchedule;

  const optionSet = new Set<string>(SantaFeVenetianBlindOptions);
  const hasBlindType = blindType.some((bt) => optionSet.has(bt));
  if (!hasBlindType) return false;

  if (!("spacerBlock" in pricingSchedule)) return false;
  if (!("phoenixwoodColourSurcharge" in pricingSchedule)) return false;

  return true;
}
