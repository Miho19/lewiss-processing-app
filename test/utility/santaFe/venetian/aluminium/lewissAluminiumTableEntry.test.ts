import { describe, expect, it } from "vitest";
import { getWindowSelectDetailedListWithProjectFile } from "../../../util";
import { generateLewissAluminiumTableEntryListAsync } from "../../../../../src/utility/santaFe/venetian/aluminium/process/lewissAluminiumTableEntry";

describe("Lewiss Aluminium Table Entry", () => {
  const { windowSelectDetailedList, projectFile } =
    getWindowSelectDetailedListWithProjectFile(
      "Lewis's 25mm Aluminium Venetian",
    );

  it("should generate a list of table entries", async () => {
    const result = await generateLewissAluminiumTableEntryListAsync(
      windowSelectDetailedList,
      projectFile,
    );

    expect(result.length).toBeGreaterThan(0);
    result.map((e) => expect(parseInt(e.price)).toBeGreaterThan(0));
  });
});
