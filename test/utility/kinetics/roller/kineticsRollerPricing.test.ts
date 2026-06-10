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
      [1200, 900, "light-filtering", 323],
      [1199, 900, "light-filtering", 323],
      [1101, 900, "light-filtering", 323],
      [1200, 899, "light-filtering", 323],
      [1200, 801, "light-filtering", 323],
      [0, 0, "light-filtering", undefined],
      [-1, 0, "light-filtering", undefined],
      [-1, -1, "light-filtering", undefined],
      [-1, -1, "light-filtering", undefined],
      [0, -1, "light-filtering", undefined],
      [1200, 900, "blockout", 323],
      [1200, 900, "blockout", 323],
      [1200, 900, "sunscreen", undefined],
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
      [1200, "110 I/S", 56.25],
      [0, "110 I/S", undefined],
      [1200, "", 0],
      [1200, "", 0],
      [1200, "\t\t", 0],
      [-1, "110 I/S", undefined],
      [1260, "110 I/S", 67.5],
      [1000, "110 I/S", 45],
      [240, "110 I/S", 45],
      [5000, "110 I/S", 225],
      [1260, "160 O/S", 138.75],
      [1000, "160 o/S", 92.5],
      [240, "160 O/s", 92.5],
    ];

    it.each(exampleInput)(
      "should given %i %s return %i",
      (width, pelmet, expected) => {
        expect(
          getKineticsRollerPelmetCost(
            width,
            pelmet,
            kineticsRollerPricingExample,
          ),
        ).toBe(expected);
      },
    );
  });
});
