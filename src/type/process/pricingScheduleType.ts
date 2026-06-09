import type { KineticsCellularPricingSchedule } from "../pricing/kinetics/kineticsCellularPricingScheduleType";
import type { KineticsRollerPricingSchedule } from "../pricing/kinetics/kineticsRollerPricingScheduleType";
import type { BlindType } from "./productType";

export type PricingSchedule =
  | KineticsCellularPricingSchedule
  | KineticsRollerPricingSchedule;

export type BlindTypeToSharePointPricingScheduleFileId = Record<
  BlindType,
  string
>;
