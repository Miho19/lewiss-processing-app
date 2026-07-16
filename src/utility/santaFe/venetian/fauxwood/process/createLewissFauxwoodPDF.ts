import type { Content, TDocumentDefinitions } from "pdfmake/interfaces";
import type { Worksheet } from "../../../../../type/process/worksheetType";
import { createSantaFeOrderLogoAsync } from "../../../pdf/createSantaFeOrderLogo";
import type { BlindType } from "../../../../../type/process/productType";
import {
  createCostTotalColumn,
  createCustomerInformationColumn,
  createTable,
} from "../../../../process/pdfUtility";
import { createDocument } from "../../../../pdfmake/documentUtility";

export async function createLewissFauxwoodPDFAsync(
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
    case "Lewis's 50mm Fauxwood Venetian":
      return "fauxwood 50mm";
    case "Lewis's 63mm Fauxwood Venetian":
      return "fauxwood 63mm";
    default:
      return "error";
  }
}

function getDocumentTitleSuffix(blindType: BlindType) {
  switch (blindType) {
    case "Lewis's 50mm Fauxwood Venetian":
      return "fauxwood-50";
    case "Lewis's 63mm Fauxwood Venetian":
      return "fauxwood-63";
    default:
      return "error";
  }
}
