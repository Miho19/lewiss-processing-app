import {
  isKineticsTableEntryList,
  type KineticsTableEntry,
  type RemoteChannel,
} from "../../../type/process/tableEntry/kineticsTableEntryType";
import type { TableEntry } from "../../../type/process/tableEntry/tableEntryType";

/**
 *
 */
export function getMaxRemote(entries: TableEntry[]) {
  if (!isKineticsTableEntryList(entries)) return undefined;

  return entries.reduce(
    (max, curr) => (curr.remote > max ? curr.remote : max),
    0,
  );
}

function getMaxChannel(entries: TableEntry[]) {
  if (!isKineticsTableEntryList(entries)) return undefined;

  return entries.reduce(
    (max, curr) =>
      curr["remote channel"] > max ? curr["remote channel"] : max,
    0,
  );
}

export function getRemoteAndChannel(
  location: string,
  control: string,
  entries: TableEntry[],
): RemoteChannel {
  if (!isKineticsTableEntryList(entries)) return { remote: 0, channel: 0 };

  if (control !== "Lithium-ion") return { remote: 0, channel: 0 };

  const roomName = getRoomName(location);

  const roomEntries = filterForRoomName(entries, roomName);
  const motorisedEntires = filterForMotorisation(roomEntries);

  const maxRemote = getMaxRemote(entries);
  if (typeof maxRemote === "undefined") return { remote: 0, channel: 0 };

  if (motorisedEntires.length === 0)
    return { remote: maxRemote + 1, channel: 1 };

  const maxChannel = getMaxChannel(motorisedEntires);
  if (typeof maxChannel === "undefined") return { remote: 0, channel: 0 };

  return { remote: motorisedEntires[0].remote, channel: maxChannel + 1 };
}

function getRoomName(location: string) {
  return location.split("-")[0].trim();
}

function filterForMotorisation(entries: KineticsTableEntry[]) {
  return entries.filter((e) => e.control === "Lithium-ion");
}

function filterForRoomName(entries: KineticsTableEntry[], roomName: string) {
  return entries.filter((e) => getRoomName(e.location) === roomName);
}
