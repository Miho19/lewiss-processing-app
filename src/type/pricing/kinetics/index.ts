import type { PricingSchedule } from "../../process/pricingScheduleType";
import {
  isKineticsCellularPricingSchedule,
  type KineticsCellularPricingSchedule,
} from "./kineticsCellularPricingScheduleType";
import {
  isKineticsMikronwoodPricingSchedule,
  type KineticsMikronwoodPricingSchedule,
} from "./kineticsMikronwoodPricingScheduleType";
import {
  isKineticsRollerPricingSchedule,
  type KineticsRollerPricingSchedule,
} from "./kineticsRollerPricingScheduleType";

export * from "./kineticsCellularPricingScheduleType";
export * from "./kineticsMikronwoodPricingScheduleType";
export * from "./kineticsMotorAccessoryPricingScheduleType";
export * from "./kineticsRollerPricingScheduleType";

export type KineticsPricingSchedule =
  | KineticsCellularPricingSchedule
  | KineticsRollerPricingSchedule
  | KineticsMikronwoodPricingSchedule;

export function isKineticsPricingSchedule(
  pricingSchedule: PricingSchedule,
): pricingSchedule is KineticsPricingSchedule {
  return (
    isKineticsCellularPricingSchedule(pricingSchedule) ||
    isKineticsRollerPricingSchedule(pricingSchedule) ||
    isKineticsMikronwoodPricingSchedule(pricingSchedule)
  );
}
