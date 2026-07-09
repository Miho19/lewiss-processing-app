import type {
  KineticsCellularTableEntry,
  KineticsMikronwoodTableEntry,
  KineticsRollerTableEntry,
} from "./kineticsTableEntryType";
import type {
  LewissAluminiumTableEntry,
  LewissFauxwoodTableEntry,
  LewissPhoenixwoodTableEntry,
} from "./santaFeTableEntryType";

export type TableEntry =
  | KineticsCellularTableEntry
  | KineticsRollerTableEntry
  | KineticsMikronwoodTableEntry
  | LewissAluminiumTableEntry
  | LewissFauxwoodTableEntry
  | LewissPhoenixwoodTableEntry;
