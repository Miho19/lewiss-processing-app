import type { TDocumentDefinitions } from "pdfmake/interfaces";
import type { WindowMeasurementJoined } from "../utility/processProject";
import createCellularBlindDocument from "../utility/kinetics/createCellularPDFDocument";
import {
  createBlockoutRollerBlindDocument,
  createSunscreenRollerBlindDocument,
} from "../utility/kinetics/createRollerPDFDocument";

export type SharePointProjectFileType = {
  id: number;
  name: string;
  phone: string;
  email: string;
  reference: string;
  address: string;
  addressNumber: string;
  addressStreet: string;
  addressSuburb: string;
  addressCity: string;
  addressPostcode: string;
  measurer: string;
  salesConsultant: string;
  measurementSource: string;
  measuredDate: string;
  bookingDate: string;
  bookingTime: string;
  durationMinutes: number;
  service: string;
  roomsOther: string;
  treatmentsOther: string;
  fabrics: string;
  notes: string;
  calendarEventId: string | null;
  calendarEventLink: string | null;
  calendarUserEmail: string | null;
  calendarEventCreatedAt: string | null;
  bookingHistory: string[] | null;
  confirmEmailRequested: boolean;
  pricingType: string;
  newBuild: string;
  callOutFee: string;
  project: SharePointProjectType;
  createdDate: string;
  localDirty: boolean;
  createdBy: string;
  createdAt: string;
  lastEditedBy: string;
  lastEditedAt: string;
  cloudFolderId: string;
  cloudFolderName: string;
  cloudItemId: string;
  cloudLastPushed: string;
  placeId: string;
  latitude: number;
  longitude: number;
  addressValidatedAt: string;
};

export type SharePointProjectType = {
  id: string;
  createdAt: string;
  rooms: SharePointRoomType[];
};

export type SharePointRoomType = {
  id: string;
  name: string;
  createdAt: string;
  brief: SharePointBriefType;
  treatment: SharePointTreatmentType;
  windows: SharePointWindowType[];
  curtains: string[] | null;
};

export type SharePointBriefType = {
  selectedEdits: string[] | null;
  selectedProducts: string[];
  otherSpecification: string;
  notes: string;
};

export type SharePointTreatmentType = {
  insideLayer: SharePointInsideLayerType | null;
  outsideLayer: SharePointOutsideLayerType | null;
  outsideLayerRear: string | null;
  appliedEdit: string | null;
  notes: string;
  pricing: SharePointPricingType;
  totalPrice: number;
  quotedAt: string | null;
  confirmedAt: string | null;
};

export type SharePointInsideLayerType = {
  productId: SharePointProductId;
  length: string | null;
  isExisting: boolean;
  spec: SharePointSpecType;
};

export type SharePointSpecType = {
  blindType: BlindType;
  fabric: SharePointFabricType;
  bracketColour: string;
  controlSide: string;
  motorisation: string | null;
  pelmetType: string | null;
  customColour: boolean;
  sideChannels: boolean;
  remoteQty: number;
  usbCableQty: number;
  smartLinkHubQty: number;
};

export type SharePointFabricType = {
  name: string;
  collection: string;
  multiplier: number;
  maxWidth: number;
  maxHeight: number;
  imageUrl: string;
  chipImageUrl: string;
};

export type SharePointOutsideLayerType = {
  productId: SharePointProductId;
  length: string | null;
  isExisting: boolean;
  spec: SharePointSpec2Type;
};

