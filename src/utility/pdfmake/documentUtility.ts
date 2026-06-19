import type {
  Content,
  TDocumentDefinitions,
  TDocumentInformation,
} from "pdfmake/interfaces";
import type { ProcessName } from "../../type/process/processType";
import { getDeliverToText } from "../kinetics/pdf/deliverToText";
import type { CustomerInformation } from "../../type/process/worksheetType";

export function createDocument(
  customerInformation: CustomerInformation,
  processName: ProcessName,
) {
  const { name, reference, salesConsultant } = customerInformation;

  const title = [name, reference, processName].join("-");

  const metaData: TDocumentInformation = {
    title: title,
    author: salesConsultant,
    creator: "lewiss-processing",
  };

  const deliverToText = getDeliverToText();

  const document: TDocumentDefinitions = {
    content: [],
    info: metaData,
    pageOrientation: "landscape",
    footer: (currentPage, pageCount) => {
      return {
        stack: [deliverToText, getPageNumberText(currentPage, pageCount)],
      };
    },
  };

  return document;
}

function getPageNumberText(currentPage: number, pageCount: number): Content {
  if (pageCount === 1) return { text: "", margin: [0, 0, 0, 0] };
  return {
    text: `${currentPage}/${pageCount}`,
    alignment: "center",
    margin: [0, 5, 0, 5],
  };
}

export async function openPDFDocumentAsync(document: TDocumentDefinitions) {
  const pdfmake = (await import("pdfmake/build/pdfmake")).default;
  const pdfFonts = (await import("pdfmake/build/vfs_fonts")).default;

  pdfmake.addVirtualFileSystem(pdfFonts);

  pdfmake.createPdf(document).open();
}

export async function getPDFDocumentAsync(document: TDocumentDefinitions) {
  const pdfmake = (await import("pdfmake/build/pdfmake")).default;
  const pdfFonts = (await import("pdfmake/build/vfs_fonts")).default;

  pdfmake.addVirtualFileSystem(pdfFonts);

  return pdfmake.createPdf(document);
}
