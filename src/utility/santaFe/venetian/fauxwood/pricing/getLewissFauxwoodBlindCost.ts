import { isLewissFauxwoodVenetianPricingSchedule } from "../../../../../type/pricing/santaFe/lewissFauxwoodVenetianPricingScheduleType";
import { isSantaFeAccessoryPricingSchedule } from "../../../../../type/pricing/santaFe/santaFeAccessoriesPricingScheduleType";
import type { BlindType } from "../../../../../type/process/productType";
import {
  getAccessoryPricingScheduleAsync,
  getPricingScheduleAsync,
} from "../../../../process/pricingScheduleUtility";
import { getLewissFauxwoodFabricCost } from "./getLewissFauxwoodFabricCost";
import { getLewissFauxwoodFasciaCostAynsc } from "./getLewissFauxwoodFasciaCost";
import { getLewissFauxwoodValanceCost } from "./getLewissFauxwoodValanceCost";

export async function getLewissFauxwoodBlindCostAsync(
  width: number,
  height: number,
  slatSize: number,
  fabricMultiplier: number,
  control: string,
  valance: string,
  fascia: string,
  spacerBlock: boolean,
  cutOut: string,
  palladianShelf: string,
  blindType: BlindType,
): Promise<number> {
  const pricingSchedule = await getPricingScheduleAsync(blindType);
  if (typeof pricingSchedule === "undefined") return 0;
  if (!isLewissFauxwoodVenetianPricingSchedule(pricingSchedule)) return 0;

  const fabricCost = getLewissFauxwoodFabricCost(
    width,
    height,
    slatSize,
    fabricMultiplier,
    control,
    pricingSchedule,
  );
  if (typeof fabricCost === "undefined") return 0;

  const accessoryPricingSchedule =
    await getAccessoryPricingScheduleAsync(blindType);
  if (typeof accessoryPricingSchedule === "undefined") return 0;

  if (!isSantaFeAccessoryPricingSchedule(accessoryPricingSchedule)) return 0;

  const valanceCost = getLewissFauxwoodValanceCost(
    valance,
    accessoryPricingSchedule,
  );
  if (typeof valanceCost === "undefined") return 0;

  const fasciaCost = getLewissFauxwoodFasciaCostAynsc(fascia, pricingSchedule);

  return fabricCost + valanceCost;
}
