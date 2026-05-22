type MeasurersType = string;
type ConsultantsType = {
  name: string;
  email: string;
  title: string;
  phone: string;
  functions: string;
  pin: string;
  accessMine: string;
  accessAll: string;
};

type GETSharePointStaffListResponseBody = {
  ok: boolean;
  measurers: MeasurersType[];
  consultants: ConsultantsType[];
};

export type {
  MeasurersType,
  ConsultantsType,
  GETSharePointStaffListResponseBody,
};
