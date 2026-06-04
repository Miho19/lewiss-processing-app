import type {
  Column,
  Content,
  ContentImage,
  ContentStack,
  TDocumentDefinitions,
} from "pdfmake/interfaces";
import type {
  SharePointProjectFileType,
  SharePointRoomType,
  SharePointSpecType,
  SharePointWindowType,
} from "../../zod/sharePointProjectFile";
import {
  getRoomAndWindowFromProjectFileByWindowId,
  type WindowBlindCountStringType,
  type WindowMeasurementJoined,
} from "../processProject";
import { createDocument } from "../pdfmake/pdfmake";
import getImageAsBase64 from "../getBase64Image";

import windowWareLogo from "../../asset/Windoware-Logo-1.png";
import { createTable, generateTableEntryList } from "../pdfmake/commonFunction";
import {
  getKineticsCellularOperationString,
  getKineticsCellularSideChannelColour,
} from "./kineticsCellular";

async function createCellularBlindDocument(
  projectFile: SharePointProjectFileType,
  windowJoined: WindowMeasurementJoined[],
): Promise<TDocumentDefinitions[]> {
  const document = createDocument(projectFile, "cellular-blind");
  const content: Content[] = [];

  const windowWareHeader = await createWindowWareHeader();
  content.push(windowWareHeader);

  const titleString = createOrderTitleString(windowJoined.length);
  if (typeof titleString === "undefined")
    throw new Error("number of blinds is zero");

  content.push(titleString);

  const customerInformation = createCustomerInformation(
    projectFile.name,
    projectFile.reference,
    projectFile.salesConsultant,
  );

  content.push(customerInformation);

  const blindInformation = createBlindInformationTable(
    projectFile,
    windowJoined,
  );
  content.push(blindInformation);

  document.content = [...content];
  return [document];
}

// common function
export async function createWindowWareHeader() {
  const windowWareLogoAsBase64: string = await getImageAsBase64(windowWareLogo);

  const image: ContentImage = {
    image: windowWareLogoAsBase64,
    width: 100,
  };

  const content: Content[] = [
    {
      columns: [{ width: "*", text: " " }, image],
    },
  ];

  return content;
}

