import { describe, it, expect } from "vitest";

import { generateKineticsMikroonTableEntryListAsync } from "../../../../src/utility/kinetics/mikronwood/process/kineticsMikronwoodTableEntry";
import { getWindowSelectDetailedListWithProjectFile } from "../../util";

// need to create an example project file containing mikronwood

describe.skip("generateKineticsMikroonTableEntryListAsync", () => {
  const { windowSelectDetailedList, projectFile } =
    getWindowSelectDetailedListWithProjectFile(
      "Kinetics Mikronwood 50mm Venetian",
    );

  it("should generate a list of table entries", async () => {
    const result = await generateKineticsMikroonTableEntryListAsync(
      windowSelectDetailedList,
      projectFile,
    );

    expect(result.length).toBeGreaterThan(0);
    result.map((e) => expect(parseInt(e.price)).toBeGreaterThan(0));
  });
});
