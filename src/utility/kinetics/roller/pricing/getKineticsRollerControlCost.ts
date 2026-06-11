import type { KineticsRollerPricingSchedule } from "../../../../type/pricing/kinetics/kineticsRollerPricingScheduleType";

export function getKineticsRollerControlCost(
  control: string,
  controlLength: string,
  pricingSchedule: KineticsRollerPricingSchedule,
): number | undefined {
  if (!isKineticsRollerBlindMotorised(control))
    return getChainCost(control, controlLength, pricingSchedule);

  return getMotorisationCost(control, pricingSchedule);
}

export function isKineticsRollerBlindMotorised(control: string) {
  return !control.toLowerCase().includes("chain");
}

function getChainCost(
  control: string,
  controlLength: string,
  pricingSchedule: KineticsRollerPricingSchedule,
): number | undefined {
  try {
    let parsedControlLength: number = 0;
    parsedControlLength = parseInt(controlLength);
    if (parsedControlLength <= 0) return undefined;
    if (parsedControlLength > 4000) return undefined;

    const base = pricingSchedule.control.chain.fastRise.base;
    const surchargeColours = pricingSchedule.control.chain.fastRise.colours;
    const controlColour = control.split("-")[1].trim();

    const surchargeColour = surchargeColours.find(
      (c) =>
        c.name.localeCompare(controlColour, undefined, {
          sensitivity: "base",
        }) === 0,
    );

    if (typeof surchargeColour === "undefined") return base;

    const perMetreCost = surchargeColour.perM;

    return (parsedControlLength / 1000) * perMetreCost;
  } catch {
    return undefined;
  }
}

/**
 * Excluding the motor costs from the entry as we displays within the worksheet cost
 * @param control
 * @param pricingSchedule
 * @returns
 */
function getMotorisationCost(
  control: string,
  pricingSchedule: KineticsRollerPricingSchedule,
): number | undefined {
  const validOptions = Object.keys(pricingSchedule.control.motorisation);

  const foundOption: string | undefined = validOptions.find(
    (m) => m.localeCompare(control, undefined, { sensitivity: "base" }) === 0,
  );
  if (typeof foundOption === "undefined") return undefined;

  const motorisationObject =
    pricingSchedule.control.motorisation[
      foundOption as keyof typeof pricingSchedule.control.motorisation
    ];

  return motorisationObject.base;
}
