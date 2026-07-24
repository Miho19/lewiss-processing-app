import type { KineticsRollerTableEntry } from "../../../../type/process/tableEntry/kineticsTableEntryType";
import type { WindowSelectDetailed } from "../../../../type/process/windowSelectType";
import type {
  Room,
  SharePointProjectFile,
} from "../../../../type/sharePoint/project/projectFileType";
import { isKineticsRollerSpec } from "../../../../type/sharePoint/project/spec/kineticsSpec";
import type { WindowMeasurement } from "../../../../type/sharePoint/project/windowMeasurement/windowMeasurementType";
import { getCurrentTableEntryIndex } from "../../../process/tableEntryUtility";
import { getRoomAndWindowMeasurement } from "../../../sharePoint/projectFileUtility";
import { getRemoteAndChannel } from "../../general/motorAccessoryUtility";
import { getKineticsRollerPelmetString } from "../presentation";
import { getKineticsRollerControlString } from "../presentation/kineticsRoller";
import { getKineticsRollerBlindCostAsync } from "../pricing/getKineticsRollerBlindCostAsync";

export async function createKineticsRollerTableEntryAsync(
  windowSelectDetailed: WindowSelectDetailed,
  blindIndex: number,
  room: Room,
  windowMeasurement: WindowMeasurement,
  entries: KineticsRollerTableEntry[],
) {
  const spec = windowSelectDetailed.treatment.spec;
  if (!isKineticsRollerSpec(spec)) return undefined;

  const location = `${room.name} - ${windowMeasurement.name}`;

  const width = windowSelectDetailed.width[0];
  const height = windowSelectDetailed.height;

  const fit =
    windowSelectDetailed.fit.charAt(0).toUpperCase() +
    windowSelectDetailed.fit.slice(1);

  const blindType = spec.blindType;

  const roll = spec.rollDirection.replace("Roll", "");

  const fabric = spec.fabric?.name ?? "";
  const fabricMultiplier = spec.fabric?.multiplier ?? 0;

  const controlString = getKineticsRollerControlString(spec);
  const controlLength = controlString.toLowerCase().includes("chain")
    ? `${windowMeasurement.controlLength}mm`
    : "";

  const controlOutputString = `${controlString} ${controlLength}`.trim();

  const bottomRailType = spec.bottomRailType;
  const bottomRailColour = spec.bottomRailColour;

  const bottomRail = `${bottomRailType} - ${bottomRailColour}`;
  const controlSide = windowMeasurement.controlSide;

  const bracket = `${spec.bracketColour}`;

  const pelmet = getKineticsRollerPelmetString(spec.pelmetType);

  const { remote, channel } = getRemoteAndChannel(
    location,
    controlString,
    entries,
  );

  const price = await getKineticsRollerBlindCostAsync(
    width,
    height,
    fabricMultiplier,
    controlString,
    controlLength,
    bottomRailType,
    bottomRailColour,
    pelmet,
    blindType,
    false,
  );

  const newEntry: KineticsRollerTableEntry = {
    "blind index": blindIndex,
    location: location,
    width: width,
    height: height,
    fit: fit,
    roll: roll,
    fabric: fabric,
    control: controlOutputString,
    "control side": controlSide,
    "bottom rail": bottomRail,
    bracket: bracket,
    pelmet: pelmet,
    butting: "No",
    remote: remote,
    "remote channel": channel,
    price: price.toFixed(2),
  };

  return newEntry;
}

export async function generateKineticsRollerTableEntryListAsync(
  windowSelectDetailedList: WindowSelectDetailed[],
  projectFile: SharePointProjectFile,
): Promise<KineticsRollerTableEntry[]> {
  const entries: KineticsRollerTableEntry[] = [];

  for (const w of windowSelectDetailedList) {
    const [projectRoom, projectWindow] = getRoomAndWindowMeasurement(
      projectFile,
      w.roomId,
      w.windowId,
    );

    const blindIndex = getCurrentTableEntryIndex(entries);

    const newEntry = await createKineticsRollerTableEntryAsync(
      w,
      blindIndex,
      projectRoom,
      projectWindow,
      entries,
    );

    if (typeof newEntry === "undefined") continue;

    entries.push(newEntry);
  }

  return entries;
}
