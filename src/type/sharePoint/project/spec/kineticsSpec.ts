import {
  KineticsCellularBlindOptions,
  KineticsRollerBlindOptions,
  type BlindType,
} from "../../../process/productType";
import type { Fabric } from "../projectFileType";
import type { Spec } from "./spec";

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

export function isKineticsCellularSpec(
  spec: Spec,
): spec is KineticsCellularSpec {
  const { blindType } = spec;

  if (typeof blindType !== "string") return false;

  return KineticsCellularBlindOptions.includes(blindType as any);
}

export function isKineticsRollerSpec(spec: Spec): spec is KineticsRollerSpec {
  const { blindType } = spec;
  if (typeof blindType !== "string") return false;

  return KineticsRollerBlindOptions.includes(blindType as any);
}
