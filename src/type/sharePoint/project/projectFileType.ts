import type { ProductId } from "../../process/productType";
import type { Spec } from "./spec/spec";
import type { WindowMeasurement } from "./windowMeasurement/windowMeasurementType";

export type SharePointProjectFileName = {
  surname: string;
  reference: string;
  date: string;
};

export type SharePointProjectFile = {
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
  project: Project;
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

export type Project = {
  id: string;
  createdAt: string;
  rooms: Room[];
};

export type Room = {
  id: string;
  name: string;
  createdAt: string;
  brief: Brief;
  treatment: Treatment;
  windows: WindowMeasurement[];
  curtains: string[] | null;
};

export type Brief = {
  selectedEdits: string[] | null;
  selectedProducts: string[];
  otherSpecification: string;
  notes: string;
};

export type Treatment = {
  insideLayer: InsideLayer | null;
  outsideLayer: OutsideLayer | null;
  outsideLayerRear: string | null;
  appliedEdit: string | null;
  notes: string;
  pricing: string;
  totalPrice: number;
  quotedAt: string | null;
  confirmedAt: string | null;
};

export type InsideLayer = {
  productId: ProductId;
  length: string | null;
  isExisting: boolean;
  spec: Spec;
};

export type Fabric = {
  name: string;
  collection: string;
  multiplier: number;
  maxWidth: number;
  maxHeight: number;
  imageUrl: string;
  chipImageUrl: string;
};

export type OutsideLayer = {
  productId: ProductId;
  length: string | null;
  isExisting: boolean;
  spec: Spec;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type FaceFabricType = {
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
