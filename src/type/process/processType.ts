import type { TDocumentDefinitions } from "pdfmake/interfaces";
import type { KineticsRollerBlind, ProductId } from "./productType";
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

export type ProcessName = ProductId | "light-filtering-roller";

/**
 * No where better to put this right now
 */
export type KineticsRollerBlindTypeToWindowSelectDetailedList = Record<
  KineticsRollerBlind,
  WindowSelectDetailed[]
>;
