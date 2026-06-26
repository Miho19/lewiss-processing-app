import { describe, it, expect } from "vitest";
import { getVenentianWindowSelectDetailedListWithProjectFile } from "./util";
import { generateKineticsMikroonTableEntryListAsync } from "../../../../src/utility/kinetics/mikronwood/process/kineticsMikronwoodTableEntry";

describe("generateKineticsMikroonTableEntryListAsync", () => {
  const { windowSelectDetailedList, projectFile } =
    getVenentianWindowSelectDetailedListWithProjectFile();

  it("should generate a list of table entries", async () => {
    const result = await generateKineticsMikroonTableEntryListAsync(
      windowSelectDetailedList,
      projectFile,
    );

    expect(result.length).toBeGreaterThan(0);
  });
});
