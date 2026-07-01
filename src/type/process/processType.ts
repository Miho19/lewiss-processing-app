import type {
  BlindType,
  KineticsRollerBlind,
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
    windowSelectDetailedList: WindowSelectDetailed[],
    projectFile: SharePointProjectFile,
  ) => Promise<Worksheet[]>
>;

/**
 * No where better to put this right now
 */
export type KineticsRollerBlindTypeToWindowSelectDetailedList = Record<
  KineticsRollerBlind,
  WindowSelectDetailed[]
>;

export type BlindTypeMappedToString = Record<BlindType, string>;

export type VenetianBlindTypeToWindowSelectDetailed = Record<
  VenetianBlind,
  WindowSelectDetailed[]
>;

export type VenetianBlindTypeMappedToCreateWorksheetFunction = Record<
  VenetianBlind,
  (
    windowSelectDetailedList: WindowSelectDetailed[],
    projectFile: SharePointProjectFile,
  ) => Promise<Worksheet | undefined>
>;

export type VenetianBlindMappedToVenetianSubType = Record<
  VenetianBlind,
  VenetianSubType
>;
