import { describe, expect, it } from "vitest";
import {
  getKineticsCellularControlCost,
  getKineticsCellularFabricCost,
  getKineticsCellularHeadrailCost,
  getKineticsCellularSideChannelCost,
} from "../../../../src/utility/kinetics/cellular/pricing";

import kineticsPricingExample from "./kinetics-cellular-pricing-example.json";

// will do tests later...
describe("Kinetics Cellular Pricing", () => {
  describe("getKineticsCellularFabricCost", () => {
    const fabricPricingExamples: [
      number,
      number,
      string,
      number | undefined,
    ][] = [
      [1200, 900, "Translucent", 387],
      [1986, 988, "Translucent", 613],
      [-1000, 988, "Translucent", undefined],
      [1200, 988, "Translunt", undefined],
      [1000, -988, "Translucent", undefined],
      [240, 900, "Translucent", 197],
      [300, 3600, "Translucent", 423],
      [3499, 1999, "Translucent", 1769],
      [0, 0, "Blockout", undefined],
      [-1, 0, "Blockout", undefined],
      [0, -1, "Blockout", undefined],
      [-1, -1, "Blockout", undefined],
      [1200, 900, "Blockout", 445.05],
      [0, 0, "Translucent", undefined],
      [0, 0, "432", undefined],
      [1200, 900, "", undefined],
      [1200, 900, "    ", undefined],
      [240, 240, "Translucent", 161],
    ];

    it.each(fabricPricingExamples)(
      "should given width: %i height: %i opacity: %s return %i",
      (width, height, opacity, expectedCost) => {
        const result = getKineticsCellularFabricCost(
          width,
          height,
          opacity,
          kineticsPricingExample,
        );

        if (typeof expectedCost === "undefined") {
          expect(result).toBe(undefined);
        } else {
          expect(result).toBeCloseTo(expectedCost);
        }
      },
    );
  });

  describe("getKineticsCellularControlCost", () => {
    const controlInputExamples: [string, number | undefined][] = [
      ["a", undefined],
      ["", undefined],
      [" ", undefined],
      ["cord", 0],
      [
        "lithium-ion",
        kineticsPricingExample.control.motorisation["Lithium-ion"].base,
      ],
      [
        "LITHium-ion",
        kineticsPricingExample.control.motorisation["Lithium-ion"].base,
      ],
    ];

    it.each(controlInputExamples)(
      "should given %s return %i",
      (control, expectedCost) => {
        const result = getKineticsCellularControlCost(
          control,
          kineticsPricingExample,
        );

        if (typeof expectedCost === "undefined") {
          expect(result).toBe(undefined);
        } else {
          expect(result).toBeCloseTo(expectedCost);
        }
      },
    );
  });

  describe("getKineticsCellularHeadrailCost", () => {
    const exampleInput: [string, number | undefined][] = [
      ["", undefined],
      ["black", 0],
      ["white", 0],
      ["off white", 0],
      [" ", undefined],

      ["custom", 103],
    ];

    it.each(exampleInput)(
      "should given %s return %i",
      (headrailColour, expectedCost) => {
        const result = getKineticsCellularHeadrailCost(
          headrailColour,
          kineticsPricingExample,
        );

        if (typeof expectedCost === "undefined") {
          expect(result).toBe(undefined);
        } else {
          expect(result).toBeCloseTo(expectedCost);
        }
      },
    );
  });

  describe("getKineticsCellularSideChannelCost", () => {
    const exampleInput: [number, string, number | undefined][] = [
      [0, "None", undefined],
      [1200, " ", undefined],
      [1200, "", undefined],
      [-1, "Custom", undefined],
      [1200, "anything", undefined],
      [1200, "WhIte", 150],
      [
        1200,
        "custom",
        150 + kineticsPricingExample.sideChannelCustomColourSurcharge,
      ],
    ];

    it.each(exampleInput)(
      "should given (%i, %s) return %i",
      (height, sideChannelColour, expectedCost) => {
        const result = getKineticsCellularSideChannelCost(
          height,
          sideChannelColour,
          kineticsPricingExample,
        );

        if (typeof expectedCost === "undefined") {
          expect(result).toBe(undefined);
        } else {
          expect(result).toBeCloseTo(expectedCost);
        }
      },
    );
  });
});
