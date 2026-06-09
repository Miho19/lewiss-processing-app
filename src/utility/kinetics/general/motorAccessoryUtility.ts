import type { RemoteChannel } from "../../../type/process/tableEntry/kineticsTableEntryType";
import type { TableEntry } from "../../../type/process/tableEntry/tableEntryType";

/**
 *
 */
function getMaxRemote(entries: TableEntry[]) {
  return entries.reduce(
    (max, curr) => (curr.remote > max ? curr.remote : max),
    0,
  );
}

function getMaxChannel(entries: TableEntry[]) {
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
  // to make it more general, need an array of known motor items that remotes are allowed for
  if (control !== "Lithium-ion") return { remote: 0, channel: 0 };

  const roomName = location.split("-")[0].trim();

  const filtered = entries.filter(
    (e) =>
      e.location.split("-")[0].trim() === roomName &&
      e.control === "Lithium-ion",
  );

  if (filtered.length === 0)
    return { remote: getMaxRemote(entries) + 1, channel: 1 };

  const maxChannel = getMaxChannel(filtered);

  return { remote: filtered[0].remote, channel: maxChannel + 1 };
}
