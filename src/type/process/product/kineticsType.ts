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

export const KineticsVenetianBlindOptions = [
  "Kinetics Mikronwood 50mm Venetian",
] as const;

export type KineticsVenetian = (typeof KineticsVenetianBlindOptions)[number];
