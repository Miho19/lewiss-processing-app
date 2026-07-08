import type { Content, TDocumentDefinitions } from "pdfmake/interfaces";
import type { Worksheet } from "../../../../type/process/worksheetType";
import { createWindowWareHeader } from "../../pdf/windowWareHeader";
import {
  createCostTotalColumn,
  createCustomerInformationColumn,
  createTable,
} from "../../../process/pdfUtility";
import { createDocument } from "../../../pdfmake/documentUtility";

export async function createKineticsCellularPDF(
  worksheet: Worksheet,
): Promise<TDocumentDefinitions | undefined> {
  const { blindList, customer, worksheetCost } = worksheet;
  if (blindList.length === 0) return undefined;

  const content: Content[] = [];
  const windowWareHeader = await createWindowWareHeader();
  content.push(windowWareHeader);

  const titleString = createOrderTitleStringCellular(blindList.length);
  if (typeof titleString === "undefined") return undefined;
  content.push(titleString);

  const customerInformationColumn = createCustomerInformationColumn(customer);

  content.push(customerInformationColumn);

  const blindInformation = createTable(blindList);

  content.push(blindInformation);

  const costTotal = createCostTotalColumn(worksheetCost);
  content.push(costTotal);

  const { name, reference, salesConsultant } = customer;

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
