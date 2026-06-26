import type { TDocumentDefinitions } from "pdfmake/interfaces";
import type { WindowSelectDetailed } from "../../../../type/process/windowSelectType";
import type { SharePointProjectFile } from "../../../../type/sharePoint/project/projectFileType";

export async function createMikronwoodPDFAsync(
  windowSelectDetailedList: WindowSelectDetailed[],
  projectFile: SharePointProjectFile,
): Promise<TDocumentDefinitions | undefined> {
  return undefined;
}
