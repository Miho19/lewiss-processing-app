import { describe, expect, it } from "vitest";

import { getWorksheetCostAsync } from "../../../../../src/utility/process/tableEntryUtility";
import { LewissAluminiumTableEntry } from "../../../../../src/type/process/tableEntry/santaFeTableEntryType";

describe("Lewis's Aluminium Worksheet", () => {
  describe("getWorksheetCostAsync", () => {
    it("should return a worksheet cost object", async () => {
      const entryList: LewissAluminiumTableEntry[] = [
        {
          "blind index": 0,
          location: "",
          width: 0,
          height: 0,
          fit: "",
          colour: "",
          control: "",
          "control side": "",
          "tilt side": "",
          "Spacer Block": "",
          price: "1200",
        },
        {
          "blind index": 1,
          location: "",
          width: 0,
          height: 0,
          fit: "",
          colour: "",
          control: "",
          "control side": "",
          "tilt side": "",
          "Spacer Block": "",
          price: "1200",
        },
      ];
      const worksheetCost = await getWorksheetCostAsync(
        entryList,
        "Lewis's 25mm Aluminium Venetian",
      );

      expect(worksheetCost).toBeDefined();
      expect(worksheetCost.total).toBeGreaterThan(0);
      expect(worksheetCost.blindSubTotal).toBeGreaterThan(0);
      expect(worksheetCost.total).toBeCloseTo(2760);
    });
  });
});
