import type { WindowSelectDetailed } from "../../../../type/process/windowSelectType";
import type { SharePointProjectFile } from "../../../../type/sharePoint/project/projectFileType";
import type {
  CustomerInformation,
  Worksheet,
  WorksheetCost,
} from "../../../../type/process/worksheetType";
import type { KineticsMikronwoodTableEntry } from "../../../../type/process/tableEntry/kineticsTableEntryType";
import {
  defaultKineticsMikronwoodTableEntry,
  generateKineticsMikroonTableEntryListAsync,
} from "./kineticsMikronwoodTableEntry";
import { getWorksheetCostAsync } from "../../../process/tableEntryUtility";
import type {
  Content,
  ContentTable,
  TDocumentDefinitions,
} from "pdfmake/interfaces";
import { createWindowWareHeader } from "../../pdf/windowWareHeader";
import {
  createBlindTableTextData,
  createCostTotalColumn,
  createCustomerInformationColumn,
  createTable,
} from "../../../process/pdfUtility";
import { createDocument } from "../../../pdfmake/documentUtility";
import type { BlindType } from "../../../../type/process/productType";

export async function createMikronwoodDocumentAsync(
  blindType: BlindType,
  windowSelectDetailedList: WindowSelectDetailed[],
  projectFile: SharePointProjectFile,
): Promise<Worksheet[]> {
  const customerInformation: CustomerInformation = {
    name: projectFile.name,
    reference: projectFile.reference,
    salesConsultant: projectFile.salesConsultant,
  };

  const entryList: KineticsMikronwoodTableEntry[] =
    await generateKineticsMikroonTableEntryListAsync(
      windowSelectDetailedList,
      projectFile,
    );

  if (entryList.length === 0) return [];

  const worksheetCost = await getWorksheetCostAsync(entryList, blindType);

  // todo
  const pdf = await createMikronwoodPDF(
    customerInformation,
    entryList,
    worksheetCost,
  );
  if (typeof pdf === "undefined") return [];

  const worksheet: Worksheet = {
    customer: customerInformation,
    blindType: blindType,
    blindList: entryList,
    worksheetCost: worksheetCost,
    pdfList: [pdf],
  };

  return [worksheet];
}

async function createMikronwoodPDF(
  customerInformation: CustomerInformation,
  tableEntryList: KineticsMikronwoodTableEntry[],
  worksheetCost: WorksheetCost,
): Promise<TDocumentDefinitions | undefined> {
  if (tableEntryList.length === 0) return undefined;

  const content: Content[] = [];

  const windowWareHeader = await createWindowWareHeader();
  content.push(windowWareHeader);

  const title = createOrderTitleString(tableEntryList.length);
  if (typeof title === "undefined") return undefined;
  content.push(title);

  const customerInformationColumn =
    createCustomerInformationColumn(customerInformation);

  content.push(customerInformationColumn);

  const blindInformation = createBlindInformationTable(tableEntryList);

  content.push(blindInformation);

  const costTotal = createCostTotalColumn(worksheetCost);

  content.push(costTotal);

  const { name, reference, salesConsultant } = customerInformation;

  const documentTitle = [name, reference, "mikronwood-50"].join("-");

  const document = createDocument(salesConsultant, documentTitle);
  document.content = [...content];
  return document;
}

function createOrderTitleString(numberOfBlinds: number) {
  if (numberOfBlinds === 0) return undefined;

  const blindText = numberOfBlinds > 1 ? "blinds" : "blind";

  const content: Content = {
    text: (
      "Lewis's order for custom-made kinetics mikronwood 50mm " + blindText
    ).toUpperCase(),
    bold: true,
    marginBottom: 14,
  };

  return content;
}

function createBlindInformationTable(
  tableEntryList: KineticsMikronwoodTableEntry[],
): ContentTable {
  const tableEntries = createBlindTableTextData(tableEntryList);

  const table = createTable(defaultKineticsMikronwoodTableEntry);
  table.table.body.push(...tableEntries);

  return table;
}
