import type { LewissFauxwoodTableEntry } from "../../../../../type/process/tableEntry/santaFeTableEntryType";
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
  getLewissFauxwoodControlString,
  getLewissFauxwoodSlatSize,
  getLewissFauxwoodValanceString,
} from "../presentation/lewissFauxwood";
import { getLewissFauxwoodBlindCostAsync } from "../pricing/getLewissFauxwoodBlindCost";

export async function generateLewissFauxwoodTableEntryListAsync(
  windowSelectDetailedList: WindowSelectDetailed[],
  projectFile: SharePointProjectFile,
): Promise<LewissFauxwoodTableEntry[]> {
  const entries: LewissFauxwoodTableEntry[] = [];

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
): Promise<LewissFauxwoodTableEntry | undefined> {
  const spec = windowSelectDetailed.treatment.spec;
  if (!isVenetianSpec(spec)) return undefined;

  const location = `${projectRoom.name} - ${projectWindow.name}`;
  const width = windowSelectDetailed.width[0];
  const height = windowSelectDetailed.height;

  const fit =
    windowSelectDetailed.fit.charAt(0).toUpperCase() +
    windowSelectDetailed.fit.slice(1);

  const fabric = spec.fabric?.name ?? "";

  const control = getLewissFauxwoodControlString(spec);

  const controlSide = projectWindow.controlSide || spec.controlSide;

  const tiltSide = spec.controlSide;
  const valance = getLewissFauxwoodValanceString(spec) ?? "";

  const fascia = "";

  const spacerBlock = spec.spacerBlock ? "Yes" : "No";
  const cutOutString = spec.cutout ? "Yes" : "No";
  const palladianShelf = "";

  const butting = "";

  const slatSize = parseInt(getLewissFauxwoodSlatSize(spec));
  const fabricMultiplier = spec.fabric?.multiplier ?? 1;

  const price = await getLewissFauxwoodBlindCostAsync(
    width,
    height,
    slatSize,
    fabricMultiplier,
    control,
    valance,
    fascia,
    spec.spacerBlock ?? false,
    cutOutString,
    palladianShelf,
    spec.baseType,
  );

  const newEntry: LewissFauxwoodTableEntry = {
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
