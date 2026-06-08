import type {
  KineticsRollerFabricOpacityType,
  PerMCost,
  SharePointKineticsRollerPricingType,
} from "../../../zod/kinetics/sharePointPricingKineticsRoller";
import type {
  BlindType,
  ProcessTitleType,
} from "../../../zod/sharePointProjectFile";
import type { TableEntry } from "../../pdfmake/commonFunction";
import { roundMeasurementUp } from "../cellular/kineticsCellularPricing";
import {
  getPricingScheduleAsync,
  mapProcessTitleToBlindType,
  type WorksheetCostObjectAdditionalProductType,
} from "../common";
import { getKineticsRollerFabricOpacity } from "./kineticsRoller";

function getKineticsRollerFabricCost(
  width: number,
  height: number,
  opacity: KineticsRollerFabricOpacityType,
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

function getKineticsRollerBottomRailCost(
  width: number,
  bottomRailType: string,
  bottomRailColour: string,
  pricingSchedule: SharePointKineticsRollerPricingType,
): number | undefined {
  if (
    width <= 0 ||
    bottomRailColour.trim().length === 0 ||
    bottomRailType.trim().length === 0
  )
    return undefined;

  const customColourCost = _getKineticsRollerBottomRailCustomColourCost(
    bottomRailColour,
    pricingSchedule,
  );

  const bottomRailTypeCost = _getKineticsRollerBottomRailBottomRailTypeCost(
    width,
    bottomRailType,
    pricingSchedule,
  );

  return customColourCost + bottomRailTypeCost;
}

function _getKineticsRollerBottomRailBottomRailTypeCost(
  width: number,
  bottomRailType: string,
  pricingSchedule: SharePointKineticsRollerPricingType,
): number {
  const surchargeOptions: PerMCost[] = Object.values(pricingSchedule.bottomRail)
    .map((child) => {
      if (child && typeof child === "object" && "perM" in child)
        return { name: child.name, perM: child.perM };

      return [];
    })
    .flat();

  const bottomRailTypeAdjusted = bottomRailType.trim().toLowerCase();

  const found = surchargeOptions.find(
    (b) =>
      b.name.localeCompare(bottomRailTypeAdjusted, undefined, {
        sensitivity: "base",
      }) === 0,
  );

  if (typeof found === "undefined") {
    return 0;
  }

  const widthAdjusted = roundMeasurementUp(width);

  return found.perM * (widthAdjusted / 1000);
}

function _getKineticsRollerBottomRailCustomColourCost(
  bottomRailColour: string,
  pricingSchedule: SharePointKineticsRollerPricingType,
): number {
  const bottomRailColourAdjusted = bottomRailColour.trim().toLowerCase();

  if (bottomRailColourAdjusted.includes("custom"))
    return pricingSchedule.bottomRail.customColour;
  return 0;
}

function getKineticsRollerPelmetCost(
  width: number,
  pelmet: string,
  pricingSchedule: SharePointKineticsRollerPricingType,
): number | undefined {
  if (width <= 0 || width > 5000) return undefined;
  if (pelmet === null || pelmet.trim().length === 0) return 0;

  const pelmetCostArray = _getKineticsRollerPelmetCostGetPelmetCostArray(
    pelmet,
    pricingSchedule,
  );

  if (typeof pelmetCostArray === "undefined") return undefined;

  const widthIndex = _getKineticsRollerPelmetCostGetWidthIndex(
    width,
    pricingSchedule,
  );

  if (typeof widthIndex === "undefined") return undefined;

  return pelmetCostArray[widthIndex];
}

function _getKineticsRollerPelmetCostGetPelmetCostArray(
  pelmet: string,
  pricingSchedule: SharePointKineticsRollerPricingType,
): number[] | undefined {
  const lookupObject =
    _getKineticsRollerPelmetCostGetPelmetLookupObject(pelmet);
  if (typeof lookupObject === "undefined") return undefined;

  const found = pricingSchedule.pelmet.cost.find(
    (p) => p.name === lookupObject.name,
  );
  if (typeof found === "undefined") return undefined;

  const pelmetCostArray = found[lookupObject.fit as keyof typeof found];

  if (!Array.isArray(pelmetCostArray)) return undefined;

  return pelmetCostArray;
}

function _getKineticsRollerPelmetCostGetWidthAdjusted(width: number): number {
  if (width < 1000) return 1000;
  return Math.ceil(width / 250) * 250;
}

function _getKineticsRollerPelmetCostGetPelmetSize(
  pelmet: string,
): number | undefined {
  try {
    const pelmetSizeString: string = pelmet.trim().toLowerCase().split(" ")[0];
    const pelmetSize = parseInt(pelmetSizeString);
    return pelmetSize;
  } catch {
    return undefined;
  }
}

function _getKineticsRollerPelmetCostGetPelmetFit(
  pelmet: string,
): string | undefined {
  const pelmetfit: string = pelmet.trim().toLowerCase().split(" ")[1];

  switch (pelmetfit) {
    case "i/s":
      return "inside";
    case "o/s":
      return "outside";
    default:
      return undefined;
  }
}

function _getKineticsRollerPelmetCostGetPelmetLookupObject(
  pelmet: string,
): { name: string; fit: string } | undefined {
  const pelmetSize = _getKineticsRollerPelmetCostGetPelmetSize(pelmet);
  const pelmetFit = _getKineticsRollerPelmetCostGetPelmetFit(pelmet);

  if (typeof pelmetSize === "undefined" || typeof pelmetFit === "undefined")
    return undefined;

  return { name: `${pelmetSize}mm Pelmet`, fit: pelmetFit };
}

function _getKineticsRollerPelmetCostGetWidthIndex(
  width: number,
  pricingSchedule: SharePointKineticsRollerPricingType,
): number | undefined {
  const widthAdjusted = _getKineticsRollerPelmetCostGetWidthAdjusted(width);

  const pelmetCostWidthArray = pricingSchedule.pelmet.width;

  const index = pelmetCostWidthArray.findIndex(
    (w) => w === widthAdjusted || w === width,
  );
  if (index === -1) return undefined;
  return index;
}

async function getKineticsRollerBlindCostAsync(
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
  )) as SharePointKineticsRollerPricingType;
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

