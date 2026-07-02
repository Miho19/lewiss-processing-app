import type {
  KineticsCellularBlind,
  KineticsRollerBlind,
  KineticsVenetian,
} from "./product/kineticsType";
import type { SantaFeVenetianBlind } from "./product/santaFeType";

/**
 * 2/07/2026 we are moving away from product Id being used in the process
 */
export type ProductId =
  | "cellular-blind"
  | "sunscreen-roller"
  | "blockout-roller"
  | "venetian-blind"
  | "light-filtering-roller";

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

export type BlindType =
  | KineticsRollerBlind
  | KineticsCellularBlind
  | KineticsVenetian
  | SantaFeVenetianBlind;
