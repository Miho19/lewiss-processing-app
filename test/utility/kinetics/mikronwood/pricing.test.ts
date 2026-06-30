import { describe, expect, it } from "vitest";
import {
  getKineticsMikronwoodControlCost,
  getKineticsMikronwoodFabricCost,
  getKineticsMikronwoodFasciaCost,
  getKineticsMikronwoodHoldDownBracketCost,
} from "../../../../src/utility/kinetics/mikronwood/pricing";
import pricingSchedule from "./kinetics-mikronwood-pricing-schedule.json";

describe("Kinetics Mikronwood Pricing", () => {
  describe("getKineticsMikronwoodFabricCost", () => {
    const exampleInput: [number, number, number | undefined][] = [
      [1200, 900, 528],
      [1120, 900, 528],
      [1200, 899, 528],
      [1101, 801, 528],
      [0, 0, undefined],
      [-1, 900, undefined],
      [1200, -1, undefined],
      [600, 500, 281],
      [599, 499, 281],
      [300, 300, 281],
      [2890, 1500, 1285],
    ];
    it.each(exampleInput)(
      "should given w: %i h: %i return %i",
      (width, height, expected) => {
        const result = getKineticsMikronwoodFabricCost(
          width,
          height,
          pricingSchedule,
        );

        if (typeof expected === "undefined") {
          expect(result).toBeUndefined();
        } else {
          expect(result).toBe(expected);
        }
      },
    );
  });

  describe("getKineticsMikronwoodControlCost", () => {
    const exampleInput: [string, number | undefined][] = [
      ["a", undefined],
      ["cord", 0],
      ["corD", 0],
      ["cora", undefined],
      [" ", undefined],
      ["", undefined],
      ["lithium-ion", pricingSchedule.control.motorisation["Lithium-ion"].base],
      ["Lithium-ion", pricingSchedule.control.motorisation["Lithium-ion"].base],
      ["LitHium-ion", pricingSchedule.control.motorisation["Lithium-ion"].base],
    ];

    it.each(exampleInput)("should given %s return %i", (control, expected) => {
      const result = getKineticsMikronwoodControlCost(control, pricingSchedule);
      if (typeof expected === "undefined") {
        expect(result).toBeUndefined();
      } else {
        expect(result).toBe(expected);
      }
    });
  });

  describe("getKineticsMikronwoodFasciaCost", () => {
    const exampleInput: [string, number | undefined][] = [
      ["", 0],
      ["  ", 0],
      ["a", undefined],
      ["abc", undefined],
      ["fascia", undefined],
      ["Flat", pricingSchedule.fascia["Flat"].base],
      ["FlAt", pricingSchedule.fascia["Flat"].base],
      ["FlAT", pricingSchedule.fascia["Flat"].base],
      ["flat", pricingSchedule.fascia["Flat"].base],
      ["Colonial", pricingSchedule.fascia["Colonial"].base],
    ];

    it.each(exampleInput)(
      "should given the fascia %s return %i",
      (fascia, expected) => {
        const result = getKineticsMikronwoodFasciaCost(fascia, pricingSchedule);
        if (typeof expected === "undefined") {
          expect(result).toBeUndefined();
        } else {
          expect(result).toBe(expected);
        }
      },
    );
  });

  describe("getKineticsMikronwoodHoldDownBracketCost", () => {
    const exampleInput: [string, number | undefined][] = [
      ["", 0],
      ["  ", 0],
      ["Antique Brass", 12],
      ["antique brass", 12],
      ["antIque brAss", 12],
      ["antIque", undefined],
      ["brass", undefined],
      ["a", undefined],
      ["bcdsd", undefined],
    ];

    it.each(exampleInput)("should given %s return %i", (fascia, expected) => {
      const result = getKineticsMikronwoodHoldDownBracketCost(
        fascia,
        pricingSchedule,
      );
      if (typeof expected === "undefined") {
        expect(result).toBeUndefined();
      } else {
        expect(result).toBe(expected);
      }
    });
  });
});
