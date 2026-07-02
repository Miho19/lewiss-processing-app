export type LewissAluminiumVenetianPricingSchedule = {
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
  blindType: string[];
  heightHeader: number[];
  widthHeader: number[];
  data: number[][];
};
