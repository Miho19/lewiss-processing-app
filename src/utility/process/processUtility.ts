import type { ProductIdToCreatePDFDocumentFunction } from "../../type/process/processType";
import createCellularBlindDocument from "../kinetics/cellular/createCellularPDFDocument";
import {
  createBlockoutRollerBlindDocument,
  createSunscreenRollerBlindDocument,
} from "../kinetics/roller/createRollerPDFDocument";

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
