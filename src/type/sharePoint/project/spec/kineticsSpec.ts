import {
  KineticsCellularBlindOptions,
  KineticsRollerBlindOptions,
  VenetianBlindOptions,
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

export type VenetianSpec = {
  blindType?: string;
  fabric?: Fabric;
  bracketColour: string;
  controlSide: string;
  motorisation?: string;
  pelmetType: any;
  customColour?: boolean;
  sideChannels?: boolean;
  remoteQty: number;
  usbCableQty: number;
  smartLinkHubQty: number;
  rollDirection?: string;
  bottomRailType?: string;
  bottomRailColour?: string;
  chainColour?: string;
  inlineBracket?: boolean;
  intermediateBracket?: boolean;
  combaBracket?: boolean;
  subtypeId?: string;
  baseType?: string;
  operation: any;
  spacerBlock?: boolean;
  cutout?: boolean;
  valanceRamp?: boolean;
  valanceModern?: boolean;
  valanceCatenary?: boolean;
  fasciaFlatReturns?: boolean;
  fasciaColonialReturns?: boolean;
  holdDownBrackets?: boolean;
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

export function isVenetianSpec(spec: Spec): spec is VenetianSpec {
  const { blindType } = spec;
  if (typeof blindType !== "string") return false;

  return VenetianBlindOptions.includes(blindType as any);
}
