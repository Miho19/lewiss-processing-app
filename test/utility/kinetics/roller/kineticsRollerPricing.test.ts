import { describe, expect, it } from "vitest";
import kineticsRollerPricingExample from "./kinetics-roller-pricing-schedule.json";
import { KineticsRollerFabricOpacity } from "../../../../src/type/pricing/kinetics/kineticsRollerPricingScheduleType";
import {
  getKineticsRollerFabricCost,
  getKineticsRollerControlCost,
  getKineticsRollerBottomRailCost,
  getKineticsRollerPelmetCost,
} from "../../../../src/utility/kinetics/roller/pricing";

describe("Kinetics Roller Pricing", () => {
  describe("getKineticsRollerFabricCost", () => {
    const exampleInput: [
      number,
      number,
      KineticsRollerFabricOpacity,
      number | undefined,
    ][] = [
      [1200, 900, "light-filtering", 333.03],
      [1199, 900, "light-filtering", 333.03],
      [1101, 900, "light-filtering", 333.03],
      [1200, 899, "light-filtering", 333.03],
      [1200, 801, "light-filtering", 333.03],
      [0, 0, "light-filtering", undefined],
      [-1, 0, "light-filtering", undefined],
      [-1, -1, "light-filtering", undefined],
      [-1, -1, "light-filtering", undefined],
      [0, -1, "light-filtering", undefined],
      [1200, 900, "blockout", 333.03],
      [1200, 900, "blockout", 333.03],
      [1200, 900, "sunscreen", undefined],
    ];

    it.each(exampleInput)(
      "should given %i, %i, %s multilplier 1.0 return %i",
      (width, height, opacity, expected) => {
        const result = getKineticsRollerFabricCost(
          width,
          height,
          opacity,
          1,
          kineticsRollerPricingExample,
        );

        if (typeof expected === "undefined") {
          expect(result).toBe(undefined);
        } else {
          expect(result).toBeCloseTo(expected, 2);
        }
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
      ["Lithium-ion", "1200mm", 170],
      ["Lithium-ion", "0mm", 170],
      ["Lithium-ion", "-1mm", 170],
      ["Lithium-ion", "1000000mm", 170],
      ["Lithiu-ion", "1000000mm", undefined],
      ["Lith-ion", "1000000mm", undefined],
      ["Hardwired Smart Home", "1000000mm", 202],
      ["Hardwired WiFi Remote Control", "1000000mm", 202],
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

  describe("getKineticsRollerBottomRailCost", () => {
    const exampleInput: [number, string, string, number][] = [
      [1200, "flat", "black", 0],
      [1200, "deluxe", "black", 15.6],
      [1200, "de", "black", 0],
    ];

    it.each(exampleInput)(
      "should given %i, %s - %s return %i",
      (width, bottomRailType, bottomRailColour, expected) => {
        expect(
          getKineticsRollerBottomRailCost(
            width,
            bottomRailType,
            bottomRailColour,
            kineticsRollerPricingExample,
          ),
        ).toBe(expected);
      },
    );
  });

  describe("getKineticsRollerPelmetCost", () => {
    const exampleInput: [number, string, number | undefined][] = [
      [1200, "110mm - Inside", 57.91],
      [0, "110mm - Inside", undefined],
      [1200, "", 0],
      [1200, "", 0],
      [1200, "\t\t", 0],
      [-1, "110mm - Inside", undefined],
      [1260, "110mm - Inside", 69.49],
      [1000, "110mm - Inside", 46.33],
      [240, "110mm - Inside", 46.33],
      [5000, "110mm - Inside", 231.64],
      [1260, "160mm - Outside", 142.84],
      [1000, "160mm - Outside", 95.23],
      [240, "160mm - Outside", 95.23],
    ];

    it.each(exampleInput)(
      "should given %i %s return %i",
      (width, pelmet, expected) => {
        const result = getKineticsRollerPelmetCost(
          width,
          pelmet,
          kineticsRollerPricingExample,
        );
        if (typeof expected === "undefined") {
          expect(result).toBe(undefined);
        } else {
          expect(result).toBeCloseTo(expected);
        }
      },
    );
  });
});
