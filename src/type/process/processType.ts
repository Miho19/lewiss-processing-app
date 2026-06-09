import type { TDocumentDefinitions } from "pdfmake/interfaces";
import type { ProductId } from "./productType";
import type { WindowSelectDetailed } from "./windowSelectType";
import type { SharePointProjectFile } from "../sharePoint/project/projectFileType";

export type ProcessGroupToWindowSelectDetailed = Record<
  ProductId,
  WindowSelectDetailed[]
>;

export type ProductIdToCreatePDFDocumentFunction = Record<
  ProductId,
  (
    windowSelectDetailedList: WindowSelectDetailed[],
    projectFile: SharePointProjectFile,
  ) => Promise<TDocumentDefinitions[]>
>;
