import type {
  InsideLayer,
  OutsideLayer,
} from "../sharePoint/project/projectFileType";

export type Fit = "inside" | "outside";

export type WindowSelect = {
  windowId: string;
  roomId: string;
  fit: Fit;
  selected: boolean;
};

export type BlindCount = "single" | "dual" | "butting" | "invalid";

export type WindowSelectDetailed = {
  windowId: string;
  roomId: string;
  blindCountString: BlindCount;
  fit: Fit;
  width: number[];
  height: number;
  treatment: InsideLayer | OutsideLayer;
};
