export type SharePointKineticsCellularPricingType = {
  productId: string;
  blockoutMultiplier: number;
  sideChannelCustomColourSurcharge: number;
  sideChannelCostPerMetreHeight: number;
  headRailCustomColourSurcharge: number;
  control: Control;
  fabric: FabricPricingType;
};

type Control = {
  cord: ControlBase;
  motorisation: Motorisation;
};

type Motorisation = {
  "Lithium-ion": ControlBase;
};

type ControlBase = { base: number; id: string };

type FabricPricingType = {
  opacity: string[];
  blindType: string[];
  heightHeader: number[];
  widthHeader: number[];
  data: number[][];
};
