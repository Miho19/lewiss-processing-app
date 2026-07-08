import type { LewissAluminiumTableEntry } from "../../../../../type/process/tableEntry/santaFeTableEntryType";
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
  getLewissAluminiumControlString,
  getLewissAluminiumSlatSize,
  getLewissAluminiumSpacerBlockString,
} from "../presentation/lewissAluminium";
import { getLewissAluminiumBlindCostAsync } from "../pricing";

export async function generateLewissAluminiumTableEntryListAsync(
  windowSelectDetailedList: WindowSelectDetailed[],
  projectFile: SharePointProjectFile,
): Promise<LewissAluminiumTableEntry[]> {
  const entries: LewissAluminiumTableEntry[] = [];

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
): Promise<LewissAluminiumTableEntry | undefined> {
  const spec = windowSelectDetailed.treatment.spec;
  if (!isVenetianSpec(spec)) return undefined;

  const location = `${projectRoom.name} - ${projectWindow.name}`;
  const width = windowSelectDetailed.width[0];
  const height = windowSelectDetailed.height;

  const fit =
    windowSelectDetailed.fit.charAt(0).toUpperCase() +
    windowSelectDetailed.fit.slice(1);

  const colour = spec.fabric?.name ?? "";

  const control = getLewissAluminiumControlString(spec);

  const controlSide = projectWindow.controlSide || spec.controlSide;

  const tiltSide = spec.controlSide;

  const spacerBlock = getLewissAluminiumSpacerBlockString(spec);

  const slatSize = parseInt(getLewissAluminiumSlatSize(spec));
  const fabricMultiplier = spec.fabric?.multiplier ?? 1;

  const price = await getLewissAluminiumBlindCostAsync(
    width,
    height,
    slatSize,
    fabricMultiplier,
    control,
    spec.spacerBlock ?? false,
    spec.baseType,
  );

  const newEntry: LewissAluminiumTableEntry = {
    "blind index": blindIndex,
    location: location,
    width: width,
    height: height,
    fit: fit,
    colour: colour,
    control: control,
    "control side": controlSide,
    "tilt side": tiltSide,
    "Spacer Block": spacerBlock,
    price: price.toFixed(2),
  };

  return newEntry;
}

export const defaultLewissAluminiumTableEntry: LewissAluminiumTableEntry = {
  "blind index": 0,
  location: "",
  width: 0,
  height: 0,
  fit: "",
  colour: "",
  control: "",
  "control side": "",
  "tilt side": "",
  "Spacer Block": "",
  price: "",
};
