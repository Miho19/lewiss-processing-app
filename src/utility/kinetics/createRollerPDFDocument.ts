import type { TDocumentDefinitions } from "pdfmake/interfaces";
import type {
  SharePointProductId,
  SharePointProjectFileType,
} from "../../zod/sharePointProjectFile";
import type { WindowMeasurementJoined } from "../processProject";
import { createDocument } from "../pdfmake/pdfmake";

async function createSunscreenRollerBlindDocument(
  projectFile: SharePointProjectFileType,
  windowJoined: WindowMeasurementJoined[],
): Promise<TDocumentDefinitions[]> {
  return await [createDocument(projectFile, "sunscreen-roller")];
}

async function createBlockoutRollerBlindDocument(
  projectFile: SharePointProjectFileType,
  windowJoined: WindowMeasurementJoined[],
): Promise<TDocumentDefinitions[]> {
  return await [createDocument(projectFile, "blockout-roller")];
}

export {
  createSunscreenRollerBlindDocument,
  createBlockoutRollerBlindDocument,
};
