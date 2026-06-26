import { describe, it, expect } from "vitest";
import { partitionVenetianWindowSelectDetailed } from "../../../../src/utility/process/venetianProcessUtility";
import { getVenentianWindowSelectDetailedListWithProjectFile } from "./util";

describe("partitionVenetianWindowSelectDetailed", () => {
  const { windowSelectDetailedList } =
    getVenentianWindowSelectDetailedListWithProjectFile();

  it("should only return a list of mikronwood window select detailed", () => {
    const result = partitionVenetianWindowSelectDetailed(
      windowSelectDetailedList,
    );

    expect(result["Kinetics Mikronwood 50mm Venetian"].length).toBeGreaterThan(
      0,
    );
  });
});
