import type { TableEntry } from "./tableEntryType";

export type KineticsTableEntry =
  | KineticsRollerTableEntry
  | KineticsCellularTableEntry
  | KineticsMikronwoodTableEntry;

export function isKineticsTableEntryList(
  tableEntryList: TableEntry[],
): tableEntryList is KineticsTableEntry[] {
  return tableEntryList.every((e) => isKineticsTableEntry(e));
}

export function isKineticsTableEntry(
  tableEntry: TableEntry,
): tableEntry is KineticsTableEntry {
  return (
    isKineticsCellularTableEntry(tableEntry) ||
    isKineticsRollerTableEntry(tableEntry) ||
    isKineticsMikronwoodTableEntry(tableEntry)
  );
}

export type RemoteChannel = {
  remote: number;
  channel: number;
};

export type KineticsCellularTableEntry = {
  "blind index": number;
  location: string;
  width: number;
  height: number;
  fit: string;
  "comb size": string;
  fabric: string;
  control: string;
  "control side": string;
  "headrail colour": string;
  "side channel colour": string;
  butting: string;
  remote: number;
  "remote channel": number;
  price: string;
};

export function isKineticsCellularTableEntryList(
  tableEntryList: TableEntry[],
): tableEntryList is KineticsCellularTableEntry[] {
  return tableEntryList.every((e) => isKineticsCellularTableEntry(e));
}

export function isKineticsCellularTableEntry(
  tableEntry: TableEntry,
): tableEntry is KineticsCellularTableEntry {
  if (typeof tableEntry === "undefined") return false;
  if (!("comb size" in tableEntry)) return false;
  if (!("headrail colour" in tableEntry)) return false;
  if (!("side channel colour" in tableEntry)) return false;
  return true;
}

export type KineticsRollerTableEntry = {
  "blind index": number;
  location: string;
  width: number;
  height: number;
  fit: string;
  roll: string;
  fabric: string;
  control: string;
  "control side": string;
  "bottom rail": string;
  bracket: string;
  pelmet: string;
  butting: string;
  remote: number;
  "remote channel": number;
  price: string;
};

export function isKineticsRollerTableEntry(
  tableEntry: TableEntry,
): tableEntry is KineticsRollerTableEntry {
  if (typeof tableEntry === "undefined") return false;
  if (!("roll" in tableEntry)) return false;
  if (!("bottom rail" in tableEntry)) return false;
  if (!("bracket" in tableEntry)) return false;
  if (!("pelmet" in tableEntry)) return false;

  return true;
}

export type KineticsMikronwoodTableEntry = {
  "blind index": number;
  location: string;
  width: number;
  height: number;
  fit: string;
  colour: string;
  control: string;
  "control side": string;
  "tilt side": string;
  fascia: string;
  "hold down bracket": string;
  butting: string;
  remote: number;
  "remote channel": number;
  price: string;
};

export function isKineticsMikronwoodTableEntry(
  tableEntry: TableEntry,
): tableEntry is KineticsMikronwoodTableEntry {
  if (typeof tableEntry === "undefined") return false;
  if (!("tilt side" in tableEntry)) return false;
  if (!("fascia" in tableEntry)) return false;
  if (!("hold down bracket" in tableEntry)) return false;

  return true;
}
