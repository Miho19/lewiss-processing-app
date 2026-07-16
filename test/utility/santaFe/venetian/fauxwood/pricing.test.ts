import { describe, it, expect } from "vitest";
import pricingSchedule from "./lewiss-fauxwood-pricing-schedule.json";
import accessoryPricingSchedule from "../../santa-fe-venetian-accessories.json";
import { getLewissFauxwoodFabricCost } from "../../../../../src/utility/santaFe/venetian/fauxwood/pricing";

describe("Fauxwood Pricing", () => {
  describe("Fabric Cost", () => {
    const exampleInput: [
      number,
      number,
      number,
      number,
      string,
      number | undefined,
    ][] = [
      [1200, 900, 50, 1, "Cord", 74],
      [1200, 900, 50, 1, "Cordless", 92.5],
      [1200, 900, 63, 1, "Cord", 77.7],
      [1200, 900, 63, 1, "Cordless", 97.68],
      [100, 900, 63, 1, "Cordless", 66],
      [1200, 100, 63, 1, "Cordless", 66],
      [0, 100, 50, 1, "Cordless", undefined],
      [0, 0, 50, 1, "Cordless", undefined],
      [1200, 0, 50, 1, "Cordless", undefined],
      [1200, 900, 3, 1, "Cordless", undefined],
      [1200, 900, 5, 1, "Cordless", undefined],
      [1200, 900, 63, 1.5, "Cord", 116.55],
      [1200, 900, 63, 1, "Corded", undefined],
      [1200, 900, 63, 1, "", undefined],
      [1200, 900, 63, 1, "  ", undefined],
    ];

    it.each(exampleInput)(
      "width: %i height: %i slatSize: %i multiplier: %i control: %s should return %i",
      async (width, height, slatSize, fabricMultiplier, control, expected) => {
        const result = getLewissFauxwoodFabricCost(
          width,
          height,
          slatSize,
          fabricMultiplier,
          control,
          pricingSchedule,
        );

        if (typeof expected === "undefined") {
          expect(result).toBeUndefined();
        } else {
          expect(result).toBeCloseTo(expected);
        }
      },
    );
  });
});
