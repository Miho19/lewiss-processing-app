import { isLewissAluminiumPricingSchedule } from "../../../../../type/pricing/santaFe/lewissAluminiumVenetianPricingScheduleType";
import { isSantaFeAccessoryPricingSchedule } from "../../../../../type/pricing/santaFe/santaFeAccessoriesPricingScheduleType";
import type { BlindType } from "../../../../../type/process/productType";
import {
  getAccessoryPricingScheduleAsync,
  getPricingScheduleAsync,
} from "../../../../process/pricingScheduleUtility";
import { getLewissAluminiumFabricCost } from "./getLewissAluminiumFabricCost";
import { getLewissAluminiumSpacerBlockCost } from "./getLewissAluminiumSpacerBlockCost";

export async function getLewissAluminiumBlindCostAsync(
  width: number,
  height: number,
  slatSize: number,
  fabricMultiplier: number,
  control: string,
  spacerBlock: boolean,
  blindType: BlindType,
): Promise<number> {
  const pricingSchedule = await getPricingScheduleAsync(blindType);

  if (typeof pricingSchedule === "undefined") return 0;
  if (!isLewissAluminiumPricingSchedule(pricingSchedule)) return 0;

  const fabricCost = getLewissAluminiumFabricCost(
    width,
    height,
    slatSize,
    fabricMultiplier,
    control,
    pricingSchedule,
  );

  if (typeof fabricCost === "undefined") return 0;

  if (!spacerBlock) return fabricCost;

  const accessoryPricingSchedule =
    await getAccessoryPricingScheduleAsync(blindType);
  if (typeof accessoryPricingSchedule === "undefined") return 0;

  if (!isSantaFeAccessoryPricingSchedule(accessoryPricingSchedule)) return 0;

  const spacerBlockCost = getLewissAluminiumSpacerBlockCost(
    spacerBlock,
    accessoryPricingSchedule,
  );

  if (typeof spacerBlockCost === "undefined") return 0;

  return fabricCost + spacerBlockCost;
}
