import {
  VenetianBlindOptions,
  type BlindType,
  type VenetianBlind,
  type VenetianSubType,
} from "../../../process/productType";
import type { Fabric } from "../projectFileType";
import type { Spec } from "./spec";

export type VenetianSpec = {
  blindType?: BlindType;
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
  subtypeId?: VenetianSubType;
  baseType: VenetianBlind;
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

export function isVenetianSpec(spec: Spec): spec is VenetianSpec {
  if (typeof spec !== "object") return false;
  if (spec === null) return false;
  if (!("baseType" in spec)) return false;

  const { baseType } = spec;
  if (typeof baseType !== "string") return false;

  return VenetianBlindOptions.includes(baseType);
}
