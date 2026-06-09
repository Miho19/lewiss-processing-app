import type { KineticsCellularPricingSchedule } from "../../../../type/pricing/kinetics/kineticsCellularPricingScheduleType";
import type { BlindType } from "../../../../type/process/productType";
import { getPricingScheduleAsync } from "../../../process/pricingScheduleUtility";
import { getKineticsCellularControlCost } from "./getKineticsCellularControlCost";
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
): Promise<number> {
  const pricingSchedule = (await getPricingScheduleAsync(
    blindType,
  )) as KineticsCellularPricingSchedule;

  if (typeof pricingSchedule === "undefined") return 0;
  if (pricingSchedule.productId !== "cellular-blind") return 0;

  const fabricCost = getKineticsCellularFabricCost(
    width,
    height,
    opacity,
    pricingSchedule,
  );
  const controlCost = getKineticsCellularControlCost(control, pricingSchedule);

  const headrailCost = getKineticsCellularHeadrailCost(
    headrailColour,
    pricingSchedule,
  );

  const sideChannelCost = getKineticsCellularSideChannelCost(
    height,
    sideChannelColour,
    pricingSchedule,
  );

  // if we want to apply the wholesale rate, we do so here
  return fabricCost + controlCost + headrailCost + sideChannelCost;
}