// smartlink, usb + remote

async function getKineticsRollerAdditionalProductArrayAsync(
  tableEntries: TableEntry[],
  processTitle: ProcessTitleType,
): Promise<WorksheetCostObjectAdditionalProductType[]> {
  const blindType = mapProcessTitleToBlindType(processTitle);
  if (typeof blindType === "undefined") return [];

  const pricingSchedule = (await getPricingScheduleAsync(
    blindType,
  )) as SharePointKineticsRollerPricingType;

  const motorProducts: WorksheetCostObjectAdditionalProductType[] =
    _getKineticsRollerMotorCostProductArray(tableEntries, pricingSchedule);

  if (typeof pricingSchedule === "undefined") return [];

  return [...motorProducts];
}

// its probably better to do this the other way --> loop through entires first to get a list of all operations
// we just use a map ... 8/06/2026
//

export function _getKineticsRollerMotorCostProductArray(
  tableEntries: TableEntry[],
  pricingSchedule: SharePointKineticsRollerPricingType,
): WorksheetCostObjectAdditionalProductType[] {
  const motorProducts: WorksheetCostObjectAdditionalProductType[] = Object.keys(
    pricingSchedule.control.motorisation,
  ).map((k) => {
    return { name: k, cost: 0, quantity: 0 };
  });

  motorProducts.forEach((product) => {
    const filter = tableEntries.filter(
      (e) =>
        e.control.localeCompare(product.name, undefined, {
          sensitivity: "base",
        }) === 0,
    );

    product.quantity = filter.length;

    const motorisationObject =
      pricingSchedule.control.motorisation[
        product.name as keyof typeof pricingSchedule.control.motorisation
      ];

    product.cost = motorisationObject.base;
  });

  const filteredMotorProducts = motorProducts.filter(
    (product) => product.quantity > 0,
  );

  return [...filteredMotorProducts];
}

export {
  getKineticsRollerFabricCost,
  getKineticsRollerControlCost,
  getKineticsRollerBottomRailCost,
  getKineticsRollerPelmetCost,
  getKineticsRollerBlindCostAsync,
  getKineticsRollerAdditionalProductArrayAsync,
};
