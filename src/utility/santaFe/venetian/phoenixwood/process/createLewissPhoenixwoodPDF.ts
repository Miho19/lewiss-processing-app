import type { Content, TDocumentDefinitions } from "pdfmake/interfaces";
import type { Worksheet } from "../../../../../type/process/worksheetType";
import {
  createCostTotalColumn,
  createCustomerInformationColumn,
  createTable,
} from "../../../../process/pdfUtility";
import { createSantaFeOrderLogoAsync } from "../../../pdf/createSantaFeOrderLogo";
import type { BlindType } from "../../../../../type/process/productType";
import { createDocument } from "../../../../pdfmake/documentUtility";

export async function createLewissPhoenixwoodPDFAsync(
  worksheet: Worksheet,
): Promise<TDocumentDefinitions | undefined> {
  const { blindList, blindType, customer, worksheetCost } = worksheet;

  if (blindList.length === 0) return undefined;

  const content: Content[] = [];

  const santaFeHeader = await createSantaFeOrderLogoAsync();
  content.push(santaFeHeader);

  const title = createOrderTitleString(blindList.length, blindType);
  content.push(title);

  const customerInformationColumn = createCustomerInformationColumn(customer);

  content.push(customerInformationColumn);

  const blindInformationTable = createTable(blindList, {
    evenCellLength: true,
  });
  content.push(blindInformationTable);

  const costTotal = createCostTotalColumn(worksheetCost);
  content.push(costTotal);

  const { name, reference, salesConsultant } = customer;

  const documentTitle = [
    name,
    reference,
    getDocumentTitleSuffix(blindType),
  ].join("-");

  const document = createDocument(salesConsultant, documentTitle);
  document.content = [...content];
  return document;
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

function getTitleBlindTypeString(blindType: BlindType) {
  switch (blindType) {
    case "Lewis's 50mm Phoenixwood Venetian":
      return "phoenixwood 50mm";
    case "Lewis's 63mm Phoenixwood Venetian":
      return "phoenixwood 63mm";
    default:
      return "error";
  }
}

function getDocumentTitleSuffix(blindType: BlindType) {
  switch (blindType) {
    case "Lewis's 50mm Phoenixwood Venetian":
      return "phoenixwood-50";
    case "Lewis's 63mm Phoenixwood Venetian":
      return "phoenixwood-63";
    default:
      return "error";
  }
}
