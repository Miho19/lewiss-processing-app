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
  windows: Window[];
  curtains: string[] | null;
};

export type SharePointBriefType = {
  selectedEdits: string[] | null;
  selectedProducts: string[];
  otherSpecification: string;
  notes: string;
};

export type SharePointTreatmentType = {
  insideLayer?: SharePointInsideLayerType;
  outsideLayer?: SharePointOutsideLayerType;
  outsideLayerRear: string | null;
  appliedEdit: string | null;
  notes: string;
  pricing: SharePointPricingType;
  totalPrice: number;
  quotedAt: string | null;
  confirmedAt: string | null;
};

export type SharePointInsideLayerType = {
  productId: string;
  length: string | null;
  isExisting: boolean;
  spec: SharePointSpecType;
};

export type SharePointSpecType = {
  blindType: string;
  fabric: SharePointFabricType;
  rollDirection: string;
  bracketColour: string;
  bottomRailType: string;
  bottomRailColour: string;
  chainColour: string;
  controlSide: string;
  motorisation: string | null;
  pelmetType: string | null;
  customColour: boolean;
  inlineBracket: boolean;
  intermediateBracket: boolean;
  combaBracket: boolean;
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
  productId: string;
  length: string | null;
  isExisting: boolean;
  spec: SharePointSpec2Type;
};

export type SharePointSpec2Type = {
  operation: string;
  faceFabric: SharePointFaceFabricType;
  liningColour?: string;
  cordColour?: string;
  chainColour: string | null;
  chainSize: string | null;
  blindSurchargeAmount: number;
  blindSurchargeDescription: string;
  remoteQty: number;
  chargerQty: number;
  smartLinkQty: number;
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
  curtainType?: string;
  drawType: string;
  blindFixingType: string;
  blindFixingTypeOther: string;
  controlSide: string;
  controlLength: string;
  controlLengthOther: string;
  cordControlSide: string;
  rollerRoll: string;
  blindType: string;
  blindFabric: string;
  blind2Type: string;
  blind2Fabric: string;
  blindWidthError: string;
  blindExtras: string[] | null;
  blindPrice: string | null;
  blindCount: number;
  blindLeftWidth: string;
  pelmetType: string;
  bracketColour: string;
  bottomRailType: string;
  bottomRailColour: string;
  chainColour: string;
  headrailColour: string;
  sideChannels: boolean;
  shutterColourSurcharge: number;
  shutterTrack: string;
  fauxwoodFascia: boolean;
  extraRemotes: number;
  extraCables: number;
  extraHubs: number;
  curtainConfig: string;
  pleatingStyle: string;
  curtainFabric: string | null;
  fabricSearch: string;
  amountOnFloor: string;
  existingTrackType: string;
  existingTrackTypeOther: string;
  newTrackType: string;
  newTrackTypeOther: string;
  fixing: string;
  fixingOther: string;
  treatment: string[] | null;
  sunProtection: string;
  sunProtectionOther: string;
  notes: string;
  photos: string[] | null;
  outsideControlSide: string;
  outsideBlindFixingType: string;
  outsideBlindFixingTypeOther: string;
  outsideBlindType: string;
  outsideBlindFabric: string;
  outsideBlindExtras: string[] | null;
  outsideBlindCount: number;
  outsideBlindLeftWidth: string;
  outsideBlind2Type: string;
  outsideBlind2Fabric: string;
  squareDiff: number;
  newTrackLeft?: number;
  newTrackRight?: number;
  heightAbove?: number;
  heightBelowL?: number;
  heightBelowR?: number;
  blindAbove?: number;
  blindUnderhang?: number;
  blindLeft?: number;
  blindRight?: number;
};
