import type {
  Content,
  ContentText,
  TDocumentDefinitions,
} from "pdfmake/interfaces";
import type {
  KineticsRollerBlindType,
  ProcessTitleType,
  SharePointProjectFileType,
  SharePointRoomType,
  SharePointSpec2Type,
  SharePointWindowType,
} from "../../../zod/sharePointProjectFile";
import {
  getRoomAndWindowFromProjectFileByWindowId,
  type WindowMeasurementJoined,
} from "../../processProject";
import { createDocument } from "../../pdfmake/pdfmake";

import {
  createTable,
  generateTableEntryList,
} from "../../pdfmake/commonFunction";
import {
  createCustomerInformation,
  createWindowWareHeader,
  getBlindIndex,
  getRemoteAndChannel,
} from "../common";
import { getKineticsRollerControlString } from "./kineticsRoller";

async function createRollerBlindDocument(
  projectFile: SharePointProjectFileType,
  windowJoined: WindowMeasurementJoined[],
  processTitle: ProcessTitleType,
): Promise<TDocumentDefinitions | undefined> {
  if (windowJoined.length === 0) return undefined;

  const document = createDocument(projectFile, processTitle);

  const content: Content[] = [];
  const windowWareHeader = await createWindowWareHeader();
  content.push(windowWareHeader);

  const title = createOrderTitleStringRoller(processTitle, windowJoined.length);
  if (typeof title === "undefined") return undefined;
  content.push(title);

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

  return document;
}

async function createSunscreenRollerBlindDocument(
  projectFile: SharePointProjectFileType,
  windowJoined: WindowMeasurementJoined[],
): Promise<TDocumentDefinitions[]> {
  const sunscreenDocument = await createRollerBlindDocument(
    projectFile,
    windowJoined,
    "sunscreen-roller",
  );
  if (typeof sunscreenDocument === "undefined") return [];

  return [sunscreenDocument];
}

type partitionedKineticsRollerRecordType = Record<
  KineticsRollerBlindType,
  WindowMeasurementJoined[]
>;

function partitionWindowJoinedIntoKineticsRollerTypes(
  windowJoined: WindowMeasurementJoined[],
) {
  const splitWindowJoinedRecord: partitionedKineticsRollerRecordType = {
    "Kinetics Blockout Roller Blind": [],
    "Kinetics Light Filtering Roller Blind": [],
    "Kinetics Sunscreen Roller Blind": [],
  };

  Object.entries(splitWindowJoinedRecord).forEach(([key, value]) => {
    const filteredList = windowJoined.filter(
      (w) =>
        w.treatment.spec.blindType.localeCompare(key, undefined, {
          sensitivity: "base",
        }) === 0,
    );

    value.push(...filteredList);
  });

  return splitWindowJoinedRecord;
}

async function createBlockoutRollerBlindDocument(
  projectFile: SharePointProjectFileType,
  windowJoined: WindowMeasurementJoined[],
): Promise<TDocumentDefinitions[]> {
  const documentOutput = [];

  const windowJoinedSplitRecord: partitionedKineticsRollerRecordType =
    partitionWindowJoinedIntoKineticsRollerTypes(windowJoined);

  const blockoutWindowJoined =
    windowJoinedSplitRecord["Kinetics Blockout Roller Blind"];

  if (blockoutWindowJoined.length > 0) {
    const blockoutDocument = await _createBlockoutRollerDocument(
      projectFile,
      blockoutWindowJoined,
    );

    if (typeof blockoutDocument !== "undefined")
      documentOutput.push(...blockoutDocument);
  }

  const lightFilteringWindowJoined =
    windowJoinedSplitRecord["Kinetics Light Filtering Roller Blind"];

  if (lightFilteringWindowJoined.length > 0) {
    const lightfilteringDocument = await _createLightFilteringRollerDocument(
      projectFile,
      lightFilteringWindowJoined,
    );
    if (typeof lightfilteringDocument !== "undefined")
      documentOutput.push(...lightfilteringDocument);
  }

  return documentOutput;
}

