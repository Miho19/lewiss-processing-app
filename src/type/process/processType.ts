import type { KineticsRollerBlind, ProductId } from "./productType";
import type { WindowSelectDetailed } from "./windowSelectType";
import type { SharePointProjectFile } from "../sharePoint/project/projectFileType";
import type { Worksheet } from "./worksheetType";

export type ProcessGroupToWindowSelectDetailed = Record<
  ProductId,
  WindowSelectDetailed[]
>;

export type ProductIdMappedToCreateWorksheetFunction = Record<
  ProductId,
  (
    windowSelectDetailedList: WindowSelectDetailed[],
    projectFile: SharePointProjectFile,
  ) => Promise<Worksheet[]>
>;

export type ProcessName = ProductId | "light-filtering-roller";

/**
 * No where better to put this right now
 */
export type KineticsRollerBlindTypeToWindowSelectDetailedList = Record<
  KineticsRollerBlind,
  WindowSelectDetailed[]
>;
