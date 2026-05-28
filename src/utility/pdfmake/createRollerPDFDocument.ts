import type { TDocumentDefinitions } from "pdfmake/interfaces";
import type { SharePointProjectFileType } from "../../zod/sharePointProjectFile";
import type { WindowMeasurementJoined } from "../processProject";
import { createDocument } from "./pdfmake";

function createRollerBlindDocument(
  projectFile: SharePointProjectFileType,
  windowJoined: WindowMeasurementJoined[],
): TDocumentDefinitions {
  return createDocument(projectFile, "blockout-roller");
}

export default createRollerBlindDocument;
