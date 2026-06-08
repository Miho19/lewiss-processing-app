export type ProductId =
  | "cellular-blind"
  | "sunscreen-roller"
  | "blockout-roller";

export type KineticsRollerBlind =
  | "Kinetics Sunscreen Roller Blind"
  | "Kinetics Blockout Roller Blind"
  | "Kinetics Light Filtering Roller Blind";

export type KineticsCellularBlind =
  | "Kinetics 10mm Cellular Blind"
  | "Kinetics 20mm Cellular Blind";

type KineticsVenetian =
  | "Kinetics Mikronwood 50mm Venetian"
  | "Lewis's 25mm Aluminium Venetian"
  | "Lewis's 50mm Phoenixwood Venetian";

type SantaFeShutter =
  | "Santa Fe Normandy Shutter"
  | "Santa Fe Waterproof Woodlore Plus Shutter";

export type BlindType =
  | KineticsRollerBlind
  | KineticsCellularBlind
  | KineticsVenetian
  | SantaFeShutter;

export type ProcessName = ProductId | "light-filtering-roller";
