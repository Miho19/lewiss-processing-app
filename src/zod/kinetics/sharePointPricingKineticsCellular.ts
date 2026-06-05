export type SharePointKineticsCellularPricingType = {
  productId: string;
  blockoutMultiplier: number;
  sideChannelCustomColourSurcharge: number;
  sideChannelCostPerMetreHeight: number;
  headRailCustomColourSurcharge: number;
  operation: Operation;
  fabric: FabricPricingType;
};

type Operation = {
  cord: OperationBase;
  motorisation: Motorisation;
};

type Motorisation = {
  "Lithium-ion": OperationBase;
};

type OperationBase = { base: number; id: string };

type FabricPricingType = {
  opacity: string[];
  blindType: string[];
  heightHeader: number[];
  widthHeader: number[];
  data: number[][];
};
