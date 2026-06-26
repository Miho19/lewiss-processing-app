import type {
  VenetianBlindTypeMappedToCreateWorksheetFunction,
  VenetianBlindTypeToWindowSelectDetailed,
} from "../../type/process/processType";
import type { WindowSelectDetailed } from "../../type/process/windowSelectType";
import type { Worksheet } from "../../type/process/worksheetType";
import type { SharePointProjectFile } from "../../type/sharePoint/project/projectFileType";
import { isVenetianSpec } from "../../type/sharePoint/project/spec/venetianSpec";
import { createMikronwoodDocumentAsync } from "../kinetics/mikronwood/process/createKineticsMikronwoodDocument";

export async function createVenetianBlindDocumentAsync(
  windowSelectDetailedList: WindowSelectDetailed[],
  projectFile: SharePointProjectFile,
): Promise<Worksheet[]> {
  // split windowselect --> createPDF func --> create worksheet

  const partitionedWindowSelectDetailedList =
    partitionVenetianWindowSelectDetailed(windowSelectDetailedList);

  const taskList = Object.entries(partitionedWindowSelectDetailedList).map(
    async ([key, windowSelectDetailedList]) => {
      if (windowSelectDetailedList.length === 0) return;

      const createWorksheetFunctionAsync =
        venetianCreateWorksheetDocumentFunctionMap[
          key as keyof VenetianBlindTypeMappedToCreateWorksheetFunction
        ];

      return await createWorksheetFunctionAsync(
        windowSelectDetailedList,
        projectFile,
      );
    },
  );

  const outputList = await Promise.all(taskList);

  return outputList.filter((w) => typeof w !== "undefined");
}

export function partitionVenetianWindowSelectDetailed(
  windowSelectDetailedList: WindowSelectDetailed[],
): VenetianBlindTypeToWindowSelectDetailed {
  const partitionMapping: VenetianBlindTypeToWindowSelectDetailed = {
    "Kinetics Mikronwood 50mm Venetian": [],
    "Lewis's 25mm Aluminium Venetian": [],
    "Lewis's 50mm Aluminium Venetian": [],
    "Lewis's 50mm Fauxwood Venetian": [],
    "Lewis's 63mm Fauxwood Venetian": [],
    "Lewis's 50mm Phoenixwood Venetian": [],
    "Lewis's 63mm Phoenixwood Venetian": [],
  };

  Object.entries(partitionMapping).forEach(([key, value]) => {
    const filteredList = windowSelectDetailedList.filter((w) => {
      const spec = w.treatment.spec;

      if (!isVenetianSpec(spec)) return false;

      const { baseType } = spec;
      if (typeof baseType === "undefined") return false;

      if (baseType.localeCompare(key, undefined, { sensitivity: "base" }) === 0)
        return true;

      return false;
    });

    value.push(...filteredList);
  });

  return partitionMapping;
}

const venetianCreateWorksheetDocumentFunctionMap: VenetianBlindTypeMappedToCreateWorksheetFunction =
  {
    "Kinetics Mikronwood 50mm Venetian": createMikronwoodDocumentAsync,
    "Lewis's 25mm Aluminium Venetian": function (
      windowSelectDetailedList: WindowSelectDetailed[],
      projectFile: SharePointProjectFile,
    ): Promise<Worksheet | undefined> {
      throw new Error("Function not implemented.");
    },
    "Lewis's 50mm Aluminium Venetian": function (
      windowSelectDetailedList: WindowSelectDetailed[],
      projectFile: SharePointProjectFile,
    ): Promise<Worksheet | undefined> {
      throw new Error("Function not implemented.");
    },
    "Lewis's 50mm Fauxwood Venetian": function (
      windowSelectDetailedList: WindowSelectDetailed[],
      projectFile: SharePointProjectFile,
    ): Promise<Worksheet | undefined> {
      throw new Error("Function not implemented.");
    },
    "Lewis's 63mm Fauxwood Venetian": function (
      windowSelectDetailedList: WindowSelectDetailed[],
      projectFile: SharePointProjectFile,
    ): Promise<Worksheet | undefined> {
      throw new Error("Function not implemented.");
    },
    "Lewis's 50mm Phoenixwood Venetian": function (
      windowSelectDetailedList: WindowSelectDetailed[],
      projectFile: SharePointProjectFile,
    ): Promise<Worksheet | undefined> {
      throw new Error("Function not implemented.");
    },
    "Lewis's 63mm Phoenixwood Venetian": function (
      windowSelectDetailedList: WindowSelectDetailed[],
      projectFile: SharePointProjectFile,
    ): Promise<Worksheet | undefined> {
      throw new Error("Function not implemented.");
    },
  };
