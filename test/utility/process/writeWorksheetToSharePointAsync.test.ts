import { describe, it, expect } from "vitest";
import worksheetListJSON from "./exampleWorksheetList.json";
import { Worksheet } from "../../../src/type/process/worksheetType";
import {
  writeHistoryFileAsync,
  writeOrderPDFAsync,
} from "../../../src/utility/process/upload/";

describe("writeWorksheetToSharePointAsync", () => {
  const worksheetList: Worksheet[] = worksheetListJSON as Worksheet[];

  describe.skip("writeHistoryFileAsync", () => {
    it("should return file id on success", async () => {
      const result = await writeHistoryFileAsync(worksheetList[0]);
      expect(result).toBeDefined();
      if (typeof result === "undefined") return;
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("writeHistoryFileAsync", () => {
    it("should return file id on success", async () => {
      const result = await writeOrderPDFAsync(worksheetList[0]);
      expect(result).toBeDefined();
      if (typeof result === "undefined") return;
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
