import type { Content, TDocumentDefinitions } from "pdfmake/interfaces";
import type {
  CustomerInformation,
  WorksheetCost,
} from "../../../../../type/process/worksheetType";
import type { LewissAluminiumTableEntry } from "../../../../../type/process/tableEntry/santaFeTableEntryType";
import { createSantaFeOrderLogoAsync } from "../../../pdf/createSantaFeOrderLogo";
import type { BlindType } from "../../../../../type/process/productType";
import { createDocument } from "../../../../pdfmake/documentUtility";

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
