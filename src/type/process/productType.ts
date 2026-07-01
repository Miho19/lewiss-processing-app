/**
 * 2/07/2026 we are moving away from product Id being used in the process
 */
export type ProductId =
  | "cellular-blind"
  | "sunscreen-roller"
  | "blockout-roller"
  | "venetian-blind";

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

export const venetianSubTypeOptions = [
  "mikronwood-50",
  "aluminium-25",
  "aluminium-50",
  "fauxwood-50",
  "fauxwood-63",
  "phoenixwood-50",
  "phoenixwood-63",
] as const;

export type VenetianSubType = (typeof venetianSubTypeOptions)[number];

export const VenetianBlindOptions = [
  "Kinetics Mikronwood 50mm Venetian",
  "Lewis's 25mm Aluminium Venetian",
  "Lewis's 50mm Aluminium Venetian",
  "Lewis's 50mm Fauxwood Venetian",
  "Lewis's 63mm Fauxwood Venetian",
  "Lewis's 50mm Phoenixwood Venetian",
  "Lewis's 63mm Phoenixwood Venetian",
] as const;

export type VenetianBlind = (typeof VenetianBlindOptions)[number];

export type BlindType =
  | KineticsRollerBlind
  | KineticsCellularBlind
  | VenetianBlind;
