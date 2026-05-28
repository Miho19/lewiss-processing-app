import type { TDocumentDefinitions } from "pdfmake/interfaces";
import type { SharePointProjectFileType } from "../../zod/sharePointProjectFile";
import type { WindowMeasurementJoined } from "../processProject";
import { createDocument } from "./pdfmake";

function createRollerBlindDocument(
  projectFile: SharePointProjectFileType,
  windowJoined: WindowMeasurementJoined[],
): Promise<TDocumentDefinitions> {
  return new Promise((resolve, reject) => {
    resolve(createDocument(projectFile, "blockout-roller"));
  });
}

export default createRollerBlindDocument;