export type SharePointSpec2Type = {
  blindType: BlindType;
  fabric?: SharePointFabricType;
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

export type SharePointFaceFabricType = {
  d: string;
  s: string;
  sd: string;
  w: number;
  r: number;
  hr: number;
  p: number;
  of: string;
  cn: string | null;
  co: string;
  fi: string | null;
  or: string;
  cl: string;
  c: string;
  st: string | null;
  lb: string;
  lr: string;
  et: string;
  cf: number;
  ro: string;
  wa: string | null;
  bw: string;
};

export type SharePointPricingType = "";

export type SharePointWindowType = {
  id: string;
  number: number;
  name: string;
  measuredDate: string;
  internalWidth: number;
  internalHeightL: number;
  internalHeightR: number;
  reveal: number;
  revealOther: string | null;
  blindAbove?: number;
  blindLeft?: number;
  blindRight?: number;
  blindUnderhang?: number;
  blindFixingType: string;
  blindFixingTypeOther: string;
  controlSide: string;
  controlLength: string;
  controlLengthOther: string;
  blindWidthError: string;
  blindCount: number | string;
  blindLeftWidth: string;
  fixing: string;
  fixingOther: string;
  sunProtection: string;
  sunProtectionOther: string;
  notes: string;
  photos: string[] | null;
  outsideBlindFixingType: string;
  outsideBlindFixingTypeOther: string;
  outsideBlindCount: number;
  outsideBlindLeftWidth: string;
  squareDiff: number;

  // curtainFabric: string | null;
  // treatment: string[] | null;
  // blindExtras: string[] | null;
  // blindPrice: string | null;
  // curtainType: string | null;
  // drawType: string;
  // outsideBlind2Type: string;
  // outsideBlind2Fabric: string;
  // outsideControlSide: string;
  // outsideBlindType: string;
  // outsideBlindFabric: string;
  // outsideBlindExtras: string[] | null;
  // fabricSearch: string;
  // amountOnFloor: string;
  // existingTrackType: string;
  // existingTrackTypeOther: string;
  // newTrackType: string;
  // newTrackTypeOther: string;
  // pelmetType: string;
  // bracketColour: string;
  // bottomRailType: string;
  // bottomRailColour: string;
  // chainColour: string;
  // headrailColour: string;
  // sideChannels: boolean;
  // shutterColourSurcharge: number;
  // shutterTrack: string;
  // fauxwoodFascia: boolean;
  // extraRemotes: number;
  // extraCables: number;
  // extraHubs: number;
  // curtainConfig: string;
  // pleatingStyle: string;
  // cordControlSide: string;
  // rollerRoll: string;
  // blindType: string;
  // blindFabric: string;
  // blind2Type: string;
  // blind2Fabric: string;
};

export type SharePointProductId =
  | "cellular-blind"
  | "sunscreen-roller"
  | "blockout-roller";

export type SharePointProductIdToWindowMeasurementJoinedRecordType = Record<
  SharePointProductId,
  WindowMeasurementJoined[]
>;

type SharePointProductIdToProcessTypeRecordType = Record<
  SharePointProductId,
  (
    projectFile: SharePointProjectFileType,
    windowJoined: WindowMeasurementJoined[],
  ) => Promise<TDocumentDefinitions[]>
>;

export const sharePointProductIdToProcessTypeRecord: SharePointProductIdToProcessTypeRecordType =
  {
    "cellular-blind": createCellularBlindDocument,
    "sunscreen-roller": createSunscreenRollerBlindDocument,
    "blockout-roller": createBlockoutRollerBlindDocument,
  };

export type BlindType =
  | "Kinetics Sunscreen Roller Blind"
  | "Kinetics Blockout Roller Blind"
  | "Kinetics Light Filtering Roller Blind"
  | "Kinetics 10mm Cellular Blind"
  | "Kinetics 20mm Cellular Blind"
  | "Kinetics Mikronwood 50mm Venetian"
  | "Lewis's 25mm Aluminium Venetian"
  | "Lewis's 50mm Phoenixwood Venetian"
  | "Santa Fe Normandy Shutter"
  | "Santa Fe Waterproof Woodlore Plus Shutter";

// export const productIdToBlindTypeRecord: SharePointProductIdDictionaryType = {
//   "cellular-blind": [
//     "Kinetics 10mm Cellular Blind",
//     "Kinetics 20mm Cellular Blind",
//   ],
//   "blockout-roller": [
//     "Kinetics Blockout Roller Blind",
//     "Kinetics Light Filtering Roller Blind",
//   ],
//   "sunscreen-roller": ["Kinetics Sunscreen Roller Blind"],
// };

//   "Kinetics Sunscreen Roller Blind"             → "Sunscreen Roller"
//   "Kinetics Blockout Roller Blind"              → "Blockout Roller"
//   "Kinetics Light Filtering Roller Blind"       → "Light Filter Roller"
//   "Kinetics 10mm Cellular Blind"                → "10mm Cellular"
//   "Kinetics 20mm Cellular Blind"                → "20mm Cellular"
//   "Kinetics Mikronwood 50mm Venetian"           → "Mikronwood 50mm Venetian"
//   "Lewis's 25mm Aluminium Venetian"             → "25mm Aluminium Venetian"
//   "Lewis's 50mm Phoenixwood Venetian"           → "50mm Phoenixwood Venetian"
//   "Santa Fe Normandy Shutter"                   → "Normandy Shutter"
//   "Santa Fe Waterproof Woodlore Plus Shutter"   → "Waterproof Woodlore Plus Shutter"
