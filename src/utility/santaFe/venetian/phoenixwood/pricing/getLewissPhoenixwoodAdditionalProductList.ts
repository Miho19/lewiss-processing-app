import {
  isSantaFeAccessoryPricingSchedule,
  type SantaFeAccessoriesPricingSchedule,
} from "../../../../../type/pricing/santaFe/santaFeAccessoriesPricingScheduleType";
import type { BlindType } from "../../../../../type/process/productType";
import {
  isLewissPhoenixwoodTableEntryList,
  type LewissPhoenixwoodTableEntry,
} from "../../../../../type/process/tableEntry/santaFeTableEntryType";
import type { TableEntry } from "../../../../../type/process/tableEntry/tableEntryType";
import type { AdditionalProduct } from "../../../../../type/process/worksheetType";
import { getAccessoryPricingScheduleAsync } from "../../../../process/pricingScheduleUtility";

// note that if quantity or pricing is zero, the item is still displayed on pdf...

export async function getLewissPhoenixwoodAdditionalProductListAsync(
  tableEntryList: TableEntry[],
  blindType: BlindType,
): Promise<AdditionalProduct[]> {
  const outputList: AdditionalProduct[] = [];

  if (!isLewissPhoenixwoodTableEntryList(tableEntryList)) return [];

  const accessoryPricingSchedule =
    await getAccessoryPricingScheduleAsync(blindType);

  if (typeof accessoryPricingSchedule === "undefined") return [];
  if (!isSantaFeAccessoryPricingSchedule(accessoryPricingSchedule)) return [];

  const premiumColourSurcharge = getPremiumColourSurcharge(
    tableEntryList,
    accessoryPricingSchedule,
  );

  if (typeof premiumColourSurcharge !== "undefined")
    outputList.push(premiumColourSurcharge);

  return [...outputList];
}

function getPremiumColourSurcharge(
  tableEntryList: LewissPhoenixwoodTableEntry[],
  pricingSchedule: SantaFeAccessoriesPricingSchedule,
): AdditionalProduct | undefined {
  const numberOfPremiumColour = getNumberOfPremiumColour(
    tableEntryList,
    pricingSchedule,
  );
  if (numberOfPremiumColour === 0) return undefined;

  const { over10, under10 } = pricingSchedule.phoenixwoodColourSurcharge;

  let name = "";
  let cost = 0;

  if (numberOfPremiumColour >= 10) {
    name = over10.name;
    cost = over10.base;
  } else {
    name = under10.name;
    cost = under10.base;
  }

  const newAdditionalProduct: AdditionalProduct = {
    name: name,
    cost: cost,
    quantity: numberOfPremiumColour,
  };

  return newAdditionalProduct;
}

function getNumberOfPremiumColour(
  tableEntryList: LewissPhoenixwoodTableEntry[],
  pricingSchedule: SantaFeAccessoriesPricingSchedule,
) {
  const fabricNumber = getPremiumColourNumberFabric(
    tableEntryList,
    pricingSchedule,
  );

  const palladianNumber = getPremiumColourNumberPalladian(
    tableEntryList,
    pricingSchedule,
  );

  return fabricNumber + palladianNumber;
}

function getPremiumColourMap(
  pricingSchedule: SantaFeAccessoriesPricingSchedule,
) {
  const premiumColourMap = new Map<string, number>();

  const premiumColourList = pricingSchedule.phoenixwoodColourSurcharge.colour;

  for (const colour of premiumColourList) {
    if (!premiumColourMap.has(colour.name))
      premiumColourMap.set(colour.name, 0);
  }

  return premiumColourMap;
}

function getPremiumColourNumberFabric(
  tableEntryList: LewissPhoenixwoodTableEntry[],
  pricingSchedule: SantaFeAccessoriesPricingSchedule,
): number {
  const premiumColourMap = getPremiumColourMap(pricingSchedule);

  for (const entry of tableEntryList) {
    const fabric = entry.fabric;
    const number = premiumColourMap.get(fabric);
    if (typeof number === "undefined") continue;

    premiumColourMap.set(fabric, number + 1);
  }

  return getMapSum(premiumColourMap);
}

function getPremiumColourNumberPalladian(
  tableEntryList: LewissPhoenixwoodTableEntry[],
  pricingSchedule: SantaFeAccessoriesPricingSchedule,
): number {
  const premiumColourMap = getPremiumColourMap(pricingSchedule);

  for (const entry of tableEntryList) {
    const palladian = entry["palladian shelf"];
    const number = premiumColourMap.get(palladian);
    if (typeof number === "undefined") continue;

    premiumColourMap.set(palladian, number + 1);
  }

  return getMapSum(premiumColourMap);
}

function getMapSum(map: Map<string, number>): number {
  let amount = 0;

  for (const value of map.values()) {
    amount += value;
  }

  return amount;
}
