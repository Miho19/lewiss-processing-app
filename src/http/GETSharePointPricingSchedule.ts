import type { SharePointProductId } from "../zod/sharePointProjectFile";
import kineticsCellularPricingSchedule from "../../test/utility/kinetics/cellular/kinetics-cellular-pricing-example.json";
import type { SharePointKineticsCellularPricingType } from "../zod/sharePointPricingKineticsCellular";

function GETSharePointPricingScheduleEndpoint() {
  return new URL(
    ``,
    "https://lewiss-measure-pro.netlify.app/.netlify/functions/graph",
  );
}

function GETSharePointJSONFileFetchOptions(fileId: string): RequestInit {
  const fetchOptions: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "downloadJson", itemId: fileId }),
  };

  return fetchOptions;
}

type PricingScheduleType = SharePointKineticsCellularPricingType;

export async function GETSharePointPricingSchedule(
  productId: SharePointProductId,
  endpoint: URL = GETSharePointPricingScheduleEndpoint(),
): Promise<PricingScheduleType> {
  try {
    return kineticsCellularPricingSchedule;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    throw new Error("Failed to fetch staff folder", { cause: error });
  }
}

export default GETSharePointPricingSchedule;
