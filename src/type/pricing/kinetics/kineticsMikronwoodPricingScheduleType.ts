import type { PricingSchedule } from "../../process/pricingScheduleType";

export type KineticsMikronwoodPricingSchedule = {
  blindType: string[];
  buttingMultiplier: number;
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
  heightHeader: number[];
  widthHeader: number[];
  data: number[][];
};

export function isKineiicsMikronwoodPricingSchedule(
  pricingSchedule: PricingSchedule,
): pricingSchedule is KineticsMikronwoodPricingSchedule {
  if (typeof pricingSchedule === "undefined") return false;

  if (typeof pricingSchedule === "undefined") return false;

  if (!("blindType" in pricingSchedule)) return false;

  const blindType = pricingSchedule.blindType;

  const mikronwoodBlindType = "Kinetics Mikronwood 50mm Venetian";

  if (!blindType.includes(mikronwoodBlindType)) return false;

  return true;
}
