import type {
  InsideLayer,
  OutsideLayer,
} from "../sharePoint/project/projectType";

export type Fit = "inside" | "outside";

export type WindowMeasurement = {
  id: string;
  roomId: string;
  fit: Fit;
  selected: boolean;
};

export type BlindCount = "single" | "dual" | "butting" | "invalid";

export type WindowMeasurementProcessed = {
  windowId: string;
  roomId: string;
  blindCountString: BlindCount;
  fit: Fit;
  width: number[];
  height: number;
  treatment: InsideLayer | OutsideLayer;
};
