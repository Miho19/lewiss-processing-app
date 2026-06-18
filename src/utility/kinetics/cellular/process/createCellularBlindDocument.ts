import type {
  Content,
  ContentTable,
  TDocumentDefinitions,
} from "pdfmake/interfaces";
import type { WindowSelectDetailed } from "../../../../type/process/windowSelectType";
import type { SharePointProjectFile } from "../../../../type/sharePoint/project/projectFileType";
import { createDocument } from "../../../pdfmake/documentUtility";
import { createWindowWareHeader } from "../../pdf/windowWareHeader";
import {
  createBlindTableTextData,
  createCostTotalColumn,
  createCustomerInformationColumn,
  createTable,
} from "../../../process/pdfUtility";
import type { KineticsCellularTableEntry } from "../../../../type/process/tableEntry/kineticsTableEntryType";
import {
  defaultKineticsCellularTableEntry,
  generateKineticsCellularTableEntryListAsync,
} from "./kineticsCellularTableEntry";
import { getWorksheetCostAsync } from "../../../process/tableEntryUtility";
import type {
  CustomerInformation,
  Worksheet,
  WorksheetCost,
} from "../../../../type/process/worksheetType";

export async function createCellularBlindDocumentAsync(
  windowSelectDetailedList: WindowSelectDetailed[],
  projectFile: SharePointProjectFile,
): Promise<Worksheet[]> {
  // get table entries

  const kineticsCellularEntryList: KineticsCellularTableEntry[] =
    await generateKineticsCellularTableEntryListAsync(
      windowSelectDetailedList,
      projectFile,
    );

  if (kineticsCellularEntryList.length === 0) return [];

  const kineticsCellularWorksheetCost = await getWorksheetCostAsync(
    kineticsCellularEntryList,
    "cellular-blind",
  );

  const customerInformation: CustomerInformation = {
    name: projectFile.name,
    reference: projectFile.reference,
    salesConsultant: projectFile.salesConsultant,
  };

  const worksheetPDF = await createWorksheetPDF(
    customerInformation,
    kineticsCellularEntryList,
    kineticsCellularWorksheetCost,
  );

  if (typeof worksheetPDF === "undefined") return [];

  const worksheet: Worksheet = {
    processName: "cellular-blind",
    blindList: kineticsCellularEntryList,
    worksheetCost: kineticsCellularWorksheetCost,
    pdfList: [worksheetPDF],
    projectFile: projectFile,
  };

  return [worksheet];
}

async function createWorksheetPDF(
  customerInformation: CustomerInformation,
  tableEntryList: KineticsCellularTableEntry[],
  worksheetCost: WorksheetCost,
): Promise<TDocumentDefinitions | undefined> {
  const content: Content[] = [];

  const windowWareHeader = await createWindowWareHeader();
  content.push(windowWareHeader);

  const titleString = createOrderTitleStringCellular(tableEntryList.length);
  if (typeof titleString === "undefined") return undefined;
  content.push(titleString);

  const customerInformationColumn =
    createCustomerInformationColumn(customerInformation);

  content.push(customerInformationColumn);

  const blindInformation = await createBlindInformationTable(tableEntryList);

  content.push(blindInformation);

  const costTotal = createCostTotalColumn(worksheetCost);
  content.push(costTotal);

  const document = createDocument(customerInformation, "cellular-blind");
  document.content = [...content];
  return document;
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

async function createBlindInformationTable(
  kineticsCellularTableEntryList: KineticsCellularTableEntry[],
): Promise<ContentTable> {
  const tableEntries = createBlindTableTextData(kineticsCellularTableEntryList);

  const table = createTable(defaultKineticsCellularTableEntry);
  table.table.body.push(...tableEntries);

  return table;
}
