import type {
  Content,
  ContentTable,
  TDocumentDefinitions,
} from "pdfmake/interfaces";
import type {
  SharePointProjectFileType,
  SharePointRoomType,
  SharePointSpecType,
  SharePointWindowType,
} from "../../../zod/sharePointProjectFile";
import {
  getRoomAndWindowFromProjectFileByWindowId,
  type WindowBlindCountStringType,
  type WindowMeasurementJoined,
} from "../../processProject";
import { createDocument } from "../../pdfmake/pdfmake";

import {
  createTable,
  generateTableEntryList,
} from "../../pdfmake/commonFunction";
import {
  getKineticsCellularControlString,
  getKineticsCellularFabricOpacity,
  getKineticsCellularSideChannelColour,
} from "./kineticsCellular";
import { getKineticsCellularBlindCostAsync } from "./kineticsCellularPricing";
import {
  createCustomerInformation,
  createWindowWareHeader,
  getBlindIndex,
  getRemoteAndChannel,
} from "../common";

async function createCellularBlindDocument(
  projectFile: SharePointProjectFileType,
  windowJoined: WindowMeasurementJoined[],
): Promise<TDocumentDefinitions[]> {
  const document = createDocument(projectFile, "cellular-blind");
  const content: Content[] = [];

  const windowWareHeader = await createWindowWareHeader();
  content.push(windowWareHeader);

  const titleString = createOrderTitleStringCellular(windowJoined.length);
  if (typeof titleString === "undefined") return [];
  content.push(titleString);

  const customerInformation = createCustomerInformation(
    projectFile.name,
    projectFile.reference,
    projectFile.salesConsultant,
  );

  content.push(customerInformation);

  const blindInformation = await createBlindInformationTable(
    projectFile,
    windowJoined,
  );

  content.push(blindInformation);

  document.content = [...content];
  return [document];
}

function createOrderTitleStringCellular(numberOfBlinds: number) {
  if (numberOfBlinds === 0) return undefined;

  const blindText = numberOfBlinds > 1 ? "blinds" : "blind";

  const content: Content = {
    text: (
      "Lewis's order for custom-made kinetics honeycomb " + blindText
    ).toUpperCase(),
    bold: true,
    marginBottom: 14,
  };

  return content;
}

// to common

export type KineticsCellularTableEntry = {
  "blind index": number;
  location: string;
  width: number;
  height: number;
  fit: string;
  "comb size": string;
  fabric: string;
  control: string;
  "control side": string;
  "headrail colour": string;
  "side channel colour": string;
  butting: string;
  remote: number;
  "remote channel": number;
  price: number;
};

const defaultKineticsCellularTableEntry: KineticsCellularTableEntry = {
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
  price: 0,
};

function getCombSize(window: WindowMeasurementJoined) {
  switch (window.treatment.spec.blindType) {
    case "Kinetics 10mm Cellular Blind":
      return "10mm";
    case "Kinetics 20mm Cellular Blind":
      return "20mm";
    default:
      return "Invalid";
  }
}

async function getNewEntryKineticsCellularBlindAsync(
  windowJoined: WindowMeasurementJoined,
  blindIndex: number,
  projectRoom: SharePointRoomType,
  projectWindow: SharePointWindowType,
  entries: KineticsCellularTableEntry[],
) {
  const location = `${projectRoom.name} - ${projectWindow.name}`;

  const width = windowJoined.width[0];
  const height = windowJoined.height;

  const fit =
    windowJoined.fit.charAt(0).toUpperCase() + windowJoined.fit.slice(1);

  const combSize = getCombSize(windowJoined);

  const fabric = windowJoined.treatment.spec.fabric?.name ?? "";

  const control = getKineticsCellularControlString(
    windowJoined.treatment.spec as SharePointSpecType,
  );

  const controlSide = projectWindow.controlSide;

  // hardcoded until we fix headrail colour issues from pricing
  const headrailColour = "White";

  const sideChannelColour = getKineticsCellularSideChannelColour(
    windowJoined.treatment.spec as SharePointSpecType,
  );

  const { remote, channel } = getRemoteAndChannel(
    location,
    windowJoined.treatment.spec.motorisation ?? "cord",
    entries,
  );

  const buttingString = getButtingString(
    windowJoined.blindCountString,
    blindIndex,
    "LHS",
  );

  const opacity = getKineticsCellularFabricOpacity(
    windowJoined.treatment.spec as SharePointSpecType,
  );

  const blindType = windowJoined.treatment.spec.blindType;

  const costOfBlind = await getKineticsCellularBlindCostAsync(
    width,
    height,
    opacity,
    control,
    headrailColour,
    sideChannelColour,
    blindType,
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
    price: costOfBlind,
  };

  return newEntry;
}

function getButtingString(
  blindCountString: WindowBlindCountStringType,
  blindIndex: number,
  side: "LHS" | "RHS",
) {
  return blindCountString === "butting" ? `${side} of #${blindIndex}` : "No";
}

function generateButtingBlindRHS(
  windowJoined: WindowMeasurementJoined,
  entry: KineticsCellularTableEntry,
) {
  const remoteChannel =
    entry["remote channel"] > 0 ? entry["remote channel"] + 1 : 0;

  const buttingBlind: KineticsCellularTableEntry = {
    ...entry,
    width: windowJoined.width[1],
    butting: getButtingString(
      windowJoined.blindCountString,
      entry["blind index"],
      "RHS",
    ),
    "remote channel": remoteChannel,
  };

  return buttingBlind;
}

async function generateKineticsCellularTableEntriesAsync(
  projectFile: SharePointProjectFileType,
  windowJoined: WindowMeasurementJoined[],
) {
  // using forEach instead of map because if the blind is butting or dual we want to add two entries
  const entries: KineticsCellularTableEntry[] = [];

  for (const w of windowJoined) {
    const [projectRoom, projectWindow] =
      getRoomAndWindowFromProjectFileByWindowId(
        projectFile,
        w.roomId,
        w.windowId,
      );

    const blindIndex = getBlindIndex(entries);

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

async function createBlindInformationTable(
  projectFile: SharePointProjectFileType,
  windowJoined: WindowMeasurementJoined[],
): Promise<ContentTable> {
  const kineticsCellularEntries: KineticsCellularTableEntry[] =
    await generateKineticsCellularTableEntriesAsync(projectFile, windowJoined);

  const tableEntries = generateTableEntryList(kineticsCellularEntries);

  const table = createTable(defaultKineticsCellularTableEntry);
  table.table.body.push(...tableEntries);

  return table;
}

export default createCellularBlindDocument;
