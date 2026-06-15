import type { BlindType } from "../../../process/productType";
import type { Fabric } from "../projectFileType";

export type KineticsRollerSpec = {
  blindType: BlindType;
  fabric: Fabric | null;
  rollDirection: string;
  bracketColour: string;
  bottomRailType: string;
  bottomRailColour: string;
  chainColour: string;
  controlSide: string;
  motorisation?: string;
  pelmetType?: string;
  customColour: boolean;
  inlineBracket: boolean;
  intermediateBracket: boolean;
  combaBracket: boolean;
  remoteQty: number;
  usbCableQty: number;
  smartLinkHubQty: number;
};

export type KineticsCellularSpec = {
  blindType: BlindType;
  fabric?: Fabric;
  bracketColour: string;
  controlSide: string;
  motorisation: string | null;
  customColour: boolean;
  sideChannels: boolean;
  remoteQty: number;
  usbCableQty: number;
  smartLinkHubQty: number;
};
