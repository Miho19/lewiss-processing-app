import { describe, expect, it } from "vitest";
import kineticsRollerPricingExample from "./kinetics-roller-pricing-schedule.json";
import { KineticsRollerFabricOpacityType } from "../../../../src/zod/kinetics/sharePointPricingKineticsRoller";
import { getKineticsRollerFabricPrice } from "../../../../src/utility/kinetics/roller/kineticsRollerPricing";

describe("Kinetics Roller Pricing", () => {
  describe("getKineticsRollerFabricPrice", () => {
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
          getKineticsRollerFabricPrice(
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
});
