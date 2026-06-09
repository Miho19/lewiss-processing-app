import GETSharePointPricingSchedule from "../../../http/GETSharePointPricingSchedule";
import type { SharePointKineticsCellularPricingType } from "../../../type/kinetics/kineticsCellularType";
import { queryClient } from "../../../http/queryClient";
import type {
  BlindType,
  ProcessTitleType,
} from "../../../type/sharePointProjectFile";
import { getPricingScheduleAsync } from "../common";
import type { TableEntry } from "../../pdfmake/commonFunction";

// import kineticsCellularPricingSchedule from "../../../../test/utility/kinetics/cellular/kinetics-cellular-pricing-example.json";

function roundMeasurementUp(num: number) {
  return Math.ceil(num / 100) * 100;
}

function getKineticsCellularFabricCost(
  width: number,
  height: number,
  opacity: string,
  pricingSchedule: SharePointKineticsCellularPricingType,
): number {
  const opacityOptions = pricingSchedule.fabric.opacity;

  const foundOpacity = opacityOptions.find(
    (o) => o.localeCompare(opacity, undefined, { sensitivity: "base" }) === 0,
  );
  if (typeof foundOpacity === "undefined") return 0;

  const multiplier =
    opacity === "Translucent" ? 1 : pricingSchedule.blockoutMultiplier;

  const widthAdjusted = roundMeasurementUp(width);
  const widthIndex = pricingSchedule.fabric.widthHeader.findIndex(
    (w) => w === widthAdjusted || w === width,
  );

  if (widthIndex === -1) return 0.0;

  const heightAdjusted = roundMeasurementUp(height);
  const heightIndex = pricingSchedule.fabric.heightHeader.findIndex(
    (h) => h === heightAdjusted || h === height,
  );

  if (heightIndex === -1) return 0.0;

  const price = pricingSchedule.fabric.data[heightIndex][widthIndex];

  return price * multiplier;
}

function getKineticsCellularControlCost(
  control: string,
  pricingSchedule: SharePointKineticsCellularPricingType,
): number {
  if (
    control.localeCompare("lithium-ion", undefined, { sensitivity: "base" }) !==
    0
  )
    return 0;

  return pricingSchedule.control.motorisation["Lithium-ion"].base;
}

// this function is sort of incorrect currently 30/05/2026 due to cellular blinds
// not being correctly populated --> no headrail colour
function getKineticsCellularHeadrailCost(
  headrailColour: string,
  pricingSchedule: SharePointKineticsCellularPricingType,
): number {
  if (
    headrailColour.localeCompare("custom", undefined, {
      sensitivity: "base",
    }) !== 0
  )
    return 0;

  return pricingSchedule.headRailCustomColourSurcharge;
}

function getKineticsCellularSideChannelCost(
  height: number,
  sideChannelColour: string,
  pricingSchedule: SharePointKineticsCellularPricingType,
): number {
  if (!height || height <= 0) return 0;

  if (
    sideChannelColour.localeCompare("none", undefined, {
      sensitivity: "base",
    }) === 0 ||
    !sideChannelColour.trim()
  )
    return 0;

  // this is just here until we have a more defined type/zod
  const validColours = ["White", "Black", "Off White", "custom"];
  const adjustedSideChannel = sideChannelColour.trim().toLowerCase();

  const found = validColours.find(
    (c) =>
      c.localeCompare(adjustedSideChannel, undefined, {
        sensitivity: "base",
      }) === 0,
  );
  if (typeof found === "undefined") return 0;

  const heightAdjusted = roundMeasurementUp(height) / 1000;
  const costPerMetreHeight = pricingSchedule.sideChannelCostPerMetreHeight;

  const customSurcharge =
    sideChannelColour.localeCompare("custom", undefined, {
      sensitivity: "base",
    }) === 0
      ? pricingSchedule.sideChannelCustomColourSurcharge
      : 0;

  return heightAdjusted * costPerMetreHeight + customSurcharge;
}

async function getKineticsCellularBlindCostAsync(
  width: number,
  height: number,
  opacity: string,
  control: string,
  headrailColour: string,
  sideChannelColour: string,
  blindType: BlindType,
): Promise<number> {
  const pricingSchedule = (await getPricingScheduleAsync(
    blindType,
  )) as SharePointKineticsCellularPricingType;

  if (typeof pricingSchedule === "undefined") return 0;
  if (pricingSchedule.productId !== "cellular-blind") return 0;

  const fabricCost = getKineticsCellularFabricCost(
    width,
    height,
    opacity,
    pricingSchedule,
  );
  const controlCost = getKineticsCellularControlCost(control, pricingSchedule);

  const headrailCost = getKineticsCellularHeadrailCost(
    headrailColour,
    pricingSchedule,
  );

  const sideChannelCost = getKineticsCellularSideChannelCost(
    height,
    sideChannelColour,
    pricingSchedule,
  );

  // if we want to apply the wholesale rate, we do so here
  return fabricCost + controlCost + headrailCost + sideChannelCost;
}

async function getKineticsCellularAdditionalProductArrayAsync(
  tableEntries: TableEntry[],
  processTitle: ProcessTitleType,
) {
  return [];
}

export {
  getKineticsCellularFabricCost,
  getKineticsCellularControlCost,
  getKineticsCellularHeadrailCost,
  getKineticsCellularSideChannelCost,
  getKineticsCellularBlindCostAsync,
  roundMeasurementUp,
  getKineticsCellularAdditionalProductArrayAsync,
};
