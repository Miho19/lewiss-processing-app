import { describe, expect, it } from "vitest";

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
      async (width, height, expected) => {
        const result = await getKineticsMikronwoodFabricCost(
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
});
