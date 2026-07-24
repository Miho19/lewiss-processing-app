import { isKineticsCellularPricingSchedule } from "../../../../type/pricing/kinetics/kineticsCellularPricingScheduleType";
import type { BlindType } from "../../../../type/process/productType";
import { getPricingScheduleAsync } from "../../../process/pricingScheduleUtility";
import {
  getKineticsCellularControlCost,
  isKineticsCellularBlindMotorised,
} from "./getKineticsCellularControlCost";
import { getKineticsCellularFabricCost } from "./getKineticsCellularFabricCost";
import { getKineticsCellularHeadrailCost } from "./getKineticsCellularHeadrailCost";
import { getKineticsCellularSideChannelCost } from "./getKineticsCellularSideChannelCost";

export async function getKineticsCellularBlindCostAsync(
  width: number,
  height: number,
  opacity: string,
  control: string,
  headrailColour: string,
  sideChannelColour: string,
  blindType: BlindType,
  includeMotorisationCost: boolean = true,
): Promise<number> {
  const pricingSchedule = await getPricingScheduleAsync(blindType);

  if (typeof pricingSchedule === "undefined") return 0;
  if (!isKineticsCellularPricingSchedule(pricingSchedule)) return 0;

  const fabricCost = getKineticsCellularFabricCost(
    width,
    height,
    opacity,
    pricingSchedule,
  );

  if (typeof fabricCost === "undefined") return 0;

  let controlCost = getKineticsCellularControlCost(control, pricingSchedule);
  if (typeof controlCost === "undefined") return 0;

  if (isKineticsCellularBlindMotorised(control) && !includeMotorisationCost)
    controlCost = 0;

  const headrailCost = getKineticsCellularHeadrailCost(
    headrailColour,
    pricingSchedule,
  );

  if (typeof headrailCost === "undefined") return 0;

  const sideChannelCost = getKineticsCellularSideChannelCost(
    height,
    sideChannelColour,
    pricingSchedule,
  );

  if (typeof sideChannelCost === "undefined") return 0;

  // if we want to apply the wholesale rate, we do so here
  return fabricCost + controlCost + headrailCost + sideChannelCost;
}
