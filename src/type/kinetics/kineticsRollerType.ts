export type KineticsRollerPricingSchedule = {
  productId: string;
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

type MotorisationBase = { base: number; id: string };

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
  name: string;
  inside: number[];
  outside: number[];
};

type FabricCost = {
  opacity: string[];
  blindType: string[];
  heightHeader: number[];
  widthHeader: number[];
  data: number[][];
};

export type KineticsRollerFabricOpacityType =
  | "sunscreen"
  | "blockout"
  | "light-filtering";
