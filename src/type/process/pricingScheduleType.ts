import type { KineticsCellularPricingSchedule } from "../pricing/kinetics/kineticsCellularPricingScheduleType";
import type { KineticsMikronwoodPricingSchedule } from "../pricing/kinetics/kineticsMikronwoodPricingScheduleType";
import type { KineticsAccessoryPricingSchedule } from "../pricing/kinetics/kineticsMotorAccessoryPricingScheduleType";
import type { KineticsRollerPricingSchedule } from "../pricing/kinetics/kineticsRollerPricingScheduleType";
import type { LewissAluminiumVenetianPricingSchedule } from "../pricing/santaFe/lewissAluminiumVenetianPricingScheduleType";
import type { LewissFauxwoodVenetianPricingSchedule } from "../pricing/santaFe/lewissFauxwoodVenetianPricingScheduleType";
import type { LewissPhoenixwoodVenetianPricingSchedule } from "../pricing/santaFe/lewissPhoenixwoodVenetianPricingScheduleType";
import type { SantaFeAccessoriesPricingSchedule } from "../pricing/santaFe/santaFeAccessoriesPricingScheduleType";
import type { BlindType } from "./productType";

export type PricingSchedule =
  | KineticsCellularPricingSchedule
  | KineticsRollerPricingSchedule
  | KineticsMikronwoodPricingSchedule
  | LewissAluminiumVenetianPricingSchedule
  | LewissFauxwoodVenetianPricingSchedule
  | LewissPhoenixwoodVenetianPricingSchedule;

export type BlindTypeToSharePointFileId = Record<BlindType, string>;

export type AccessoryPricingSchedule =
  | KineticsAccessoryPricingSchedule
  | SantaFeAccessoriesPricingSchedule;
