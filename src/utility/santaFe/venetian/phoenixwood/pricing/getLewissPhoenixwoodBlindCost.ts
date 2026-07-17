import { isLewissPhoenixwoodVenetianPricingSchedule } from "../../../../../type/pricing/santaFe/lewissPhoenixwoodVenetianPricingScheduleType";
import { isSantaFeAccessoryPricingSchedule } from "../../../../../type/pricing/santaFe/santaFeAccessoriesPricingScheduleType";
import type { BlindType } from "../../../../../type/process/productType";
import {
  getAccessoryPricingScheduleAsync,
  getPricingScheduleAsync,
} from "../../../../process/pricingScheduleUtility";
import { getLewissPhoenixwoodCutOutCost } from "./getLewissPhoenixwoodCutOutCost";
import { getLewissPhoenixwoodFabricCost } from "./getLewissPhoenixwoodFabricCost";
import { getLewissPhoenixwoodFasciaCost } from "./getLewissPhoenixwoodFasciaCost";
import { getLewissPhoenixwoodPalladianCost } from "./getLewissPhoenixwoodPalladianCost";
import { getLewissPhoenixwoodSpacerBlockCost } from "./getLewissPhoenixwoodSpacerBlockCost";
import { getLewissPhoenixwoodValanceCost } from "./getLewissPhoenixwoodValanceCost";

export async function getLewissPhoenixwoodBlindCostAsync(
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

  if (!isLewissPhoenixwoodVenetianPricingSchedule(pricingSchedule)) return 0;

  const fabricCost = getLewissPhoenixwoodFabricCost(
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

  const valanceCost = getLewissPhoenixwoodValanceCost(
    valance,
    accessoryPricingSchedule,
  );
  if (typeof valanceCost === "undefined") return 0;

  const fasciaCost = getLewissPhoenixwoodFasciaCost(
    width,
    fascia,
    pricingSchedule,
  );

  if (typeof fasciaCost === "undefined") return 0;

  const spacerBlockCost = getLewissPhoenixwoodSpacerBlockCost(
    spacerBlock,
    accessoryPricingSchedule,
  );
  if (typeof spacerBlockCost === "undefined") return 0;

  const cutoutCost = getLewissPhoenixwoodCutOutCost(
    cutOut,
    accessoryPricingSchedule,
  );
  if (typeof cutoutCost === "undefined") return 0;

  const palladianCost = getLewissPhoenixwoodPalladianCost(
    width,
    palladianShelf,
    accessoryPricingSchedule,
  );
  if (typeof palladianCost === "undefined") return 0;

  return (
    fabricCost +
    valanceCost +
    fasciaCost +
    spacerBlockCost +
    cutoutCost +
    palladianCost
  );
}
