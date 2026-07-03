import type {
  BlindTypeMappedToCreateWorksheetFunction,
  BlindTypeMappedToWindowSelectDetailed,
} from "../../type/process/processType";
import type {
  WindowSelect,
  WindowSelectDetailed,
} from "../../type/process/windowSelectType";
import type { SharePointProjectFile } from "../../type/sharePoint/project/projectFileType";
import { createKineticsCellularDocumentAsync } from "../kinetics/cellular/process/createCellularBlindDocument";
import { createKineticsRollerWorksheetAsync } from "../kinetics/roller/process/createKineticsRollerWorksheet";
import { getRoomAndWindowMeasurement } from "../sharePoint/projectFileUtility";
import {
  getWindowBlindCountString,
  getWindowHeight,
  getWindowWidth,
} from "../sharePoint/windowMeasurementUtility";
import type { BlindType } from "../../type/process/productType";
import type { Worksheet } from "../../type/process/worksheetType";
import type { Spec } from "../../type/sharePoint/project/spec/spec";
import {
  isKineticsCellularSpec,
  isKineticsRollerSpec,
} from "../../type/sharePoint/project/spec/kineticsSpec";
import { isVenetianSpec } from "../../type/sharePoint/project/spec/venetianSpec";
import { createKineticsMikronwoodWorksheetAsync } from "../kinetics/mikronwood/process/createKineticsMikronwoodWorksheet";
import { createLewissAluminiumWorksheetAsync } from "../santaFe/venetian/aluminium/process/createLewissAluminiumWorksheet";

/**
 *  Maybe use a generic pdf array return type --> makes testing easier, currently very badly coupled
 * @param windowSelectList
 *
 * @param projectFile
 * @returns
 */

export async function processWindowsSelectedAsync(
  windowSelectList: WindowSelect[],
  projectFile: SharePointProjectFile,
): Promise<Worksheet[]> {
  if (windowSelectList.length === 0) return [];
  if (typeof projectFile === "undefined") return [];

  const windowSelectDetailedList = getWindowSelectDetailedList(
    windowSelectList,
    projectFile,
  );

  const blindTypeMapped = mapWindowSelectDetailedIntoBlindType(
    windowSelectDetailedList,
  );

  const worksheetList = await createWorksheetAsync(
    blindTypeMapped,
    projectFile,
  );

  //await writeWorksheetToSharePointAsync(worksheetList);

  return worksheetList;
}

async function createWorksheetAsync(
  blindTypeMapped: BlindTypeMappedToWindowSelectDetailed,
  projectFile: SharePointProjectFile,
): Promise<Worksheet[]> {
  const processGroupTasks = (Object.keys(blindTypeMapped) as BlindType[]).map(
    async (blindType) => {
      const windowSelectDetailList = blindTypeMapped[blindType];
      if (windowSelectDetailList.length === 0) return [];

      const createWorksheetFunctionAsync =
        blindTypeMappedToWorksheetCreateFunction[blindType];

      const createdWorksheet = await createWorksheetFunctionAsync(
        blindType,
        windowSelectDetailList,
        projectFile,
      );

      return createdWorksheet;
    },
  );

  const worksheetList: Worksheet[][] = await Promise.all(processGroupTasks);

  return worksheetList.flat();
}

function mapWindowSelectDetailedIntoBlindType(
  windowSelectDetailedList: WindowSelectDetailed[],
): BlindTypeMappedToWindowSelectDetailed {
  const map: BlindTypeMappedToWindowSelectDetailed = {
    "Kinetics Sunscreen Roller Blind": [],
    "Kinetics Blockout Roller Blind": [],
    "Kinetics Light Filtering Roller Blind": [],
    "Kinetics 10mm Cellular Blind": [],
    "Kinetics 20mm Cellular Blind": [],
    "Kinetics Mikronwood 50mm Venetian": [],
    "Lewis's 25mm Aluminium Venetian": [],
    "Lewis's 50mm Aluminium Venetian": [],
    "Lewis's 50mm Fauxwood Venetian": [],
    "Lewis's 63mm Fauxwood Venetian": [],
    "Lewis's 50mm Phoenixwood Venetian": [],
    "Lewis's 63mm Phoenixwood Venetian": [],
  };

  Object.entries(map).forEach(([key, value]) => {
    const filteredList = windowSelectDetailedList.filter((window) => {
      const blindType = getBlindTypeFromSpec(window.treatment.spec);
      if (typeof blindType === "undefined") return false;
      if (
        key.localeCompare(blindType, undefined, { sensitivity: "base" }) === 0
      )
        return true;

      return false;
    });
    value.push(...filteredList);
  });

  return map;
}

