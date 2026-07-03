import { describe, it, expect } from "vitest";
import lewissAluminiumPricing from "./lewiss-aluminium-venetian-pricing-schedule.json";
import { getLewissAluminiumFabricCost } from "../../../../../src/utility/santaFe/venetian/aluminium/pricing";

describe("Lewiss Aluminium Pricing", () => {
  const pricingSchedule = JSON.parse(JSON.stringify(lewissAluminiumPricing));

  // missing test for spacer blocks
  describe("Fabric Cost", () => {
    const exampleInput: [
      number,
      number,
      number,
      number,
      string,
      number | undefined,
    ][] = [
      [1200, 900, 25, 1, "Cord", 60],
      [1200, 900, 25, 1, "Cordless", 84],
      [1200, 900, 50, 1, "Cord", 90],
      [1200, 900, 50, 1, "Cordless", 142.8],
      [100, 900, 50, 1, "Cordless", 116.62],
      [1200, 100, 50, 1, "Cordless", 116.62],
      [0, 100, 50, 1, "Cordless", undefined],
      [0, 0, 50, 1, "Cordless", undefined],
      [1200, 0, 50, 1, "Cordless", undefined],
      [1200, 900, 3, 1, "Cordless", undefined],
      [1200, 900, 5, 1, "Cordless", undefined],
      [1200, 900, 25, 1.5, "Cord", 90],
      [1200, 900, 25, 1, "Corded", undefined],
      [1200, 900, 25, 1, "", undefined],
      [1200, 900, 25, 1, "  ", undefined],
    ];
    it.each(exampleInput)(
      "width: %i height: %i slatSize: %i multiplier: %i control: %s should return %i",
      async (width, height, slatSize, fabricMultiplier, control, expected) => {
        const result = getLewissAluminiumFabricCost(
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
