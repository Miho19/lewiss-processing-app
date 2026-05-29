export type SharePointKineticsCellularPricingType = {
  productId: string;
  blockoutMultiplier: number;
  sideChannelCustomColourSurcharge: number;
  sideChannelCostPerMetreHeight: number;
  headRailCustomColourSurcharge: number;
  motorisation: Motorisation;
  blind: Blind;
};

type Motorisation = {
  "Lithium-ion": number;
};

type Blind = {
  opacity: string;
  heightHeader: number[];
  widthHeader: number[];
  data: number[][];
};
