export type ProductId =
  | "cellular-blind"
  | "sunscreen-roller"
  | "blockout-roller";

type KineticsVenetian =
  | "Kinetics Mikronwood 50mm Venetian"
  | "Lewis's 25mm Aluminium Venetian"
  | "Lewis's 50mm Phoenixwood Venetian";

type SantaFeShutter =
  | "Santa Fe Normandy Shutter"
  | "Santa Fe Waterproof Woodlore Plus Shutter";

export const KineticsCellularBlindOptions = [
  "Kinetics 10mm Cellular Blind",
  "Kinetics 20mm Cellular Blind",
] as const;

export type KineticsCellularBlind =
  (typeof KineticsCellularBlindOptions)[number];

export const KineticsRollerBlindOptions = [
  "Kinetics Sunscreen Roller Blind",
  "Kinetics Blockout Roller Blind",
  "Kinetics Light Filtering Roller Blind",
] as const;

export type KineticsRollerBlind = (typeof KineticsCellularBlindOptions)[number];

export type BlindType =
  | KineticsRollerBlind
  | KineticsCellularBlind
  | KineticsVenetian
  | SantaFeShutter;
