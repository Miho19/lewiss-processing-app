import { describe, expect, it } from "vitest";
import kineticsRollerPricingExample from "./kinetics-roller-pricing-schedule.json";
import type { KineticsRollerTableEntry } from "../../../../src/utility/kinetics/roller/createRollerPDFDocument";
import { _getKineticsRollerMotorCostProductArray } from "../../../../src/utility/kinetics/roller/kineticsRollerPricing";

describe("Kinetics Roller Worksheet Object", () => {
  describe("_getKineticsRollerMotorCostProductArray", () => {
    it("should return an array containing lithium-ion as one of the products", () => {
      const exampleRollerEntry: KineticsRollerTableEntry = {
        "blind index": 0,
        location: "",
        width: 0,
        height: 0,
        fit: "",
        roll: "",
        fabric: "",
        control: "Lithium-ion",
        "control side": "",
        "bottom rail": "",
        bracket: "",
        pelmet: "",
        butting: "",
        remote: 0,
        "remote channel": 0,
        price: "",
      };

      const result = _getKineticsRollerMotorCostProductArray(
        [exampleRollerEntry],
        kineticsRollerPricingExample,
      );
      expect(result.length).toBe(1);
      expect(result[0].name).toBe("Lithium-ion");
      expect(result[0].quantity).toBe(1);
    });

    it("should return an empty array", () => {
      const exampleRollerEntry: KineticsRollerTableEntry = {
        "blind index": 0,
        location: "",
        width: 0,
        height: 0,
        fit: "",
        roll: "",
        fabric: "",
        control: "Chain FastRise - White",
        "control side": "",
        "bottom rail": "",
        bracket: "",
        pelmet: "",
        butting: "",
        remote: 0,
        "remote channel": 0,
        price: "",
      };

      const result = _getKineticsRollerMotorCostProductArray(
        [exampleRollerEntry],
        kineticsRollerPricingExample,
      );

      expect(result.length).toBe(0);
    });
  });
});
