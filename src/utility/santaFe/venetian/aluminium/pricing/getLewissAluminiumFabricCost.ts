import type { LewissAluminiumVenetianPricingSchedule } from "../../../../../type/pricing/santaFe/lewissAluminiumVenetianPricingScheduleType";
import { roundMeasurementUp } from "../../../../process/measurementUtility";

export function getLewissAluminiumFabricCost(
  width: number,
  height: number,
  slatSize: number,
  fabricMultiplier: number,
  control: string,
  pricingSchedule: LewissAluminiumVenetianPricingSchedule,
): number | undefined {
  if (width <= 0 || height <= 0 || fabricMultiplier <= 0 || slatSize <= 0)
    return undefined;

  const widthIndex = getWidthIndex(width, pricingSchedule);
  if (typeof widthIndex === "undefined") return undefined;

  const heightIndex = getHeightIndex(height, pricingSchedule);
  if (typeof heightIndex === "undefined") return undefined;

  const controlMultiplier = getControlMultiplier(
    slatSize,
    control,
    pricingSchedule,
  );
  if (typeof controlMultiplier === "undefined") return undefined;

  const fabricCost = pricingSchedule.fabric.data[heightIndex][widthIndex];

  return fabricCost * controlMultiplier * fabricMultiplier;
}

function getWidthIndex(
  width: number,
  pricingSchedule: LewissAluminiumVenetianPricingSchedule,
): number | undefined {
  let widthAdjusted = roundMeasurementUp(width);

  const widthHeader = pricingSchedule.fabric.widthHeader;

  const miniumWidth = widthHeader[0];
  const maximumWidth = widthHeader.at(-1);

  if (widthAdjusted < miniumWidth) widthAdjusted = miniumWidth;

  if (typeof maximumWidth === "undefined") return undefined;
  if (widthAdjusted > maximumWidth) return undefined;

  const index = widthHeader.findIndex(
    (w) => w === widthAdjusted || w === width,
  );
  if (index === -1) return undefined;
  return index;
}

function getHeightIndex(
  height: number,
  pricingSchedule: LewissAluminiumVenetianPricingSchedule,
): number | undefined {
  let heightAdjusted = roundMeasurementUp(height);

  const heightHeader = pricingSchedule.fabric.heightHeader;

  const minimumHeight = heightHeader[0];
  if (heightAdjusted < minimumHeight) heightAdjusted = minimumHeight;

  const maximumHeight = heightHeader.at(-1);
  if (typeof maximumHeight === "undefined") return undefined;
  if (heightAdjusted > maximumHeight) return undefined;

  const index = heightHeader.findIndex(
    (h) => h === heightAdjusted || h === height,
  );
  if (index === -1) return undefined;
  return index;
}

function getControlMultiplier(
  slatSize: number,
  control: string,
  pricingSchedule: LewissAluminiumVenetianPricingSchedule,
): number | undefined {
  const aluminiumType = `aluminium${slatSize}`;

  const aluminiumTypeControlObject =
    pricingSchedule.control[
      aluminiumType as keyof typeof pricingSchedule.control
    ];

  if (typeof aluminiumTypeControlObject === "undefined") return undefined;

  const controlObject =
    aluminiumTypeControlObject[
      control as keyof typeof pricingSchedule.control.aluminium25
    ];

  if (typeof controlObject === "undefined") return undefined;

  return controlObject.multiplier;
}
