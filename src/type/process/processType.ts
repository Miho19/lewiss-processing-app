import type {
  BlindType,
  KineticsRollerBlind,
  ProductId,
  VenetianBlind,
  VenetianSubType,
} from "./productType";
import type { WindowSelectDetailed } from "./windowSelectType";
import type { SharePointProjectFile } from "../sharePoint/project/projectFileType";
import type { Worksheet } from "./worksheetType";

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

export type KineticsRollerBlindTypeToWindowSelectDetailedList = Record<
  KineticsRollerBlind,
  WindowSelectDetailed[]
>;

export type BlindTypeMappedToString = Record<BlindType, string>;

export type VenetianBlindMappedToVenetianSubType = Record<
  VenetianBlind,
  VenetianSubType
>;
