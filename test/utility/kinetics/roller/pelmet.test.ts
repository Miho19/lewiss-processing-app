import { describe, it, expect } from "vitest";
import { getKineticsRollerPelmetString } from "../../../../src/utility/kinetics/roller/presentation";

/**
 * We are testing the string from the spec, these values can range from the actual string, undefined and null...
 *
 *
 */

describe("Kinetics Roller Pelmet", () => {
  const exampleInput: [string | undefined | null, string][] = [
    ["110 I/S", "110mm - Inside"],
    ["110 O/S", "110mm - Outside"],
    ["160 O/S", "160mm - Outside"],
    ["", ""],
    ["  ", ""],
    [undefined, ""],
    [null, ""],
  ];

  it.each(exampleInput)("should given %s return %s", (pelmet, expected) => {
    expect(getKineticsRollerPelmetString(pelmet)).toBe(expected);
  });
});
