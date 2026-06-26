import type {
  KineticsCellularTableEntry,
  KineticsMikronwoodTableEntry,
  KineticsRollerTableEntry,
} from "./kineticsTableEntryType";

export type TableEntry =
  | KineticsCellularTableEntry
  | KineticsRollerTableEntry
  | KineticsMikronwoodTableEntry;
