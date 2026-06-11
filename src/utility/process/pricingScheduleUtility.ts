import { queryClient } from "../../http/queryClient";
import {
  GETSharePointAccessoryPricingSchedule,
  GETSharePointPricingSchedule,
} from "../../http/sharePoint";

import type {
  AccessoryPricingSchedule,
  PricingSchedule,
} from "../../type/process/pricingScheduleType";
import type { BlindType } from "../../type/process/productType";

export async function getPricingScheduleAsync(
  blindType: BlindType,
): Promise<PricingSchedule | undefined> {
  try {
    const pricingSchedule = await queryClient.ensureQueryData({
      queryKey: [`pricing schedule ${blindType}`],
      queryFn: () => GETSharePointPricingSchedule(blindType),
    });
    return pricingSchedule;
  } catch (error) {
    console.error(`Failed to fetch ${blindType} pricing schedule ${error}`);

    return undefined;
  }
}

export async function getAccessoryPricingScheduleAsync(
  blindType: BlindType,
): Promise<AccessoryPricingSchedule | undefined> {
  try {
    const pricingSchedule = await queryClient.ensureQueryData({
      queryKey: [`pricing schedule ${blindType}`],
      queryFn: () => GETSharePointAccessoryPricingSchedule(blindType),
    });
    return pricingSchedule;
  } catch (error) {
    console.error(`Failed to fetch ${blindType} pricing schedule ${error}`);

    return undefined;
  }
}
