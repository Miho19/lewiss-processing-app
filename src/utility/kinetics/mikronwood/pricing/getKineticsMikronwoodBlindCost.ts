import { isKineiicsMikronwoodPricingSchedule } from "../../../../type/pricing/kinetics/kineticsMikronwoodPricingScheduleType";
import type { BlindType } from "../../../../type/process/productType";
import { getPricingScheduleAsync } from "../../../process/pricingScheduleUtility";
import {
  getKineticsMikronwoodControlCost,
  isKineticsMikronwoodBlindMotorised,
} from "./getKineticsMikronwoodControlCost";
import { getKineticsMikronwoodFabricCost } from "./getKineticsMikronwoodFabricCost";
import { getKineticsMikronwoodFasciaCost } from "./getKineticsMikronwoodFasciaCost";
import { getKineticsMikronwoodHoldDownBracketCost } from "./getKineticsMikronwoodHoldDownBracketCost";

export async function getKineticsMikronwoodBlindCostAsync(
  width: number,
  height: number,
  control: string,
  fascia: string,
  holdDownBracket: string,
  blindType: BlindType,
  includeMotorisationCost: boolean = true,
): Promise<number> {
  const pricingSchedule = await getPricingScheduleAsync(blindType);

  if (typeof pricingSchedule === "undefined") return 0;
  if (!isKineiicsMikronwoodPricingSchedule(pricingSchedule)) return 0;

  const fabricCost = getKineticsMikronwoodFabricCost(
    width,
    height,
    pricingSchedule,
  );

  if (typeof fabricCost === "undefined") return 0;

  let controlCost = getKineticsMikronwoodControlCost(control, pricingSchedule);
  if (typeof controlCost === "undefined") return 0;

  if (
    isKineticsMikronwoodBlindMotorised(control, pricingSchedule) &&
    !includeMotorisationCost
  )
    controlCost = 0;

  const fasciaCost = getKineticsMikronwoodFasciaCost(fascia, pricingSchedule);
  if (typeof fasciaCost === "undefined") return 0;

  const holdDownBracketCost = getKineticsMikronwoodHoldDownBracketCost(
    holdDownBracket,
    pricingSchedule,
  );
  if (typeof holdDownBracketCost === "undefined") return 0;

  return fabricCost + controlCost + fasciaCost + holdDownBracketCost;
}