function createOrderTitleString(numberOfBlinds: number) {
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
export function createCustomerInformation(
  name: string,
  reference: string,
  consultant: string,
) {
  const leftStack1: ContentStack = {
    stack: [{ text: "Client", marginBottom: 4 }, { text: "Reference" }],
  };

  const leftStack2: ContentStack = {
    stack: [{ text: name, marginBottom: 4 }, { text: reference }],
  };

  const leftColumn: Column[] = [
    { width: "auto", ...leftStack1 },
    { width: "auto", ...leftStack2 },
  ];

  const rightStack1: ContentStack = {
    stack: [{ text: "Date", marginBottom: 4 }, { text: "Consultant" }],
  };

  const rightStack2: ContentStack = {
    stack: [
      {
        text: new Date().toLocaleDateString(),
        marginBottom: 4,
        alignment: "right",
      },
      { text: consultant, alignment: "right" },
    ],
  };

  const rightColumn: Column[] = [
    { width: "auto", ...rightStack1 },
    { width: "auto", ...rightStack2 },
  ];

  const customerInformationColumn: Column[] = [
    { width: "auto", columns: [...leftColumn], columnGap: 24 },
    { width: "*", text: " " },
    { width: "auto", columns: [...rightColumn], columnGap: 24 },
  ];

  const content: Content = {
    columns: customerInformationColumn,
    marginBottom: 14,
  };

  return content;
}

export type KineticsCellularTableEntry = {
  "blind index": number;
  location: string;
  width: number;
  height: number;
  fit: string;
  "comb size": string;
  fabric: string;
  operation: string;
  "operation side": string;
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
  operation: "",
  "operation side": "",
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

// END go into common file

function getNewEntryKineticsCellularBlind(
  windowJoined: WindowMeasurementJoined,
  blindIndex: number,
  projectRoom: SharePointRoomType,
  projectWindow: SharePointWindowType,
  entries: KineticsCellularTableEntry[],
) {
  const location = `${projectRoom.name} - ${projectWindow.name}`;

  const combSize = getCombSize(windowJoined);

  const operation = getKineticsCellularOperationString(
    windowJoined.treatment.spec as SharePointSpecType,
  );

  const sideChannelColour = getKineticsCellularSideChannelColour(
    windowJoined.treatment.spec as SharePointSpecType,
  );

  const remoteChannelObject = getRemoteAndChannel(
    location,
    windowJoined.treatment.spec as SharePointSpecType,
    entries,
  );

  const buttingString = getButtingString(
    windowJoined.blindCountString,
    blindIndex,
    "LHS",
  );

  const newEntry: KineticsCellularTableEntry = {
    "blind index": blindIndex,
    location: location,
    width: windowJoined.width[0],
    height: windowJoined.height,
    fit: windowJoined.fit.charAt(0).toUpperCase() + windowJoined.fit.slice(1),
    "comb size": combSize,
    fabric: windowJoined.treatment.spec?.fabric?.name ?? "",
    operation: operation,
    "operation side": projectWindow.controlSide,
    "headrail colour": "White",
    "side channel colour": sideChannelColour,
    butting: buttingString,
    remote: remoteChannelObject.remote,
    "remote channel": remoteChannelObject.channel,
    price: 0,
  };

  return newEntry;
}

function getBlindIndex(entries: KineticsCellularTableEntry[]): number {
  if (entries.length === 0) return 1;
  const currentMax = entries.reduce(
    (max, entry) => (entry["blind index"] > max ? entry["blind index"] : max),
    -1,
  );
  return currentMax + 1;
}

type RemoteChannelObjectType = {
  remote: number;
  channel: number;
};

function getMaxRemote(entries: KineticsCellularTableEntry[]) {
  return entries.reduce(
    (max, curr) => (curr.remote > max ? curr.remote : max),
    0,
  );
}

function getMaxChannel(entries: KineticsCellularTableEntry[]) {
  return entries.reduce(
    (max, curr) =>
      curr["remote channel"] > max ? curr["remote channel"] : max,
    0,
  );
}

function getRemoteAndChannel(
  location: string,
  spec: SharePointSpecType,
  entries: KineticsCellularTableEntry[],
): RemoteChannelObjectType {
  const operation = getKineticsCellularOperationString(spec);
  if (operation !== "Lithium-ion") return { remote: 0, channel: 0 };

  const roomName = location.split("-")[0].trim();

  const filtered = entries.filter(
    (e) =>
      e.location.split("-")[0].trim() === roomName &&
      e.operation === "Lithium-ion",
  );

  if (filtered.length === 0)
    return { remote: getMaxRemote(entries) + 1, channel: 1 };

  const maxChannel = getMaxChannel(filtered);

  return { remote: filtered[0].remote, channel: maxChannel + 1 };
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
  const buttingBlind: KineticsCellularTableEntry = {
    ...entry,
    width: windowJoined.width[1],
    butting: getButtingString(
      windowJoined.blindCountString,
      entry["blind index"],
      "RHS",
    ),
    "remote channel": entry["remote channel"] + 1,
  };

  return buttingBlind;
}

function generateKineticsCellularTableEntries(
  projectFile: SharePointProjectFileType,
  windowJoined: WindowMeasurementJoined[],
) {
  // using forEach instead of map because if the blind is butting or dual we want to add two entries
  const entries: KineticsCellularTableEntry[] = [];

  windowJoined.forEach((w) => {
    const [projectRoom, projectWindow] =
      getRoomAndWindowFromProjectFileByWindowId(
        projectFile,
        w.roomId,
        w.windowId,
      );

    const blindIndex = getBlindIndex(entries);

    const newEntry = getNewEntryKineticsCellularBlind(
      w,
      blindIndex,
      projectRoom,
      projectWindow,
      entries,
    );

    entries.push(newEntry);

    if (newEntry.butting === "No") return;

    const buttingBlind = generateButtingBlindRHS(w, newEntry);
    entries.push(buttingBlind);
  });

  return [...entries];
}

function createBlindInformationTable(
  projectFile: SharePointProjectFileType,
  windowJoined: WindowMeasurementJoined[],
) {
  const kineticsCellularEntries: KineticsCellularTableEntry[] =
    generateKineticsCellularTableEntries(projectFile, windowJoined);

  const tableEntries = generateTableEntryList(kineticsCellularEntries);

  const table = createTable(defaultKineticsCellularTableEntry);

  table.table.body.push(...tableEntries);

  return table;
}

export default createCellularBlindDocument;
