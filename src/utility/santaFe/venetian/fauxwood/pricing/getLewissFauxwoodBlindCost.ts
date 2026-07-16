import { isLewissFauxwoodVenetianPricingSchedule } from "../../../../../type/pricing/santaFe/lewissFauxwoodVenetianPricingScheduleType";
import { isSantaFeAccessoryPricingSchedule } from "../../../../../type/pricing/santaFe/santaFeAccessoriesPricingScheduleType";
import type { BlindType } from "../../../../../type/process/productType";
import {
  getAccessoryPricingScheduleAsync,
  getPricingScheduleAsync,
} from "../../../../process/pricingScheduleUtility";
import { getLewissFauxwoodSpacerBlockCost } from "./getLewisFauxwoodSpacerBlockCost";
import { getLewissFauxwoodFabricCost } from "./getLewissFauxwoodFabricCost";
import { getLewissFauxwoodFasciaCost } from "./getLewissFauxwoodFasciaCost";
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
  cutOut: boolean,
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

  const fasciaCost = getLewissFauxwoodFasciaCost(
    width,
    fascia,
    pricingSchedule,
  );

  if (typeof fasciaCost === "undefined") return 0;

  const spacerBlockCost = getLewissFauxwoodSpacerBlockCost(
    spacerBlock,
    accessoryPricingSchedule,
  );
  if (typeof spacerBlockCost === "undefined") return 0;

  return fabricCost + valanceCost + fasciaCost + spacerBlockCost;
}
