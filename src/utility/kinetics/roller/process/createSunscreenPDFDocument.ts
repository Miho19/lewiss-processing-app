import type { TDocumentDefinitions } from "pdfmake/interfaces";
import type { WindowSelectDetailed } from "../../../../type/process/windowSelectType";
import type { SharePointProjectFile } from "../../../../type/sharePoint/project/projectFileType";
import { createRollerBlindDocumentAsync } from "./createRollerPDFDocument";

export async function createSunscreenRollerBlindDocumentAsync(
  windowSelectDetailedList: WindowSelectDetailed[],
  projectFile: SharePointProjectFile,
): Promise<TDocumentDefinitions[]> {
  const sunscreenDocument = await createRollerBlindDocumentAsync(
    windowSelectDetailedList,
    "sunscreen-roller",
    projectFile,
  );
  if (typeof sunscreenDocument === "undefined") return [];

  return [sunscreenDocument];
}
