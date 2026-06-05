export type SharePointKineticsRollerPricingType = {
  productId: string;
  operation: Operation;
  bottomRail: BottomRail;
  bracket: Bracket;
  pelmet: Pelmet;
  fabric: FabricPricingType;
};

type Operation = {
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

type PerMCost = { name: string; perM: number };

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
  "110mm Pelmet": PelmetPricing;
  "160mm Pelmet": PelmetPricing;
};

type PelmetPricing = { inside: number[]; outside: number[] };

type FabricPricingType = {
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
