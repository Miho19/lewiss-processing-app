import { describe, it, expect } from "vitest";
import { getWindowSelectList } from "../../../../src/utility/sharePoint/projectFileUtility";
import sharePointProjectFile from "../../../projectFileExample.json";
import { SharePointProjectFile } from "../../../../src/type/sharePoint/project/projectFileType";
import { getWindowSelectDetailedList } from "../../../../src/utility/process/processUtility";
import {
  createVenetianBlindDocumentAsync,
  partitionVenetianWindowSelectDetailed,
} from "../../../../src/utility/process/venetianProcessUtility";

describe("Mikronwood Worksheet", () => {
  const projectFile = JSON.parse(
    JSON.stringify(sharePointProjectFile),
  ) as SharePointProjectFile;

  const venetianWindowSelectDetailedList =
    getVenentianWindowSelectDetailedList(projectFile);

  describe("createVenetianBlindDocumentAsync", () => {
    it("partitionVenetianWindowSelectDetailed should return a list of mikronwood window select detailed", () => {
      const result = partitionVenetianWindowSelectDetailed(
        venetianWindowSelectDetailedList,
      );

      expect(
        result["Kinetics Mikronwood 50mm Venetian"].length,
      ).toBeGreaterThan(0);
    });

    it("should return a worksheet list", async () => {
      const result = await createVenetianBlindDocumentAsync(
        venetianWindowSelectDetailedList,
        projectFile,
      );

      expect(result.length).toBeGreaterThan(0);
    });
  });
});

function getVenentianWindowSelectDetailedList(
  projectFile: SharePointProjectFile,
) {
  const windowSelectList = getWindowSelectList(projectFile);

  const windowSelectDetailList = getWindowSelectDetailedList(
    windowSelectList,
    projectFile,
  );

  const filterForVenetians = windowSelectDetailList.filter(
    (w) => w.treatment.productId === "venetian-blind",
  );

  return filterForVenetians;
}
