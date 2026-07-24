import type { KineticsPricingSchedule } from "../pricing/kinetics";
import type { KineticsAccessoryPricingSchedule } from "../pricing/kinetics/kineticsMotorAccessoryPricingScheduleType";
import type { LewissAluminiumVenetianPricingSchedule } from "../pricing/santaFe/lewissAluminiumVenetianPricingScheduleType";
import type { LewissFauxwoodVenetianPricingSchedule } from "../pricing/santaFe/lewissFauxwoodVenetianPricingScheduleType";
import type { LewissPhoenixwoodVenetianPricingSchedule } from "../pricing/santaFe/lewissPhoenixwoodVenetianPricingScheduleType";
import type { SantaFeAccessoriesPricingSchedule } from "../pricing/santaFe/santaFeAccessoriesPricingScheduleType";
import type { BlindType } from "./productType";

export type PricingSchedule =
  | KineticsPricingSchedule
  | LewissAluminiumVenetianPricingSchedule
  | LewissFauxwoodVenetianPricingSchedule
  | LewissPhoenixwoodVenetianPricingSchedule;

export type BlindTypeToSharePointFileId = Record<BlindType, string>;

export type AccessoryPricingSchedule =
  | KineticsAccessoryPricingSchedule
  | SantaFeAccessoriesPricingSchedule;
