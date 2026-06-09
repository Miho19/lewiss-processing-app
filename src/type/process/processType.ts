import type { TDocumentDefinitions } from "pdfmake/interfaces";
import type { ProductId } from "./productType";
import type { WindowSelectDetailed } from "./windowSelectType";
import type { ProjectFile } from "../sharePoint/project/projectFileType";

export type SharePointProductIdToWindowMeasurementJoinedRecordType = Record<
  ProductId,
  WindowSelectDetailed[]
>;

export type ProductIdToCreatePDFDocumentFunction = Record<
  ProductId,
  (
    projectFile: ProjectFile,
    windowList: WindowSelectDetailed[],
  ) => Promise<TDocumentDefinitions[]>
>;
