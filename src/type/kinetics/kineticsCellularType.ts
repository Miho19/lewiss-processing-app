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
