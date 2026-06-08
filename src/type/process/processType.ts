import type { TDocumentDefinitions } from "pdfmake/interfaces";
import type { ProductId } from "../sharePoint/project/productType";
import type { ProjectFile } from "../sharePoint/project/projectType";
import type { WindowMeasurementProcessed } from "./windowMeasurementType";

export type SharePointProductIdToWindowMeasurementJoinedRecordType = Record<
  ProductId,
  WindowMeasurementProcessed[]
>;

export type ProductIdToCreatePDFDocumentFunction = Record<
  ProductId,
  (
    projectFile: ProjectFile,
    windows: WindowMeasurementProcessed[],
  ) => Promise<TDocumentDefinitions[]>
>;
