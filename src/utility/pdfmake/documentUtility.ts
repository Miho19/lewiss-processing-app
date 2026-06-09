import type {
  TDocumentDefinitions,
  TDocumentInformation,
} from "pdfmake/interfaces";
import type { SharePointProjectFile } from "../../type/sharePoint/project/projectFileType";
import type { ProcessName } from "../../type/process/processType";

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
  const document: TDocumentDefinitions = {
    content: [],
    info: metaData,
    pageOrientation: "landscape",
  };

  return document;
}

export async function openPDFDocumentAsync(document: TDocumentDefinitions) {
  const pdfmake = (await import("pdfmake/build/pdfmake")).default;
  const pdfFonts = (await import("pdfmake/build/vfs_fonts")).default;

  pdfmake.addVirtualFileSystem(pdfFonts);

  pdfmake.createPdf(document).open();
}
