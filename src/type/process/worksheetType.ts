import type { TDocumentDefinitions } from "pdfmake/interfaces";
import type { SharePointProjectFile } from "../sharePoint/project/projectFileType";
import type { ProcessName } from "./processType";
import type { TableEntry } from "./tableEntry/tableEntryType";

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
  processName: ProcessName;
  blindList: TableEntry[];
  worksheetCost: WorksheetCost;
  pdfList: TDocumentDefinitions[];
  projectFile?: SharePointProjectFile;
};
