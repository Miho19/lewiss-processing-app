import { describe, expect, it } from "vitest";
import kineticsRollerPricingExample from "./kinetics-roller-pricing-schedule.json";
import { KineticsRollerFabricOpacityType } from "../../../../src/zod/kinetics/sharePointPricingKineticsRoller";
import {
  getKineticsRollerFabricCost,
  getKineticsRollerControlCost,
} from "../../../../src/utility/kinetics/roller/kineticsRollerPricing";

describe("Kinetics Roller Pricing", () => {
  describe("getKineticsRollerFabricCost", () => {
    const exampleInput: [
      number,
      number,
      KineticsRollerFabricOpacityType,
      number,
    ][] = [
      [1200, 900, "light-filtering", 323],
      [1199, 900, "light-filtering", 323],
      [1101, 900, "light-filtering", 323],
      [1200, 899, "light-filtering", 323],
      [1200, 801, "light-filtering", 323],
      [0, 0, "light-filtering", 0],
      [-1, 0, "light-filtering", 0],
      [-1, -1, "light-filtering", 0],
      [-1, -1, "light-filtering", 0],
      [0, -1, "light-filtering", 0],
      [1200, 900, "blockout", 323],
      [1200, 900, "blockout", 323],
      [1200, 900, "sunscreen", 0],
    ];

    it.each(exampleInput)(
      "should given %i, %i, %s multilplier 1.0 return %i",
      (width, height, opacity, expected) => {
        expect(
          getKineticsRollerFabricCost(
            width,
            height,
            opacity,
            1,
            kineticsRollerPricingExample,
          ),
        ).toBe(expected);
      },
    );
  });

  describe("getKineticsRollerControlCost", () => {
    const exampleInput: [string, string, number | undefined][] = [
      ["Chain - White", "1000", 21],
      ["Chain - White", "2000", 21],
      ["Chain - White", "10000000", undefined],
      ["Chain - White", "0", undefined],
      ["Chain - Black", "0", undefined],
      ["Chain - Nickel", "750mm", 21],
      ["Chain - Nickel", "750", 21],
      ["Chain - Black Metal", "1200", 20.4],
      ["Chain - Black Metal", "1200mm", 20.4],
      ["Lithium-ion", "1200mm", 165],
      ["Lithium-ion", "0mm", 165],
      ["Lithium-ion", "-1mm", 165],
      ["Lithium-ion", "1000000mm", 165],
      ["Lithiu-ion", "1000000mm", undefined],
      ["Lith-ion", "1000000mm", undefined],
      ["Hardwired Smart Home", "1000000mm", 196],
      ["Hardwired WiFi Remote Control", "1000000mm", 196],
    ];

    it.each(exampleInput)(
      "should given the inputs %s, %s return %i",
      (control, controlLength, expected) => {
        expect(
          getKineticsRollerControlCost(
            control,
            controlLength,
            kineticsRollerPricingExample,
          ),
        ).toBe(expected);
      },
    );
  });
});
