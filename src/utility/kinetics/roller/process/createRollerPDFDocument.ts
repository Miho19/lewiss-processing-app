import type {
  Column,
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
  createAdditionalProductCostColumn,
  createBlindSubTotalCostColumn,
  createBlindTableTextData,
  createCustomerInformation,
  createGSTCostColumn,
  createTable,
  createTotalCostColumn,
} from "../../../process/pdfUtility";
import type { KineticsRollerTableEntry } from "../../../../type/process/tableEntry/kineticsTableEntryType";
import { getRoomAndWindowMeasurement } from "../../../sharePoint/projectFileUtility";
import {
  getCurrentTableEntryIndex,
  getWorksheetCostAsync,
} from "../../../process/tableEntryUtility";

import type { WorksheetCost } from "../../../../type/process/worksheetType";
import {
  createKineticsRollerTableEntryAsync,
  defaultKineticsRollerTableEntry,
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

async function generateKineticsRollerTableEntryListAsync(
  windowSelectDetailedList: WindowSelectDetailed[],
  projectFile: SharePointProjectFile,
): Promise<KineticsRollerTableEntry[]> {
  const entries: KineticsRollerTableEntry[] = [];

  for (const w of windowSelectDetailedList) {
    const [projectRoom, projectWindow] = getRoomAndWindowMeasurement(
      projectFile,
      w.roomId,
      w.windowId,
    );

    const blindIndex = getCurrentTableEntryIndex(entries);

    const newEntry = await createKineticsRollerTableEntryAsync(
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

function createBlindInformationTable(
  kineticsRollerTableEntryList: KineticsRollerTableEntry[],
) {
  const tableEntries = createBlindTableTextData(kineticsRollerTableEntryList);

  const table = createTable(defaultKineticsRollerTableEntry);

  table.table.body.push(...tableEntries);

  return table;
}

function createHorizontalLine(): Content {
  const table: Content = {
    table: {
      widths: ["*"],
      body: [[""]],
    },
    layout: {
      hLineWidth: (index) => (index === 1 ? 1 : 0),
      hLineColor: () => "#cccccc",
      vLineWidth: () => 0,
    },
    margin: [0, 0, 0, 10],
  };

  return table;
}

function createCostTotalColumn(worksheetCost: WorksheetCost): Column[] {
  const blindSubtotalColumn = createBlindSubTotalCostColumn(worksheetCost);

  const additionalProductColumn =
    createAdditionalProductCostColumn(worksheetCost);

  const gstCostColumn = createGSTCostColumn(worksheetCost);

  const totalCostColumn = createTotalCostColumn(worksheetCost);

  const stack: Content[] = [
    blindSubtotalColumn,
    additionalProductColumn,
    gstCostColumn,
    createHorizontalLine(),
    totalCostColumn,
  ];

  const content: Content[] = [
    {
      columns: [
        { width: "*", text: " " },
        { width: "auto", stack: stack },
      ],
    },
  ];

  return content;
}
