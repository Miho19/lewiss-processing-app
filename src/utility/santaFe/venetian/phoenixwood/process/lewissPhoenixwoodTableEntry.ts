import type { LewissPhoenixwoodTableEntry } from "../../../../../type/process/tableEntry/santaFeTableEntryType";
import type { WindowSelectDetailed } from "../../../../../type/process/windowSelectType";
import type {
  Room,
  SharePointProjectFile,
} from "../../../../../type/sharePoint/project/projectFileType";
import { isVenetianSpec } from "../../../../../type/sharePoint/project/spec/venetianSpec";
import type { WindowMeasurement } from "../../../../../type/sharePoint/project/windowMeasurement/windowMeasurementType";
import { getCurrentTableEntryIndex } from "../../../../process/tableEntryUtility";
import { getRoomAndWindowMeasurement } from "../../../../sharePoint/projectFileUtility";
import {
  getLewissPhoenixwoodControlString,
  getLewissPhoenixwoodSlatSize,
  getLewissPhoenixwoodValanceString,
} from "../presentation/lewissPhoenixwood";
import { getLewissPhoenixwoodBlindCostAsync } from "../pricing/getLewissPhoenixwoodBlindCost";

export async function generateLewissPhoenixwoodTableEntryListAsync(
  windowSelectDetailedList: WindowSelectDetailed[],
  projectFile: SharePointProjectFile,
): Promise<LewissPhoenixwoodTableEntry[]> {
  const entries: LewissPhoenixwoodTableEntry[] = [];

  for (const w of windowSelectDetailedList) {
    const [projectRoom, projectWindow] = getRoomAndWindowMeasurement(
      projectFile,
      w.roomId,
      w.windowId,
    );

    const blindIndex = getCurrentTableEntryIndex(entries);
    const newEntry = await getNewEntry(
      w,
      blindIndex,
      projectRoom,
      projectWindow,
    );

    if (typeof newEntry === "undefined") continue;
    entries.push(newEntry);
  }

  return [...entries];
}

async function getNewEntry(
  windowSelectDetailed: WindowSelectDetailed,
  blindIndex: number,
  projectRoom: Room,
  projectWindow: WindowMeasurement,
): Promise<LewissPhoenixwoodTableEntry | undefined> {
  const spec = windowSelectDetailed.treatment.spec;

  if (!isVenetianSpec(spec)) return undefined;

  const location = `${projectRoom.name} - ${projectWindow.name}`;
  const width = windowSelectDetailed.width[0];
  const height = windowSelectDetailed.height;

  const fit =
    windowSelectDetailed.fit.charAt(0).toUpperCase() +
    windowSelectDetailed.fit.slice(1);

  const fabric = spec.fabric?.name ?? "";

  const control = getLewissPhoenixwoodControlString(spec);

  const controlSide = projectWindow.controlSide || spec.controlSide;

  const tiltSide = spec.controlSide;
  const valance = getLewissPhoenixwoodValanceString(spec) ?? "";

  const fascia = "";

  const spacerBlock = spec.spacerBlock ? "Yes" : "No";
  const cutOutString = spec.cutout ? "Yes" : "No";
  const palladianShelf = "";

  const butting = "";

  const slatSize = parseInt(getLewissPhoenixwoodSlatSize(spec));
  const fabricMultiplier = spec.fabric?.multiplier ?? 1;

  const price = await getLewissPhoenixwoodBlindCostAsync(
    width,
    height,
    slatSize,
    fabricMultiplier,
    control,
    valance,
    fascia,
    spec.spacerBlock ?? false,
    spec.cutout ?? false,
    palladianShelf,
    spec.baseType,
  );

  const newEntry: LewissPhoenixwoodTableEntry = {
    "blind index": blindIndex,
    location: location,
    width: width,
    height: height,
    fit: fit,
    fabric: fabric,
    control: control,
    "control side": controlSide,
    "tilt side": tiltSide,
    valance: valance,
    fascia: fascia,
    "Spacer Block": spacerBlock,
    "cut out": cutOutString,
    "palladian shelf": palladianShelf,
    butting: butting,
    price: price.toFixed(2),
  };

  return newEntry;
}
