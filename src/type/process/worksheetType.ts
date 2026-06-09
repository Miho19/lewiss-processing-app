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
