import type {
  Column,
  Content,
  ContentImage,
  ContentStack,
  TDocumentDefinitions,
} from "pdfmake/interfaces";
import type { SharePointProjectFileType } from "../../zod/sharePointProjectFile";
import type { WindowMeasurementJoined } from "../processProject";
import { createDocument } from "./pdfmake";
import { getBase64Image, windowWareLogoBase64 } from "../getBase64Image";

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

  document.content = [...content];
  return document;
}

async function createWindowWareHeader() {
  const image: ContentImage = {
    image: "data:image/png;base64," + windowWareLogoBase64,
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
    marginBottom: 6,
  };

  return content;
}

function createCustomerInformation(
  name: string,
  reference: string,
  consultant: string,
) {
  const stack1: ContentStack = {
    stack: [{ text: "Client", marginBottom: 4 }, { text: "Reference" }],
  };

  const stack2: ContentStack = {
    stack: [{ text: name, marginBottom: 4 }, { text: reference }],
  };

  const column: Column[] = [
    { width: "auto", ...stack1 },
    { width: "auto", ...stack2 },
  ];

  const stack3: ContentStack = {
    stack: [{ text: "Date", marginBottom: 4 }, { text: "Consultant" }],
  };

  const customerInformationColumn: Column[] = [
    { width: "auto", columns: [...column], columnGap: 24 },
    { width: "*", text: " " },
  ];

  const content: Content = {
    columns: customerInformationColumn,
  };

  return content;
}

export default createCellularBlindDocument;
