import type { PricingSchedule } from "../../process/pricingScheduleType";
import { KineticsRollerBlindOptions } from "../../process/product/kineticsType";

export type KineticsRollerPricingSchedule = {
  blindType: string[];
  control: Control;
  bottomRail: BottomRail;
  bracket: Bracket;
  pelmet: Pelmet;
  fabric: FabricCost;
};

type Control = {
  chain: Chain;
  motorisation: Motorisation;
};

type Chain = {
  fastRise: FastRise;
};

type FastRise = {
  base: number;
  colours: PerMCost[];
};

export type PerMCost = { name: string; perM: number };

type Motorisation = {
  "Lithium-ion": MotorisationBase;
  "Hardwired Smart Home": MotorisationBase;
  "Hardwired WiFi Remote Control": MotorisationBase;
};

export type MotorisationBase = { base: number; id: string; name: string };

type BottomRail = {
  customColour: number;
  fabricInsert: PerMCost;
  deluxe: PerMCost;
};

type Bracket = {
  combo: number;
};

type Pelmet = {
  customColour: number;
  width: number[];
  cost: PelmetPricing[];
};

export type PelmetPricing = {
  size: string;
  inside: number[];
  outside: number[];
};

type FabricCost = {
  opacity: string[];
  heightHeader: number[];
  widthHeader: number[];
  data: number[][];
};

export type KineticsRollerFabricOpacity =
  | "sunscreen"
  | "blockout"
  | "light-filtering";

export function isKineticsRollerPricingSchedule(
  pricingSchedule: PricingSchedule,
): pricingSchedule is KineticsRollerPricingSchedule {
  if (typeof pricingSchedule === "undefined") return false;

  if (!("blindType" in pricingSchedule)) return false;

  const blindType = pricingSchedule.blindType;

  const optionSet = new Set<string>(KineticsRollerBlindOptions);

  const hasBlindType = blindType.some((bt) => optionSet.has(bt));

  if (!hasBlindType) return false;

  return true;
}
