import type { KineticsCellularPricingSchedule } from "../pricing/kinetics/kineticsCellularPricingScheduleType";
import type { KineticsAccessoryPricingSchedule } from "../pricing/kinetics/kineticsMotorAccessoryPricingScheduleType";
import type { KineticsRollerPricingSchedule } from "../pricing/kinetics/kineticsRollerPricingScheduleType";
import type { BlindType } from "./productType";

export type PricingSchedule =
  | KineticsCellularPricingSchedule
  | KineticsRollerPricingSchedule;

export type BlindTypeToSharePointFileId = Record<BlindType, string>;

export type AccessoryPricingSchedule = KineticsAccessoryPricingSchedule;
