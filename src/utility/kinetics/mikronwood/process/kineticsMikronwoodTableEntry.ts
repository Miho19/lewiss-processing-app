import type { KineticsMikronwoodTableEntry } from "../../../../type/process/tableEntry/kineticsTableEntryType";
import type {
  BlindCount,
  WindowSelectDetailed,
} from "../../../../type/process/windowSelectType";
import type {
  Room,
  SharePointProjectFile,
} from "../../../../type/sharePoint/project/projectFileType";
import { isVenetianSpec } from "../../../../type/sharePoint/project/spec/venetianSpec";
import type { WindowMeasurement } from "../../../../type/sharePoint/project/windowMeasurement/windowMeasurementType";
import { getCurrentTableEntryIndex } from "../../../process/tableEntryUtility";
import { getRoomAndWindowMeasurement } from "../../../sharePoint/projectFileUtility";
import { getRemoteAndChannel } from "../../general/motorAccessoryUtility";
import {
  getKineticsMikronwoodControlString,
  getKineticsMikronwoodFasciaString,
  getKineticsMikronwoodHoldDownBracketString,
} from "../presentation/kineticsMikronwood";
import { getKineticsMikronwoodBlindCostAsync } from "../pricing";

export async function generateKineticsMikroonTableEntryListAsync(
  windowSelectDetailedList: WindowSelectDetailed[],
  projectFile: SharePointProjectFile,
): Promise<KineticsMikronwoodTableEntry[]> {
  const entries: KineticsMikronwoodTableEntry[] = [];

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
      entries,
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
  entries: KineticsMikronwoodTableEntry[],
): Promise<KineticsMikronwoodTableEntry | undefined> {
  const spec = windowSelectDetailed.treatment.spec;
  if (!isVenetianSpec(spec)) return undefined;

  const location = `${projectRoom.name} - ${projectWindow.name}`;
  const width = windowSelectDetailed.width[0];
  const height = windowSelectDetailed.height;

  const fit =
    windowSelectDetailed.fit.charAt(0).toUpperCase() +
    windowSelectDetailed.fit.slice(1);

  const colour = spec.fabric?.name ?? "";

  const control = getKineticsMikronwoodControlString(spec);

  const controlSide = projectWindow.controlSide;

  const tiltSide = spec.controlSide;

  const fasica = getKineticsMikronwoodFasciaString(spec);

  const holdDownBracket = getKineticsMikronwoodHoldDownBracketString(spec);

  const buttingString = getButtingString(
    windowSelectDetailed.blindCountString,
    blindIndex,
    "LHS",
  );

  const { remote, channel } = getRemoteAndChannel(location, control, entries);

  const price = await getKineticsMikronwoodBlindCostAsync(
    width,
    height,
    control,
    fasica,
    holdDownBracket,
    "Kinetics Mikronwood 50mm Venetian",
    false,
  );

  const newEntry: KineticsMikronwoodTableEntry = {
    "blind index": blindIndex,
    location: location,
    width: width,
    height: height,
    fit: fit,
    colour: colour,
    control: control,
    "control side": controlSide,
    "tilt side": tiltSide,
    fascia: fasica,
    "hold down bracket": holdDownBracket,
    butting: buttingString,
    remote: remote,
    "remote channel": channel,
    price: price.toFixed(2),
  };

  return newEntry;
}

const defaultKineticsMikronwoodTableEntry: KineticsMikronwoodTableEntry = {
  "blind index": 0,
  location: "",
  width: 0,
  height: 0,
  fit: "",
  colour: "",
  control: "",
  "control side": "",
  "tilt side": "",
  fascia: "",
  "hold down bracket": "",
  butting: "",
  remote: 0,
  "remote channel": 0,
  price: "",
};

function getButtingString(
  blindCountString: BlindCount,
  blindIndex: number,
  side: "LHS" | "RHS",
) {
  return blindCountString === "butting" ? `${side} of #${blindIndex}` : "No";
}
