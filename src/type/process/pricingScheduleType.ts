import type { KineticsCellularPricingSchedule } from "../kinetics/kineticsCellularPricingScheduleType";
import type { KineticsRollerPricingSchedule } from "../kinetics/kineticsRollerPricingScheduleType";
import type { BlindType } from "./productType";

export type PricingSchedule =
  | KineticsCellularPricingSchedule
  | KineticsRollerPricingSchedule;

export type BlindTypeToSharePointPricingScheduleFileId = Record<
  BlindType,
  string
>;
