import type { TDocumentDefinitions } from "pdfmake/interfaces";
import type { ProductId } from "./productType";
import type { WindowSelectDetailed } from "./windowSelectType";
import type { SharePointProjectFile } from "../sharePoint/project/projectFileType";

export type SharePointProductIdToWindowMeasurementJoinedRecordType = Record<
  ProductId,
  WindowSelectDetailed[]
>;

export type ProductIdToCreatePDFDocumentFunction = Record<
  ProductId,
  (
    projectFile: SharePointProjectFile,
    windowList: WindowSelectDetailed[],
  ) => Promise<TDocumentDefinitions[]>
>;
