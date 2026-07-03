import type {
  KineticsCellularTableEntry,
  KineticsMikronwoodTableEntry,
  KineticsRollerTableEntry,
} from "./kineticsTableEntryType";
import type { LewissAluminiumTableEntry } from "./santaFeTableEntryType";

export type TableEntry =
  | KineticsCellularTableEntry
  | KineticsRollerTableEntry
  | KineticsMikronwoodTableEntry
  | LewissAluminiumTableEntry;
