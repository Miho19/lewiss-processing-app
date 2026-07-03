import type { BlindType } from "../../../../../type/process/productType";
import { getPricingScheduleAsync } from "../../../../process/pricingScheduleUtility";

export async function getLewissAluminiumBlindCostAsync(
  width: number,
  height: number,
  slatSize: number,
  fabricMultiplier: number,
  control: string,
  spacerBlock: boolean,
  blindType: BlindType,
) {
  const pricingSchedule = await getPricingScheduleAsync(blindType);

  if (typeof pricingSchedule === "undefined") return 0;
  if (!pricingSchedule) return 0;
}
