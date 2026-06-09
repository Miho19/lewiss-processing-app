import type { ProductIdToCreatePDFDocumentFunction } from "../../type/process/processType";
import type {
  WindowSelect,
  WindowSelectDetailed,
} from "../../type/process/windowSelectType";
import type { SharePointProjectFile } from "../../type/sharePoint/project/projectFileType";
import createCellularBlindDocument from "../kinetics/cellular/createCellularPDFDocument";
import {
  createBlockoutRollerBlindDocument,
  createSunscreenRollerBlindDocument,
} from "../kinetics/roller/createRollerPDFDocument";
import { getRoomAndWindowMeasurement } from "../sharePoint/projectFileUtility";
import {
  getWindowBlindCountString,
  getWindowHeight,
  getWindowWidth,
} from "../sharePoint/windowMeasurementUtility";

export function processWindowsSelectedAsync(
  windowList: WindowSelect[],
  projectFile: SharePointProjectFile,
) {
  return [];
}

export function getWindowSelectDetailedList(
  projectFile: SharePointProjectFile,
  windowSelectList: WindowSelect[],
): WindowSelectDetailed[] {
  const joinedList = windowSelectList.map((window) => {
    const [projectRoom, projectWindow] = getRoomAndWindowMeasurement(
      projectFile,
      window.roomId,
      window.id,
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
      windowId: window.id,
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

export const sharePointProductIdToProcessTypeRecord: ProductIdToCreatePDFDocumentFunction =
  {
    "cellular-blind": createCellularBlindDocument,
    "sunscreen-roller": createSunscreenRollerBlindDocument,
    "blockout-roller": createBlockoutRollerBlindDocument,
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
