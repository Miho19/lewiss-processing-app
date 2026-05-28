import type { Column, Content, TDocumentDefinitions } from "pdfmake/interfaces";
import type { SharePointProjectFileType } from "../../zod/sharePointProjectFile";
import type { WindowMeasurementJoined } from "../processProject";
import { createDocument } from "./pdfmake";
import { getBase64Image, windowWareLogoBase64 } from "../getBase64Image";

async function createCellularBlindDocument(
  projectFile: SharePointProjectFileType,
  windowJoined: WindowMeasurementJoined[],
): Promise<TDocumentDefinitions> {
  const document = createDocument(projectFile, "cellular-blind");
  const content: Content[] = [];

  const windowWareHeader = await createWindowWareHeader();
  content.push(windowWareHeader);

  document.content = [...content];
  return document;
}

async function createWindowWareHeader() {
  const logoBase64String = "data:image/png;base64," + windowWareLogoBase64;

  const header: Content[] = [
    {
      width: "*",
      text: " ",
    },
  ];

  return column;
}

export default createCellularBlindDocument;
