import type { MotorisationBase } from "./kineticsRollerPricingScheduleType";

export type KineticsAccessoryPricingSchedule = {
  blindType: string[];
  motorisation: MotorisationBase[];
  sillClip: MotorisationBase;
};
