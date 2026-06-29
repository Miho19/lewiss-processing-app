import type { PricingSchedule } from "../../process/pricingScheduleType";

export type KineticsMikronwoodPricingSchedule = {
  productId: string;
  baseType: string;
  control: Control;
  fascia: Fascia;
  holdDownBracket: ControlBase;
  fabric: FabricCost;
};

type Control = {
  cord: ControlBase;
  motorisation: Motorisation;
};

type Motorisation = {
  "Lithium-ion": ControlBase;
};

type ControlBase = { base: number; id: string; name: string };

type Fascia = {
  Flat: ControlBase;
  Colonial: ControlBase;
};

type FabricCost = {
  blindType: string[];
  heightHeader: number[];
  widthHeader: number[];
  data: number[][];
};

export function isKineiicsMikronwoodPricingSchedule(
  pricingSchedule: PricingSchedule,
): pricingSchedule is KineticsMikronwoodPricingSchedule {
  if (pricingSchedule.productId !== "venetian-blind") return false;
  if (!("baseType" in pricingSchedule)) return false;
  return true;
}
