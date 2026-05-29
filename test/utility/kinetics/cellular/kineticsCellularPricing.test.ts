import { describe, expect, it } from "vitest";
import {
  getKineticsCellularControlCost,
  getKineticsCellularFabricCost,
  getKineticsCellularHeadrailCost,
  getKineticsCellularSideChannelCost,
} from "../../../../src/utility/kinetics/cellular/kineticsCellularPricing";
import kineticsPricingExample from "./kinetics-cellular-pricing-example.json";

// will do tests later...
describe("Kinetics Cellular Pricing", () => {
  describe("getKineticsCellularFabricCost", () => {
    const fabricPricingExamples: [
      number,
      number,
      "Translucent" | "Blockout",
      number,
    ][] = [[1200, 900, "Translucent", 376]];

    it.each(fabricPricingExamples)(
      "",
      (width, height, opacity, expectedCost) => {
        expect(
          getKineticsCellularFabricCost(
            width,
            height,
            opacity,
            kineticsPricingExample,
          ),
        ).toBe(expectedCost);
      },
    );
  });

  describe("getKineticsCellularControlCost", () => {
    const controlInputExamples: [string, number][] = [
      ["a", 0],
      ["", 0],
      [" ", 0],
      ["cord", 0],
      ["lithium-ion", kineticsPricingExample.motorisation["Lithium-ion"]],
      ["LITHium-ion", kineticsPricingExample.motorisation["Lithium-ion"]],
    ];

    it.each(controlInputExamples)(
      "should return the expected results",
      (control, expectedCost) => {
        expect(
          getKineticsCellularControlCost(control, kineticsPricingExample),
        ).toBe(expectedCost);
      },
    );
  });

  describe("getKineticsCellularHeadrailCost", () => {
    const exampleInput: [string, number][] = [
      ["", 0],
      ["black", 0],
      ["white", 0],
      ["off white", 0],
      [" ", 0],
      ["custom", 103],
    ];

    it.each(exampleInput)(
      "should return expected number",
      (headrailColour, expectedCost) => {
        expect(
          getKineticsCellularHeadrailCost(
            headrailColour,
            kineticsPricingExample,
          ),
        ).toBe(expectedCost);
      },
    );
  });

  describe("getKineticsCellularSideChannelCost", () => {
    const exampleInput: [number, string, number][] = [
      [0, "None", 0],
      [1200, " ", 0],
      [1200, "", 0],
      [-1, "Custom", 0],
      [1200, "anything", 0],
      [1200, "black", 150],
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
        expect(
          getKineticsCellularSideChannelCost(
            height,
            sideChannelColour,
            kineticsPricingExample,
          ),
        ).toBe(expectedCost);
      },
    );
  });
});
