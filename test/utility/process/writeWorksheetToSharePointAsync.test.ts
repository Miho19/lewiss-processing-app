import { describe, it, expect } from "vitest";
import worksheetListJSON from "./exampleWorksheetList.json";
import { writeWorksheetToSharePointAsync } from "../../../src/utility/process/writeWorksheetToSharePoint";
import { Worksheet } from "../../../src/type/process/worksheetType";

describe("writeWorksheetToSharePointAsync", () => {
  const worksheetList: Worksheet[] = worksheetListJSON as Worksheet[];

  it("should do something", async () => {
    const result = await writeWorksheetToSharePointAsync(worksheetList);
  });
});
