import type {
  Content,
  ContentText,
  TDocumentDefinitions,
} from "pdfmake/interfaces";
import type { ProcessName } from "../../../../type/process/processType";
import type { WindowSelectDetailed } from "../../../../type/process/windowSelectType";
import type { SharePointProjectFile } from "../../../../type/sharePoint/project/projectFileType";
import { createDocument } from "../../../pdfmake/documentUtility";
import { createWindowWareHeader } from "../../pdf/windowWareHeader";
import {
  createBlindTableTextData,
  createCostTotalColumn,
  createCustomerInformation,
  createTable,
} from "../../../process/pdfUtility";
import type { KineticsRollerTableEntry } from "../../../../type/process/tableEntry/kineticsTableEntryType";
import { getWorksheetCostAsync } from "../../../process/tableEntryUtility";

import {
  defaultKineticsRollerTableEntry,
  generateKineticsRollerTableEntryListAsync,
} from "./createKineticsRollerTableEntry";

export async function createRollerBlindDocumentAsync(
  windowSelectDetailedList: WindowSelectDetailed[],
  processName: ProcessName,
  projectFile: SharePointProjectFile,
): Promise<TDocumentDefinitions | undefined> {
  if (windowSelectDetailedList.length === 0) return undefined;

  const content: Content[] = [];
  const windowWareHeader = await createWindowWareHeader();
  content.push(windowWareHeader);

  const title = createOrderTitleString(
    processName,
    windowSelectDetailedList.length,
  );
  if (typeof title === "undefined") return undefined;
  content.push(title);

  const customerInformation = createCustomerInformation(
    projectFile.name,
    projectFile.reference,
    projectFile.salesConsultant,
  );

  content.push(customerInformation);

  const kineticsRollerTableEntryList: KineticsRollerTableEntry[] =
    await generateKineticsRollerTableEntryListAsync(
      windowSelectDetailedList,
      projectFile,
    );

  const blindInformation = createBlindInformationTable(
    kineticsRollerTableEntryList,
  );

  content.push(blindInformation);

  const kineticsRollerWorksheetCost = await getWorksheetCostAsync(
    kineticsRollerTableEntryList,
    processName,
  );

  const costTotal = createCostTotalColumn(kineticsRollerWorksheetCost);

  content.push(costTotal);

  const document = createDocument(projectFile, processName);
  document.content = [...content];
  return document;
}

function createOrderTitleString(
  processName: ProcessName,
  numberOfBlinds: number,
): ContentText | undefined {
  if (numberOfBlinds === 0) return undefined;

  const blindText = numberOfBlinds > 1 ? "blinds" : "blind";

  const content: Content = {
    text: `Lewis's order for custom-made kinetics ${processName} ${blindText}`.toUpperCase(),
    bold: true,
    marginBottom: 14,
  };

  return content;
}

function createBlindInformationTable(
  kineticsRollerTableEntryList: KineticsRollerTableEntry[],
) {
  const tableEntries = createBlindTableTextData(kineticsRollerTableEntryList);

  const table = createTable(defaultKineticsRollerTableEntry);

  table.table.body.push(...tableEntries);

  return table;
}
