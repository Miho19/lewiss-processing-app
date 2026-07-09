// type SantaFeShutter =
//   | "Santa Fe Normandy Shutter"
//   | "Santa Fe Waterproof Woodlore Plus Shutter";

export const SantaFeVenetianBlindOptions = [
  "Lewis's 25mm Aluminium Venetian",
  "Lewis's 50mm Aluminium Venetian",
  "Lewis's 50mm Fauxwood Venetian",
  "Lewis's 63mm Fauxwood Venetian",
  "Lewis's 50mm Phoenixwood Venetian",
  "Lewis's 63mm Phoenixwood Venetian",
] as const;

// lewisis 25mm Thermacell
// - operation

export type SantaFeVenetianBlind = (typeof SantaFeVenetianBlindOptions)[number];
