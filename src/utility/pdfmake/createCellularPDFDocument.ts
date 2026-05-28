import type {
  Column,
  Content,
  ContentImage,
  ContentStack,
  TDocumentDefinitions,
} from "pdfmake/interfaces";
import type {
  SharePointProjectFileType,
  SharePointSpecType,
} from "../../zod/sharePointProjectFile";
import {
  getRoomAndWindowFromProjectFileByWindowId,
  type WindowMeasurementJoined,
} from "../processProject";
import { createDocument } from "./pdfmake";
import getImageAsBase64 from "../getBase64Image";

import windowWareLogo from "../../asset/Windoware-Logo-1.png";
import { createTable, generateTableEntryList } from "./commonFunction";
import {
  getKineticsCellularOperationString,
  getKineticsCellularSideChannelColour,
} from "../kinetics/kineticsCellular";

async function createCellularBlindDocument(
  projectFile: SharePointProjectFileType,
  windowJoined: WindowMeasurementJoined[],
): Promise<TDocumentDefinitions> {
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
  return document;
}

async function createWindowWareHeader() {
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

function createCustomerInformation(
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
  "Blind Index": number;
  location: string;
  width: number;
  Height: number;
  Fit: string;
  "Comb Size": string;
  Fabric: string;
  Operation: string;
  "Operation Side": string;
  "Headrail Colour": string;
  "Side Channel Colour": string;
  Butting: "Yes" | "No";
  Remote: number;
  "Remote Channel": number;
  Price: number;
};

const defaultKineticsCellularTableEntry: KineticsCellularTableEntry = {
  "Blind Index": 0,
  location: "",
  width: 0,
  Height: 0,
  Fit: "",
  "Comb Size": "",
  Fabric: "",
  Operation: "",
  "Operation Side": "",
  "Headrail Colour": "",
  "Side Channel Colour": "",
  Butting: "Yes",
  Remote: 0,
  "Remote Channel": 0,
  Price: 0,
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

// go into common file

function generateKineticsCellularTableEntries(
  projectFile: SharePointProjectFileType,
  windowJoined: WindowMeasurementJoined[],
) {
  // using forEach instead of map because if the blind is butting or dual we want to add two entries
  const entries: KineticsCellularTableEntry[] = [];

  windowJoined.forEach((w, index) => {
    const [projectRoom, projectWindow] =
      getRoomAndWindowFromProjectFileByWindowId(
        projectFile,
        w.roomId,
        w.windowId,
      );

    const location = `${projectRoom.name} - ${projectWindow.name}`;

    const combSize = getCombSize(w);
    // legacy fault, spec2 shouldn't exist...
    const operation = getKineticsCellularOperationString(
      w.treatment.spec as SharePointSpecType,
    );

    const sideChannelColour = getKineticsCellularSideChannelColour(
      w.treatment.spec as SharePointSpecType,
    );

    const butting = w.blindCountString === "butting" ? "Yes" : "No";

    const newEntry: KineticsCellularTableEntry = {
      "Blind Index": index + 1,
      location: location,
      width: w.width[0],
      Height: w.height,
      Fit: w.fit,
      "Comb Size": combSize,
      Fabric: w.treatment.spec.fabric.name,
      Operation: operation,
      "Operation Side": projectWindow.controlSide,
      "Headrail Colour": "White",
      "Side Channel Colour": sideChannelColour,
      Butting: butting,
      Remote: 0,
      "Remote Channel": 0,
      Price: 0,
    };

    // how do we handle dual blinds?

    entries.push(newEntry);

    if (w.width.length === 1 && butting === "No") return;

    const buttingBlind = { ...newEntry, width: w.width[1] };
    entries.push(buttingBlind);
  });

  return entries;
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
