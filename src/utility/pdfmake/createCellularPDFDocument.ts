import type { TDocumentDefinitions } from "pdfmake/interfaces";
import type { SharePointProjectFileType } from "../../zod/sharePointProjectFile";
import type { WindowMeasurementJoined } from "../processProject";
import { createDocument } from "./pdfmake";

function createCellularBlindDocument(
  projectFile: SharePointProjectFileType,
  windowJoined: WindowMeasurementJoined[],
): TDocumentDefinitions {
  return createDocument(projectFile, "cellular-blind");
}

export default createCellularBlindDocument;
