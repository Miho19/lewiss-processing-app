import type {
  Column,
  Content,
  ContentColumns,
  ContentTable,
  TDocumentDefinitions,
} from "pdfmake/interfaces";
import type {
  CustomerInformation,
  WorksheetCost,
} from "../../../../../type/process/worksheetType";
import type { LewissAluminiumTableEntry } from "../../../../../type/process/tableEntry/santaFeTableEntryType";
import { createSantaFeOrderLogoAsync } from "../../../pdf/createSantaFeOrderLogo";
import type { BlindType } from "../../../../../type/process/productType";
import { createDocument } from "../../../../pdfmake/documentUtility";
import {
  createCostTotalColumn,
  createCustomerInformationColumn,
  createTable,
} from "../../../../process/pdfUtility";

export async function createLewissAluminiumPDFAsync(
  customerInformation: CustomerInformation,
  tableEntryList: LewissAluminiumTableEntry[],
  worksheetCost: WorksheetCost,
  blindType: BlindType,
): Promise<TDocumentDefinitions | undefined> {
  if (tableEntryList.length === 0) return undefined;

  const content: Content[] = [];

  const santaFeHeader = await createSantaFeOrderLogoAsync();
  content.push(santaFeHeader);

  const title = createOrderTitleString(tableEntryList.length, blindType);
  content.push(title);

  const customerInformationColumn =
    createCustomerInformationColumn(customerInformation);

  content.push(customerInformationColumn);

  const blindInformationTable = createTable(tableEntryList, {
    evenCellLength: true,
  });
  content.push(blindInformationTable);

  const costTotal = createCostTotalColumn(worksheetCost);
  content.push(costTotal);

  const { name, reference, salesConsultant } = customerInformation;

  const documentTitle = [
    name,
    reference,
    getDocumentTitleSuffix(blindType),
  ].join("-");

  const document = createDocument(salesConsultant, documentTitle);
  document.content = [...content];
  return document;
}

function getDocumentTitleSuffix(blindType: BlindType) {
  switch (blindType) {
    case "Lewis's 25mm Aluminium Venetian":
      return "aluminium-25";
    case "Lewis's 50mm Aluminium Venetian":
      return "aluminium-50";
    default:
      return "error";
  }
}

function getTitleBlindTypeString(blindType: BlindType) {
  switch (blindType) {
    case "Lewis's 25mm Aluminium Venetian":
      return "aluminium 25mm";
    case "Lewis's 50mm Aluminium Venetian":
      return "aluminium 50mm";
    default:
      return "error";
  }
}

function createOrderTitleString(numberOfBlinds: number, blindType: BlindType) {
  const blindText = numberOfBlinds > 1 ? "blinds" : "blind";

  const blindTypeString = getTitleBlindTypeString(blindType);

  const content: Content = {
    text: `Order for custom-made Lewis's ${blindTypeString} ${blindText}`.toUpperCase(),
    bold: true,
    marginBottom: 14,
  };

  return content;
}
