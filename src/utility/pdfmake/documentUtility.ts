import type {
  Content,
  TDocumentDefinitions,
  TDocumentInformation,
} from "pdfmake/interfaces";
import type { SharePointProjectFile } from "../../type/sharePoint/project/projectFileType";
import type { ProcessName } from "../../type/process/processType";
import { getDeliverToText } from "../kinetics/pdf/deliverToText";

export function createDocument(
  projectFile: SharePointProjectFile,
  processName: ProcessName,
) {
  const { name, reference, salesConsultant } = projectFile;

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
