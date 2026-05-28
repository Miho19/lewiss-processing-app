/**
 *
 * pdfmake - https://github.com/bpampuch/pdfmake
 */

import type { SharePointProjectFileType } from "../zod/sharePointProjectFile";
import type { WindowMeasurementJoinedWithTreatment } from "./processProject";
import pdfmake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import type {
  TDocumentDefinitions,
  TDocumentInformation,
} from "pdfmake/interfaces";

// @ts-ignore
(<any>pdfmake).vfs = pdfFonts.pdfMake ? pdfFonts.vfs : pdfFonts;

function getOrderPDF(
  projectFile: SharePointProjectFileType,
  joinedSelectedWindows: WindowMeasurementJoinedWithTreatment[],
) {
  if (
    typeof projectFile === "undefined" ||
    typeof joinedSelectedWindows === "undefined" ||
    joinedSelectedWindows.length === 0
  )
    return undefined;

  const document = createDocument(projectFile);
}

function createDocument(projectFile: SharePointProjectFileType) {
  const { name, reference, salesConsultant } = projectFile;

  const title = [name, reference].join("-");

  const metaData: TDocumentInformation = {
    title: title,
    author: salesConsultant,
    creator: "lewiss-processing",
  };
  const document: TDocumentDefinitions = {
    content: [],
    info: metaData,
  };

  return document;
}

function getProcessType() {}
