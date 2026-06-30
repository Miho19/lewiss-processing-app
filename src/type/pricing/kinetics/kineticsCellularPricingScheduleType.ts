import type { PricingSchedule } from "../../process/pricingScheduleType";

export type KineticsCellularPricingSchedule = {
  productId: string;
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
  blindType: string[];
  heightHeader: number[];
  widthHeader: number[];
  data: number[][];
};

export function isKineticsCellularPricingSchedule(
  pricingSchedule: PricingSchedule,
): pricingSchedule is KineticsCellularPricingSchedule {
  if (typeof pricingSchedule === "undefined") return false;

  if (!("productId" in pricingSchedule)) return false;

  const productId = pricingSchedule.productId;

  if (productId !== "cellular-blind") return false;

  return true;
}
