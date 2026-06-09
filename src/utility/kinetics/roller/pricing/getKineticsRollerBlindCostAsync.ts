import type { KineticsRollerPricingSchedule } from "../../../../type/pricing/kinetics/kineticsRollerPricingScheduleType";
import type { BlindType } from "../../../../type/process/productType";
import { getPricingScheduleAsync } from "../../../process/pricingScheduleUtility";
import { getKineticsRollerFabricOpacity } from "../presentation/kineticsRoller";
import { getKineticsRollerBottomRailCost } from "./getKineticsRollerBottomRailCost";
import { getKineticsRollerControlCost } from "./getKineticsRollerControlCost";
import { getKineticsRollerFabricCost } from "./getKineticsRollerFabricCost";
import { getKineticsRollerPelmetCost } from "./getKineticsRollerPelmetCost";

export async function getKineticsRollerBlindCostAsync(
  width: number,
  height: number,
  fabricMultiplier: number,
  control: string,
  controlLength: string,
  bottomRailType: string,
  bottomRailColour: string,
  pelmet: string,
  blindType: BlindType,
): Promise<number> {
  const pricingSchedule = (await getPricingScheduleAsync(
    blindType,
  )) as KineticsRollerPricingSchedule;
  if (typeof pricingSchedule === "undefined") return 0;

  const opacity = getKineticsRollerFabricOpacity(blindType);
  if (typeof opacity === "undefined") return 0;

  // instead of returning zero here, we can display errors to the user in the future
  const fabricCost = getKineticsRollerFabricCost(
    width,
    height,
    opacity,
    fabricMultiplier,
    pricingSchedule,
  );
  if (typeof fabricCost === "undefined") return 0;

  const controlCost = getKineticsRollerControlCost(
    control,
    controlLength,
    pricingSchedule,
  );
  if (typeof controlCost === "undefined") return 0;

  const bottomRailCost = getKineticsRollerBottomRailCost(
    width,
    bottomRailType,
    bottomRailColour,
    pricingSchedule,
  );
  if (typeof bottomRailCost === "undefined") return 0;

  const pelmetCost = getKineticsRollerPelmetCost(
    width,
    pelmet,
    pricingSchedule,
  );
  if (typeof pelmetCost === "undefined") return 0;

  return fabricCost + controlCost + bottomRailCost + pelmetCost;
}
