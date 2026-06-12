import type { KineticsCellularTableEntry } from "../../../../type/process/tableEntry/kineticsTableEntryType";
import type {
  BlindCount,
  WindowSelectDetailed,
} from "../../../../type/process/windowSelectType";
import type {
  Room,
  SharePointProjectFile,
} from "../../../../type/sharePoint/project/projectFileType";
import type { KineticsCellularSpec } from "../../../../type/sharePoint/project/spec/kineticsSpec";
import type { WindowMeasurement } from "../../../../type/sharePoint/project/windowMeasurement/windowMeasurementType";
import { getCurrentTableEntryIndex } from "../../../process/tableEntryUtility";
import { getRoomAndWindowMeasurement } from "../../../sharePoint/projectFileUtility";
import { getRemoteAndChannel } from "../../general/motorAccessoryUtility";
import {
  getKineticsCellularControlString,
  getKineticsCellularFabricOpacity,
  getKineticsCellularSideChannelColour,
} from "../presentation/kineticsCellular";
import { getKineticsCellularBlindCostAsync } from "../pricing";

export const defaultKineticsCellularTableEntry: KineticsCellularTableEntry = {
  "blind index": 0,
  location: "",
  width: 0,
  height: 0,
  fit: "",
  "comb size": "",
  fabric: "",
  control: "",
  "control side": "",
  "headrail colour": "",
  "side channel colour": "",
  butting: "",
  remote: 0,
  "remote channel": 0,
  price: "",
};

function getCombSize(windowSelectDetailed: WindowSelectDetailed) {
  switch (windowSelectDetailed.treatment.spec.blindType) {
    case "Kinetics 10mm Cellular Blind":
      return "10mm";
    case "Kinetics 20mm Cellular Blind":
      return "20mm";
    default:
      return "Invalid";
  }
}

async function getNewEntryKineticsCellularBlindAsync(
  windowSelectDetailed: WindowSelectDetailed,
  blindIndex: number,
  projectRoom: Room,
  projectWindow: WindowMeasurement,
  entries: KineticsCellularTableEntry[],
) {
  const location = `${projectRoom.name} - ${projectWindow.name}`;

  const width = windowSelectDetailed.width[0];
  const height = windowSelectDetailed.height;

  const fit =
    windowSelectDetailed.fit.charAt(0).toUpperCase() +
    windowSelectDetailed.fit.slice(1);

  const combSize = getCombSize(windowSelectDetailed);

  const fabric = windowSelectDetailed.treatment.spec.fabric?.name ?? "";

  const control = getKineticsCellularControlString(
    windowSelectDetailed.treatment.spec as KineticsCellularSpec,
  );

  const controlSide = projectWindow.controlSide;

  // hardcoded until we fix headrail colour issues from pricing
  const headrailColour = "White";

  const sideChannelColour = getKineticsCellularSideChannelColour(
    windowSelectDetailed.treatment.spec as KineticsCellularSpec,
  );

  const { remote, channel } = getRemoteAndChannel(
    location,
    windowSelectDetailed.treatment.spec.motorisation ?? "cord",
    entries,
  );

  const buttingString = getButtingString(
    windowSelectDetailed.blindCountString,
    blindIndex,
    "LHS",
  );

  const opacity = getKineticsCellularFabricOpacity(
    windowSelectDetailed.treatment.spec as KineticsCellularSpec,
  );

  const blindType = windowSelectDetailed.treatment.spec.blindType;

  const costOfBlind = await getKineticsCellularBlindCostAsync(
    width,
    height,
    opacity,
    control,
    headrailColour,
    sideChannelColour,
    blindType,
    false,
  );

  const newEntry: KineticsCellularTableEntry = {
    "blind index": blindIndex,
    location: location,
    width: width,
    height: height,
    fit: fit,
    "comb size": combSize,
    fabric: fabric,
    control: control,
    "control side": controlSide,
    "headrail colour": headrailColour,
    "side channel colour": sideChannelColour,
    butting: buttingString,
    remote: remote,
    "remote channel": channel,
    price: costOfBlind.toFixed(2),
  };

  return newEntry;
}

function getButtingString(
  blindCountString: BlindCount,
  blindIndex: number,
  side: "LHS" | "RHS",
) {
  return blindCountString === "butting" ? `${side} of #${blindIndex}` : "No";
}

function generateButtingBlindRHS(
  windowSelectDetailedList: WindowSelectDetailed,
  entry: KineticsCellularTableEntry,
) {
  const remoteChannel =
    entry["remote channel"] > 0 ? entry["remote channel"] + 1 : 0;

  const buttingBlind: KineticsCellularTableEntry = {
    ...entry,
    width: windowSelectDetailedList.width[1],
    butting: getButtingString(
      windowSelectDetailedList.blindCountString,
      entry["blind index"],
      "RHS",
    ),
    "remote channel": remoteChannel,
  };

  return buttingBlind;
}

export async function generateKineticsCellularTableEntryListAsync(
  windowSelectDetailedList: WindowSelectDetailed[],
  projectFile: SharePointProjectFile,
) {
  // using forEach instead of map because if the blind is butting or dual we want to add two entries
  const entries: KineticsCellularTableEntry[] = [];

  for (const w of windowSelectDetailedList) {
    const [projectRoom, projectWindow] = getRoomAndWindowMeasurement(
      projectFile,
      w.roomId,
      w.windowId,
    );

    const blindIndex = getCurrentTableEntryIndex(entries);

    const newEntry = await getNewEntryKineticsCellularBlindAsync(
      w,
      blindIndex,
      projectRoom,
      projectWindow,
      entries,
    );

    entries.push(newEntry);
    if (newEntry.butting === "No") continue;

    const buttingBlind = generateButtingBlindRHS(w, newEntry);
    entries.push(buttingBlind);
  }

  return [...entries];
}
