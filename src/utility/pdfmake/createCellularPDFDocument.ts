import type {
  Column,
  Content,
  ContentImage,
  TDocumentDefinitions,
} from "pdfmake/interfaces";
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
  const image: ContentImage = {
    image: "data:image/png;base64," + windowWareLogoBase64,
    width: 100,
  };

  const content: Content[] = [
    {
      columns: [{ width: "*", text: " " }, image],
    },
  ];

  return content;
}

export default createCellularBlindDocument;
