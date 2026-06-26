import { describe, it, expect } from "vitest";
import { getWindowSelectList } from "../../../../src/utility/sharePoint/projectFileUtility";
import sharePointProjectFile from "../../../projectFileExample.json";
import { SharePointProjectFile } from "../../../../src/type/sharePoint/project/projectFileType";
import { getWindowSelectDetailedList } from "../../../../src/utility/process/processUtility";
import {
  createVenetianBlindDocumentAsync,
  partitionVenetianWindowSelectDetailed,
} from "../../../../src/utility/process/venetianProcessUtility";
import { createMikronwoodDocumentAsync } from "../../../../src/utility/kinetics/mikronwood/process/createMikronwoodDocument";
import { getVenentianWindowSelectDetailedListWithProjectFile } from "./util";

describe("Mikronwood Table Entry List", () => {
  const { windowSelectDetailedList } =
    getVenentianWindowSelectDetailedListWithProjectFile();

  it("", () => {});
});
