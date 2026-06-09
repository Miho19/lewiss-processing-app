import type { TDocumentDefinitions } from "pdfmake/interfaces";
import type { KineticsRollerBlindTypeToWindowSelectDetailedList } from "../../../../type/process/processType";
import type { WindowSelectDetailed } from "../../../../type/process/windowSelectType";
import type { SharePointProjectFile } from "../../../../type/sharePoint/project/projectFileType";
import { createRollerBlindDocumentAsync } from "./createRollerPDFDocument";

function partitionWindowSelectDetailedByKineticRollerBlindType(
  windowSelectDetailedList: WindowSelectDetailed[],
) {
  const partitionMapping: KineticsRollerBlindTypeToWindowSelectDetailedList = {
    "Kinetics Blockout Roller Blind": [],
    "Kinetics Light Filtering Roller Blind": [],
    "Kinetics Sunscreen Roller Blind": [],
  };

  Object.entries(partitionMapping).forEach(([key, value]) => {
    const filteredList = windowSelectDetailedList.filter(
      (w) =>
        w.treatment.spec.blindType.localeCompare(key, undefined, {
          sensitivity: "base",
        }) === 0,
    );

    value.push(...filteredList);
  });

  return partitionMapping;
}

export async function createBlockoutRollerBlindDocumentAsync(
  windowSelectDetailedList: WindowSelectDetailed[],
  projectFile: SharePointProjectFile,
): Promise<TDocumentDefinitions[]> {
  const documentOutput = [];

  const partitionedMapping =
    partitionWindowSelectDetailedByKineticRollerBlindType(
      windowSelectDetailedList,
    );

  const blockoutWindowSelectDetailedList =
    partitionedMapping["Kinetics Blockout Roller Blind"];

  if (blockoutWindowSelectDetailedList.length > 0) {
    const blockoutDocument = await _createBlockoutRollerDocumentAsync(
      blockoutWindowSelectDetailedList,
      projectFile,
    );

    if (typeof blockoutDocument !== "undefined")
      documentOutput.push(...blockoutDocument);
  }

  const lightFilteringWindowSelectDetailedList =
    partitionedMapping["Kinetics Light Filtering Roller Blind"];

  if (lightFilteringWindowSelectDetailedList.length > 0) {
    const lightfilteringDocument =
      await _createLightFilteringRollerDocumentAsync(
        lightFilteringWindowSelectDetailedList,
        projectFile,
      );
    if (typeof lightfilteringDocument !== "undefined")
      documentOutput.push(...lightfilteringDocument);
  }

  return documentOutput;
}

async function _createBlockoutRollerDocumentAsync(
  windowSelectDetailedList: WindowSelectDetailed[],
  projectFile: SharePointProjectFile,
): Promise<TDocumentDefinitions[]> {
  const blockoutDocument = await createRollerBlindDocumentAsync(
    windowSelectDetailedList,
    "blockout-roller",
    projectFile,
  );
  if (typeof blockoutDocument === "undefined") return [];

  return [blockoutDocument];
}
async function _createLightFilteringRollerDocumentAsync(
  windowSelectDetailedList: WindowSelectDetailed[],
  projectFile: SharePointProjectFile,
) {
  const lightFilteringDocument = await createRollerBlindDocumentAsync(
    windowSelectDetailedList,
    "light-filtering-roller",
    projectFile,
  );
  if (typeof lightFilteringDocument === "undefined") return [];

  return [lightFilteringDocument];
}
