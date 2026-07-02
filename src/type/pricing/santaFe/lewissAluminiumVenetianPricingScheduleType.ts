export type LewissAluminiumVenetianPricingSchedule = {
  blindType: string[];
  control: Control;
  fabric: FabricCost;
};

type Control = {
  aluminium25: ControlBase;
  aluminium50: ControlBase;
};

type ControlBase = {
  corded: ControlCostBase;
  cordless: ControlCostBase;
};

type ControlCostBase = {
  multiplier: number;
  name: string;
};

type FabricCost = {
  heightHeader: number[];
  widthHeader: number[];
  data: number[][];
};
