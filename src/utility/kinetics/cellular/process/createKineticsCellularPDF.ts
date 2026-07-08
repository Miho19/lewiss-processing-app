import type { Content, TDocumentDefinitions } from "pdfmake/interfaces";
import type { KineticsCellularTableEntry } from "../../../../type/process/tableEntry/kineticsTableEntryType";
import type {
  CustomerInformation,
  WorksheetCost,
} from "../../../../type/process/worksheetType";
import { createWindowWareHeader } from "../../pdf/windowWareHeader";
import {
  createCostTotalColumn,
  createCustomerInformationColumn,
  createTable,
} from "../../../process/pdfUtility";
import { createDocument } from "../../../pdfmake/documentUtility";

export async function createKineticsCellularPDF(
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

  const blindInformation = createTable(tableEntryList);

  content.push(blindInformation);

  const costTotal = createCostTotalColumn(worksheetCost);
  content.push(costTotal);

  const { name, reference, salesConsultant } = customerInformation;

  const documentTitle = [name, reference, "cellular-blind"].join("-");

  const document = createDocument(salesConsultant, documentTitle);
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
