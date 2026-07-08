import type { BlindType, ProductId } from "./productType";
import type { WindowSelectDetailed } from "./windowSelectType";
import type { SharePointProjectFile } from "../sharePoint/project/projectFileType";
import type {
  CustomerInformation,
  Worksheet,
  WorksheetCost,
} from "./worksheetType";
import type { KineticsRollerBlind } from "./product/kineticsType";
import type { TDocumentDefinitions } from "pdfmake/interfaces";
import type { TableEntry } from "./tableEntry/tableEntryType";

export type BlindTypeMappedToWindowSelectDetailed = Record<
  BlindType,
  WindowSelectDetailed[]
>;

export type BlindTypeMappedToCreateWorksheetFunction = Record<
  BlindType,
  (
    blindType: BlindType,
    windowSelectDetailedList: WindowSelectDetailed[],
    projectFile: SharePointProjectFile,
  ) => Promise<Worksheet[]>
>;

/**
 * No where better to put this right now
 */

export type KineticsRollerBlindMappedtoProductId = Record<
  KineticsRollerBlind,
  ProductId
>;

export type BlindTypeMappedToString = Record<BlindType, string>;

export type BlindTypeMappedToPDFCreateFunction = Record<
  BlindType,
  (worksheet: Worksheet) => Promise<TDocumentDefinitions | undefined>
>;
