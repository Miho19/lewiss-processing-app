import type {
  InsideLayer,
  OutsideLayer,
} from "../sharePoint/project/projectFileType";

export const FitOptions = ["inside", "outside"] as const;

export type Fit = (typeof FitOptions)[number];

export type WindowSelect = {
  windowId: string;
  roomId: string;
  fit: Fit;
  selected: boolean;
};

export const BlindCountOption = [
  "single",
  "dual",
  "butting",
  "invalid",
] as const;

export type BlindCount = (typeof BlindCountOption)[number];

export type WindowSelectDetailed = {
  windowId: string;
  roomId: string;
  blindCountString: BlindCount;
  fit: Fit;
  width: number[];
  height: number;
  treatment: InsideLayer | OutsideLayer;
};
