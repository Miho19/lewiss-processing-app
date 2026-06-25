export type ProductId =
  | "cellular-blind"
  | "sunscreen-roller"
  | "blockout-roller"
  | "venetian-blind";

export const VenetianBlindOptions = [
  "Kinetics Mikronwood 50mm Venetian",
  "Lewis's 25mm Aluminium Venetian",
  "Lewis's 50mm Phoenixwood Venetian",
] as const;

type VenetianBlind = (typeof VenetianBlindOptions)[number];

// type SantaFeShutter =
//   | "Santa Fe Normandy Shutter"
//   | "Santa Fe Waterproof Woodlore Plus Shutter";

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

export type KineticsRollerBlind = (typeof KineticsRollerBlindOptions)[number];

export type BlindType =
  | KineticsRollerBlind
  | KineticsCellularBlind
  | VenetianBlind;
