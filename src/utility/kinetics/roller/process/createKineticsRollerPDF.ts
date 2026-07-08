import type {
  Content,
  ContentText,
  TDocumentDefinitions,
} from "pdfmake/interfaces";
import type { KineticsRollerBlindMappedtoProductId } from "../../../../type/process/processType";
import { createDocument } from "../../../pdfmake/documentUtility";
import { createWindowWareHeader } from "../../pdf/windowWareHeader";
import {
  createCostTotalColumn,
  createCustomerInformationColumn,
  createTable,
} from "../../../process/pdfUtility";

import type { Worksheet } from "../../../../type/process/worksheetType";
import type { BlindType } from "../../../../type/process/productType";

export async function createKineticsRollerPDFAsync(
  worksheet: Worksheet,
): Promise<TDocumentDefinitions | undefined> {
  const { blindList, blindType, customer, worksheetCost } = worksheet;

  if (blindList.length === 0) return undefined;

  const content: Content[] = [];
  const windowWareHeader = await createWindowWareHeader();
  content.push(windowWareHeader);

  const title = createOrderTitleString(blindType, blindList.length);
  if (typeof title === "undefined") return undefined;
  content.push(title);

  const customerInformationColumn = createCustomerInformationColumn(customer);

  content.push(customerInformationColumn);

  const blindInformation = createTable(blindList);

  content.push(blindInformation);

  const costTotal = createCostTotalColumn(worksheetCost);

  content.push(costTotal);

  const { name, reference, salesConsultant } = customer;
  const blindName = getKineticsRollerBlindTypeTitle(blindType);
  const documentTitle = [name, reference, blindName].join("-");

  const document = createDocument(salesConsultant, documentTitle);
  document.content = [...content];
  return document;
}

function createOrderTitleString(
  blindType: BlindType,
  numberOfBlinds: number,
): ContentText | undefined {
  if (numberOfBlinds === 0) return undefined;

  const blindText = numberOfBlinds > 1 ? "blinds" : "blind";

  const blindName = getKineticsRollerBlindTypeTitle(blindType);

  const content: Content = {
    text: `Lewis's order for custom-made kinetics ${blindName} ${blindText}`.toUpperCase(),
    bold: true,
    marginBottom: 14,
  };

  return content;
}

function getKineticsRollerBlindTypeTitle(blindType: BlindType): string {
  return kineticsRollerBlindToProductId[
    blindType as keyof KineticsRollerBlindMappedtoProductId
  ];
}

const kineticsRollerBlindToProductId: KineticsRollerBlindMappedtoProductId = {
  "Kinetics Sunscreen Roller Blind": "sunscreen-roller",
  "Kinetics Blockout Roller Blind": "blockout-roller",
  "Kinetics Light Filtering Roller Blind": "light-filtering-roller",
};
