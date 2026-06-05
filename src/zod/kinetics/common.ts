import type { SharePointKineticsCellularPricingType } from "./sharePointPricingKineticsCellular";
import type { SharePointKineticsRollerPricingType } from "./sharePointPricingKineticsRoller";

export type PricingScheduleType =
  | SharePointKineticsCellularPricingType
  | SharePointKineticsRollerPricingType;
