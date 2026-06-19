import type {
  ProcessGroupToWindowSelectDetailed,
  ProcessName,
  ProductIdMappedToCreateWorksheetFunction,
} from "../../type/process/processType";
import type {
  WindowSelect,
  WindowSelectDetailed,
} from "../../type/process/windowSelectType";
import type { SharePointProjectFile } from "../../type/sharePoint/project/projectFileType";
import { createCellularBlindDocumentAsync } from "../kinetics/cellular/process/createCellularBlindDocument";
import { createBlockoutRollerBlindDocumentAsync } from "../kinetics/roller/process/createBlockoutRollerPDFDocument";
import { getRoomAndWindowMeasurement } from "../sharePoint/projectFileUtility";
import {
  getWindowBlindCountString,
  getWindowHeight,
  getWindowWidth,
} from "../sharePoint/windowMeasurementUtility";
import type { BlindType, ProductId } from "../../type/process/productType";
import { createSunscreenRollerBlindDocumentAsync } from "../kinetics/roller/process/createSunscreenPDFDocument";
import type { Worksheet } from "../../type/process/worksheetType";
import { writeWorksheetToSharePointAsync } from "./upload/writeWorksheetToSharePoint";

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

  const processGroupMappedToWindowSelectDetailedList =
    mapWindowSelectDetailedIntoProcessGroup(windowSelectDetailedList);

  const worksheetList = await createWorksheetAsync(
    processGroupMappedToWindowSelectDetailedList,
    projectFile,
  );

  await writeWorksheetToSharePointAsync(worksheetList);

  // probably want to write data here to SharePoint

  return worksheetList;
}

async function createWorksheetAsync(
  processGroupMappedToWindowSelectDetailedList: ProcessGroupToWindowSelectDetailed,
  projectFile: SharePointProjectFile,
): Promise<Worksheet[]> {
  const processGroupTasks = (
    Object.keys(processGroupMappedToWindowSelectDetailedList) as ProductId[]
  ).map(async (productId) => {
    const windowSelectDetailList =
      processGroupMappedToWindowSelectDetailedList[productId];

    if (windowSelectDetailList.length === 0) return [];
    const createWorksheetFunctionAsync =
      sharePointProductIdToProcessTypeRecord[productId];

    const createdWorksheet = await createWorksheetFunctionAsync(
      windowSelectDetailList,
      projectFile,
    );

    return createdWorksheet;
  });

  const worksheetList: Worksheet[][] = await Promise.all(processGroupTasks);

  return worksheetList.flat();
}

function mapWindowSelectDetailedIntoProcessGroup(
  windowSelectDetailedList: WindowSelectDetailed[],
): ProcessGroupToWindowSelectDetailed {
  const map: ProcessGroupToWindowSelectDetailed = {
    "cellular-blind": [],
    "sunscreen-roller": [],
    "blockout-roller": [],
  };

  Object.entries(map).forEach(([key, value]) => {
    const filteredList = windowSelectDetailedList.filter(
      (window) => window.treatment.productId === key,
    );
    value.push(...filteredList);
  });

  return map;
}

function getWindowSelectDetailedList(
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

export const sharePointProductIdToProcessTypeRecord: ProductIdMappedToCreateWorksheetFunction =
  {
    "cellular-blind": createCellularBlindDocumentAsync,
    "sunscreen-roller": createSunscreenRollerBlindDocumentAsync,
    "blockout-roller": createBlockoutRollerBlindDocumentAsync,
  };

//   "Kinetics Sunscreen Roller Blind"             → "Sunscreen Roller"
//   "Kinetics Blockout Roller Blind"              → "Blockout Roller"
//   "Kinetics Light Filtering Roller Blind"       → "Light Filter Roller"
//   "Kinetics 10mm Cellular Blind"                → "10mm Cellular"
//   "Kinetics 20mm Cellular Blind"                → "20mm Cellular"
//   "Kinetics Mikronwood 50mm Venetian"           → "Mikronwood 50mm Venetian"
//   "Lewis's 25mm Aluminium Venetian"             → "25mm Aluminium Venetian"
//   "Lewis's 50mm Phoenixwood Venetian"           → "50mm Phoenixwood Venetian"
//   "Santa Fe Normandy Shutter"                   → "Normandy Shutter"
//   "Santa Fe Waterproof Woodlore Plus Shutter"   → "Waterproof Woodlore Plus Shutter"

export function mapProcessNameToBlindType(
  processName: ProcessName,
): BlindType | undefined {
  switch (processName) {
    case "blockout-roller":
      return "Kinetics Blockout Roller Blind";
    case "light-filtering-roller":
      return "Kinetics Light Filtering Roller Blind";
    case "sunscreen-roller":
      return "Kinetics Sunscreen Roller Blind";
    case "cellular-blind":
      return "Kinetics 10mm Cellular Blind";
    default:
      return undefined;
  }
}
