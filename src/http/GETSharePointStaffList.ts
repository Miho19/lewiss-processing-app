import type {
  ConsultantsType,
  GETSharePointStaffListResponseBody,
  MeasurersType,
} from "../zod/sharePointStaffList";

function GETSharePointStaffListEndpoint() {
  return new URL(
    ``,
    "https://lewiss-measure-pro.netlify.app/.netlify/functions/staff",
  );
}

function GETSharePointStaffListFetchOptions(): RequestInit {
  const fetchOptions: RequestInit = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  return fetchOptions;
}

async function GETSharePointStaffList(
  endpoint: URL = GETSharePointStaffListEndpoint(),
): Promise<{ measurers: MeasurersType[]; consultants: ConsultantsType[] }> {
  try {
    const fetchOptions = GETSharePointStaffListFetchOptions();

    const response: Response = await fetch(endpoint, fetchOptions);
    if (!response.ok) throw new Error("Unexpected server response");

    const jsonBody: GETSharePointStaffListResponseBody = await response.json();

    return {
      measurers: [...jsonBody.measurers],
      consultants: [...jsonBody.consultants],
    };
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    throw new Error("Failed to fetch SharePoint staff list");
  }
}

export default GETSharePointStaffList;
