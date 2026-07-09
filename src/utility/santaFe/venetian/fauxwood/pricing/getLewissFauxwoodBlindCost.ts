import { isLewissFauxwoodVenetianPricingSchedule } from "../../../../../type/pricing/santaFe/lewissFauxwoodVenetianPricingScheduleType";
import type { BlindType } from "../../../../../type/process/productType";
import { getPricingScheduleAsync } from "../../../../process/pricingScheduleUtility";
import { getLewissFauxwoodFabricCostAsync } from "./getLewissFauxwoodFabricCost";
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

  const fabricCost = getLewissFauxwoodFabricCostAsync(
    width,
    height,
    slatSize,
    fabricMultiplier,
    control,
    pricingSchedule,
  );
  if (typeof fabricCost === "undefined") return 0;

  const valanceCost = getLewissFauxwoodValanceCost(valance, pricingSchedule);
  if (typeof valanceCost === "undefined") return 0;

  const fasciaCost = getLewissFauxwoodFasciaCostAynsc(fascia, pricingSchedule);

  return 0;
}
