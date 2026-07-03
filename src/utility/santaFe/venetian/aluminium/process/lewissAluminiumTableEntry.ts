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
  getLewissAluminiumSpacerBlockString,
} from "../presentation/lewissAluminium";

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

  //   const price = await getKineticsMikronwoodBlindCostAsync(
  //     width,
  //     height,
  //     control,
  //     fasica,
  //     holdDownBracket,
  //     "Kinetics Mikronwood 50mm Venetian",
  //     false,
  //   );

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
    price: "",
  };

  return newEntry;
}
