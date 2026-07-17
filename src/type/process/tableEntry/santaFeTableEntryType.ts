import type { TableEntry } from "./tableEntryType";

export type LewissAluminiumTableEntry = {
  "blind index": number;
  location: string;
  width: number;
  height: number;
  fit: string;
  colour: string;
  control: string;
  "control side": string;
  "tilt side": string;
  "Spacer Block": string;
  price: string;
};

export type LewissFauxwoodTableEntry = {
  "blind index": number;
  location: string;
  width: number;
  height: number;
  fit: string;
  fabric: string;
  control: string;
  "control side": string;
  "tilt side": string;
  valance: string;
  fascia: string;
  "Spacer Block": string;
  "cut out": string;
  "palladian shelf": string;
  butting: string;
  price: string;
};

export type LewissPhoenixwoodTableEntry = {
  "blind index": number;
  location: string;
  width: number;
  height: number;
  fit: string;
  fabric: string;
  control: string;
  "control side": string;
  "tilt side": string;
  valance: string;
  fascia: string;
  "Spacer Block": string;
  "cut out": string;
  "palladian shelf": string;
  butting: string;
  price: string;
};

export function isLewissPhoenixwoodTableEntryList(
  tableEntryList: TableEntry[],
): tableEntryList is LewissPhoenixwoodTableEntry[] {
  return tableEntryList.every((e) => isLewissPhoenixwoodTableEntry(e));
}

export function isLewissPhoenixwoodTableEntry(
  tableEntry: TableEntry,
): tableEntry is LewissPhoenixwoodTableEntry {
  if (typeof tableEntry === "undefined") return false;

  if (!("valance" in tableEntry)) return false;
  if (!("fascia" in tableEntry)) return false;
  if (!("Spacer Block" in tableEntry)) return false;
  if (!("cut out" in tableEntry)) return false;
  if (!("palladian shelf" in tableEntry)) return false;
  if (!("butting" in tableEntry)) return false;
  return true;
}
