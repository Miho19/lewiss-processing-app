import type { KineticsCellularPricingSchedule } from "../kinetics/kineticsCellularType";
import type { KineticsRollerPricingSchedule } from "../kinetics/kineticsRollerType";
import type { BlindType } from "./productType";

export type PricingSchedule =
  | KineticsCellularPricingSchedule
  | KineticsRollerPricingSchedule;

export type BlindTypeToSharePointPricingScheduleFileId = Record<
  BlindType,
  string
>;
