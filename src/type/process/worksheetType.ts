import type { SharePointProjectFile } from "../sharePoint/project/projectFileType";
import type { TableEntry } from "./tableEntry/tableEntryType";
import type { BlindType } from "./productType";

export type WorksheetCost = {
  blindSubTotal: number;
  additional: AdditionalProduct[];
  gst: number;
  total: number;
};

export type AdditionalProduct = {
  name: string;
  cost: number;
  quantity: number;
};

export type CustomerInformation = {
  name: string;
  reference: string;
  salesConsultant: string;
};

export type Worksheet = {
  customer: CustomerInformation;
  blindType: BlindType;
  blindList: TableEntry[];
  worksheetCost: WorksheetCost;
  projectFile?: SharePointProjectFile;
};