export function getBlindTypeFromSpec(spec: Spec): BlindType | undefined {
  if (isKineticsCellularSpec(spec)) return spec.blindType;
  if (isKineticsRollerSpec(spec)) return spec.blindType;
  if (isVenetianSpec(spec)) return spec.baseType;

  return undefined;
}

export function getWindowSelectDetailedList(
  windowSelectList: WindowSelect[],
  projectFile: SharePointProjectFile,
): WindowSelectDetailed[] {
  const joinedList = windowSelectList.map((window) => {
    const [projectRoom, projectWindow] = getRoomAndWindowMeasurement(
      projectFile,
      window.roomId,
      window.windowId,
    );

    const blindCountString = getWindowBlindCountString(
      window.fit === "inside"
        ? projectWindow.blindCount
        : projectWindow.outsideBlindCount,
    );

    const treatment =
      window.fit === "inside"
        ? projectRoom.treatment.insideLayer
        : projectRoom.treatment.outsideLayer;

    if (typeof treatment === "undefined" || treatment === null) return [];

    const newEntry: WindowSelectDetailed = {
      windowId: window.windowId,
      roomId: window.roomId,
      blindCountString: blindCountString,
      fit: window.fit,
      width: getWindowWidth(projectWindow, window.fit),
      height: getWindowHeight(projectWindow, window.fit),
      treatment: treatment,
    };

    return newEntry;
  });

  return joinedList.flat();
}

export const blindTypeMappedToWorksheetCreateFunction: BlindTypeMappedToCreateWorksheetFunction =
  {
    "Kinetics 10mm Cellular Blind": createKineticsCellularDocumentAsync,
    "Kinetics 20mm Cellular Blind": createKineticsCellularDocumentAsync,
    "Kinetics Blockout Roller Blind": createKineticsRollerWorksheetAsync,
    "Kinetics Light Filtering Roller Blind": createKineticsRollerWorksheetAsync,
    "Kinetics Sunscreen Roller Blind": createKineticsRollerWorksheetAsync,
    "Kinetics Mikronwood 50mm Venetian": createKineticsMikronwoodWorksheetAsync,
    "Lewis's 25mm Aluminium Venetian": createLewissAluminiumWorksheetAsync,
    "Lewis's 50mm Aluminium Venetian": createLewissAluminiumWorksheetAsync,
    "Lewis's 50mm Fauxwood Venetian": function (
      blindType: BlindType,
      windowSelectDetailedList: WindowSelectDetailed[],
      projectFile: SharePointProjectFile,
    ): Promise<Worksheet[]> {
      throw new Error("Function not implemented.");
    },
    "Lewis's 63mm Fauxwood Venetian": function (
      blindType: BlindType,
      windowSelectDetailedList: WindowSelectDetailed[],
      projectFile: SharePointProjectFile,
    ): Promise<Worksheet[]> {
      throw new Error("Function not implemented.");
    },
    "Lewis's 50mm Phoenixwood Venetian": function (
      blindType: BlindType,
      windowSelectDetailedList: WindowSelectDetailed[],
      projectFile: SharePointProjectFile,
    ): Promise<Worksheet[]> {
      throw new Error("Function not implemented.");
    },
    "Lewis's 63mm Phoenixwood Venetian": function (
      blindType: BlindType,
      windowSelectDetailedList: WindowSelectDetailed[],
      projectFile: SharePointProjectFile,
    ): Promise<Worksheet[]> {
      throw new Error("Function not implemented.");
    },
  };

export function filterWindowSelectBySelected(
  windowSelectList: WindowSelect[],
): WindowSelect[] {
  return windowSelectList.filter((window) => window.selected);
}