async function _createBlockoutRollerDocument(
  projectFile: SharePointProjectFileType,
  windowJoined: WindowMeasurementJoined[],
): Promise<TDocumentDefinitions[]> {
  const blockoutDocument = await createRollerBlindDocument(
    projectFile,
    windowJoined,
    "blockout-roller",
  );
  if (typeof blockoutDocument === "undefined") return [];

  return [blockoutDocument];
}
async function _createLightFilteringRollerDocument(
  projectFile: SharePointProjectFileType,
  windowJoined: WindowMeasurementJoined[],
) {
  const lightFilteringDocument = await createRollerBlindDocument(
    projectFile,
    windowJoined,
    "light-filtering-roller",
  );
  if (typeof lightFilteringDocument === "undefined") return [];

  return [lightFilteringDocument];
}

function createOrderTitleStringRoller(
  product: ProcessTitleType,
  numberOfBlinds: number,
): ContentText | undefined {
  if (numberOfBlinds === 0) return undefined;

  const blindText = numberOfBlinds > 1 ? "blinds" : "blind";

  const content: Content = {
    text: `Lewis's order for custom-made kinetics ${product} ${blindText}`.toUpperCase(),
    bold: true,
    marginBottom: 14,
  };

  return content;
}

export type KineticsRollerTableEntry = {
  "blind index": number;
  location: string;
  width: number;
  height: number;
  fit: string;
  roll: string;
  fabric: string;
  control: string;
  "control side": string;
  "bottom rail": string;
  bracket: string;
  pelmet: string;
  butting: string;
  remote: number;
  "remote channel": number;
  price: string;
};

const defaultKineticsRollerTableEntry: KineticsRollerTableEntry = {
  "blind index": 0,
  location: "",
  width: 0,
  height: 0,
  fit: "",
  roll: "",
  fabric: "",
  control: "",
  "control side": "",
  "bottom rail": "",
  bracket: "",
  pelmet: "",
  butting: "",
  remote: 0,
  "remote channel": 0,
  price: "",
};

async function getNewEntryKineticsRollerBlind(
  windowJoined: WindowMeasurementJoined,
  blindIndex: number,
  projectRoom: SharePointRoomType,
  projectWindow: SharePointWindowType,
  entries: KineticsRollerTableEntry[],
) {
  const location = `${projectRoom.name} - ${projectWindow.name}`;

  const width = windowJoined.width[0];
  const height = windowJoined.height;

  const fit =
    windowJoined.fit.charAt(0).toUpperCase() + windowJoined.fit.slice(1);

  const spec = windowJoined.treatment.spec as SharePointSpec2Type;

  const roll = spec.rollDirection.replace("Roll", "");

  const fabric = spec.fabric?.name ?? "Missing Fabric";

  const controlString = getKineticsRollerControlString(spec);
  const controlLength = projectWindow.controlLength;

  const controlOutputString = `${controlString} ${controlString.toLowerCase().includes("chain") && controlLength + `mm`}`;

  const bottomRail = `${spec.bottomRailType} - ${spec.bottomRailColour}`;
  const controlSide = projectWindow.controlSide;

  const bracket = `${spec.bracketColour}`;

  const pelmet = typeof spec.pelmetType === "undefined" ? "" : spec.pelmetType;

  const { remote, channel } = getRemoteAndChannel(
    location,
    controlString,
    entries,
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
    butting: " ",
    remote: remote,
    "remote channel": channel,
    price: " ",
  };

  return newEntry;
}

async function generateKineticsRollerTableEntries(
  projectFile: SharePointProjectFileType,
  windowJoined: WindowMeasurementJoined[],
): Promise<KineticsRollerTableEntry[]> {
  const entries: KineticsRollerTableEntry[] = [];

  for (const w of windowJoined) {
    const [projectRoom, projectWindow] =
      getRoomAndWindowFromProjectFileByWindowId(
        projectFile,
        w.roomId,
        w.windowId,
      );

    const blindIndex = getBlindIndex(entries);

    const newEntry = await getNewEntryKineticsRollerBlind(
      w,
      blindIndex,
      projectRoom,
      projectWindow,
      entries,
    );

    entries.push(newEntry);
  }

  return entries;
}

async function createBlindInformationTable(
  projectFile: SharePointProjectFileType,
  windowJoined: WindowMeasurementJoined[],
) {
  const kineticsRollerEntries: KineticsRollerTableEntry[] =
    await generateKineticsRollerTableEntries(projectFile, windowJoined);

  const tableEntries = generateTableEntryList(kineticsRollerEntries);

  const table = createTable(defaultKineticsRollerTableEntry);

  table.table.body.push(...tableEntries);

  return table;
}

export {
  createSunscreenRollerBlindDocument,
  createBlockoutRollerBlindDocument,
};
