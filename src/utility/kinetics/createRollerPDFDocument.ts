import type { TDocumentDefinitions } from "pdfmake/interfaces";
import type { SharePointProjectFileType } from "../../zod/sharePointProjectFile";
import type { WindowMeasurementJoined } from "../processProject";
import { createDocument } from "../pdfmake/pdfmake";

async function createSunscreenRollerBlindDocument(
  projectFile: SharePointProjectFileType,
  windowJoined: WindowMeasurementJoined[],
) {}

async function createBlockoutRollerBlindDocument(
  projectFile: SharePointProjectFileType,
  windowJoined: WindowMeasurementJoined[],
) {}

async function createRollerBlindDocument(
  projectFile: SharePointProjectFileType,
  windowJoined: WindowMeasurementJoined[],
): Promise<TDocumentDefinitions[]> {
  console.log(windowJoined);

  return await [createDocument(projectFile, "blockout-roller")];
}

export default createRollerBlindDocument;
