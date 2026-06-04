import type { Content, TDocumentDefinitions } from "pdfmake/interfaces";
import type {
  SharePointProductId,
  SharePointProjectFileType,
  SharePointRoomType,
  SharePointSpec2Type,
  SharePointWindowType,
} from "../../zod/sharePointProjectFile";
import {
  getRoomAndWindowFromProjectFileByWindowId,
  type WindowMeasurementJoined,
} from "../processProject";
import { createDocument } from "../pdfmake/pdfmake";
import {
  createCustomerInformation,
  createWindowWareHeader,
  getBlindIndex,
  getRemoteAndChannel,
} from "./createCellularPDFDocument";
import { createTable, generateTableEntryList } from "../pdfmake/commonFunction";
import { getKineticsRollerOperationString } from "./kineticsRoller";

async function createSunscreenRollerBlindDocument(
  projectFile: SharePointProjectFileType,
  windowJoined: WindowMeasurementJoined[],
): Promise<TDocumentDefinitions[]> {
  if (windowJoined.length === 0) return [];

  const document = createDocument(projectFile, "sunscreen-roller");

  const content: Content[] = [];
  const windowWareHeader = await createWindowWareHeader();
  content.push(windowWareHeader);

  const title = createOrderTitlStringRoller("Sunscreen", windowJoined.length);
  if (typeof title === "undefined") throw new Error("number of blinds is zero");
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
  return [document];
}

async function createBlockoutRollerBlindDocument(
  projectFile: SharePointProjectFileType,
  windowJoined: WindowMeasurementJoined[],
): Promise<TDocumentDefinitions[]> {
  console.log(windowJoined);
  return await [createDocument(projectFile, "blockout-roller")];
}

function createOrderTitlStringRoller(
  product: "Sunscreen" | "Blockout" | "Light-filtering",
  numberOfBlinds: number,
) {
  if (numberOfBlinds === 0) return undefined;

  const blindText = numberOfBlinds > 1 ? "blinds" : "blind";

  const content: Content = {
    text: `Lewis's order for custom-made kinetics ${product} roller ${blindText}`.toUpperCase(),
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

  let operationString = getKineticsRollerOperationString(spec);
  if (operationString.toLowerCase().includes("chain"))
    operationString = operationString + ` ${projectWindow.controlLength}mm`;

  const bottomRail = `${spec.bottomRailType} - ${spec.bottomRailColour}`;
  const operationSide = projectWindow.controlSide;

  const bracket = `${spec.bracketColour}`;

  const pelmet = typeof spec.pelmetType === "undefined" ? "" : spec.pelmetType;

  console.log(spec.motorisation);

  const { remote, channel } = getRemoteAndChannel(
    location,
    operationString,
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
    control: operationString,
    "control side": operationSide,
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
  // const kineticsCellularEntries: KineticsRollerTableEntry[] =
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
