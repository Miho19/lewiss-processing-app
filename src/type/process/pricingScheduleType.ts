import type { KineticsCellularPricingSchedule } from "../kinetics/kineticsCellularType";
import type { KineticsRollerPricingSchedule } from "../kinetics/kineticsRollerType";

export type PricingScheduleType =
  | KineticsCellularPricingSchedule
  | KineticsRollerPricingSchedule;
