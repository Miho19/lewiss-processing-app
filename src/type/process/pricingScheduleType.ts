import type { KineticsCellularPricingSchedule } from "../pricing/kinetics/kineticsCellularPricingScheduleType";
import type { KineticsMikronwoodPricingSchedule } from "../pricing/kinetics/kineticsMikronwoodPricingScheduleType";
import type { KineticsAccessoryPricingSchedule } from "../pricing/kinetics/kineticsMotorAccessoryPricingScheduleType";
import type { KineticsRollerPricingSchedule } from "../pricing/kinetics/kineticsRollerPricingScheduleType";
import type { LewissAluminiumVenetianPricingSchedule } from "../pricing/santaFe/lewissAluminiumVenetianPricingScheduleType";
import type { BlindType } from "./productType";

export type PricingSchedule =
  | KineticsCellularPricingSchedule
  | KineticsRollerPricingSchedule
  | KineticsMikronwoodPricingSchedule
  | LewissAluminiumVenetianPricingSchedule;

export type BlindTypeToSharePointFileId = Record<BlindType, string>;

export type AccessoryPricingSchedule = KineticsAccessoryPricingSchedule;
