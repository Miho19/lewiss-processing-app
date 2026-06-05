import type { SharePointKineticsRollerPricingType } from "../../../zod/kinetics/sharePointPricingKineticsRoller";
import { roundMeasurementUp } from "../cellular/kineticsCellularPricing";

function getKineticsRollerFabricCost(
  width: number,
  height: number,
  opacity: string,
  fabricMultiplier: number,
  pricingSchedule: SharePointKineticsRollerPricingType,
): number | undefined {
  if (width <= 0 || height <= 0 || fabricMultiplier <= 0) return undefined;

  const opacityOptions = pricingSchedule.fabric.opacity;
  const foundOpacity = opacityOptions.find(
    (o) => o.localeCompare(opacity, undefined, { sensitivity: "base" }) === 0,
  );
  if (typeof foundOpacity === "undefined") return undefined;

  const widthAdjusted = roundMeasurementUp(width);
  const widthIndex = pricingSchedule.fabric.widthHeader.findIndex(
    (w) => w === widthAdjusted || w === width,
  );

  if (widthIndex === -1) return undefined;

  const heightAdjusted = roundMeasurementUp(height);
  const heightIndex = pricingSchedule.fabric.heightHeader.findIndex(
    (h) => h === heightAdjusted || h === height,
  );

  if (heightIndex === -1) return undefined;

  const fabricCost = pricingSchedule.fabric.data[heightIndex][widthIndex];

  return fabricCost * fabricMultiplier;
}

function getKineticsRollerControlCost(
  control: string,
  controlLength: string,
  pricingSchedule: SharePointKineticsRollerPricingType,
): number | undefined {
  if (control.toLowerCase().includes("chain"))
    return _getKineticsRollerCostChain(control, controlLength, pricingSchedule);

  return _getKineticsRollerCostMotorisation(control, pricingSchedule);
}

function _getKineticsRollerCostChain(
  control: string,
  controlLength: string,
  pricingSchedule: SharePointKineticsRollerPricingType,
): number | undefined {
  let parsedControlLength: number = 0;

  try {
    parsedControlLength = parseInt(controlLength);
  } catch {
    return undefined;
  }

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
}

function _getKineticsRollerCostMotorisation(
  control: string,

  pricingSchedule: SharePointKineticsRollerPricingType,
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

function getKineticsRollerBottomRailCost(): number | undefined {
  return 0;
}

export { getKineticsRollerFabricCost, getKineticsRollerControlCost };
