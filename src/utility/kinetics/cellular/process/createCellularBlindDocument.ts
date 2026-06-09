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
  createCustomerInformation,
  createTable,
} from "../../../process/pdfUtility";
import type { KineticsCellularTableEntry } from "../../../../type/process/tableEntry/kineticsTableEntryType";
import {
  defaultKineticsCellularTableEntry,
  generateKineticsCellularTableEntriesAsync,
} from "./kineticsCellularTableEntry";

export async function createCellularBlindDocumentAsync(
  windowSelectDetailedList: WindowSelectDetailed[],
  projectFile: SharePointProjectFile,
): Promise<TDocumentDefinitions[]> {
  const content: Content[] = [];

  const windowWareHeader = await createWindowWareHeader();
  content.push(windowWareHeader);

  const titleString = createOrderTitleStringCellular(
    windowSelectDetailedList.length,
  );
  if (typeof titleString === "undefined") return [];
  content.push(titleString);

  const customerInformation = createCustomerInformation(
    projectFile.name,
    projectFile.reference,
    projectFile.salesConsultant,
  );

  content.push(customerInformation);

  const kineticsCellularEntryList: KineticsCellularTableEntry[] =
    await generateKineticsCellularTableEntriesAsync(
      windowSelectDetailedList,
      projectFile,
    );

  const blindInformation = await createBlindInformationTable(
    kineticsCellularEntryList,
  );

  content.push(blindInformation);

  const document = createDocument(projectFile, "cellular-blind");
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

async function createBlindInformationTable(
  kineticsCellularTableEntryList: KineticsCellularTableEntry[],
): Promise<ContentTable> {
  const tableEntries = createBlindTableTextData(kineticsCellularTableEntryList);

  const table = createTable(defaultKineticsCellularTableEntry);
  table.table.body.push(...tableEntries);

  return table;
}
