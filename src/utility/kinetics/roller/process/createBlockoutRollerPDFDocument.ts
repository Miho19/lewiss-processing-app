import type {
  KineticsRollerBlindTypeToWindowSelectDetailedList,
  ProcessName,
} from "../../../../type/process/processType";
import type { WindowSelectDetailed } from "../../../../type/process/windowSelectType";
import type { SharePointProjectFile } from "../../../../type/sharePoint/project/projectFileType";
import { createRollerBlindDocumentAsync } from "./createRollerPDFDocument";
import type {
  CustomerInformation,
  Worksheet,
} from "../../../../type/process/worksheetType";
import type { KineticsRollerTableEntry } from "../../../../type/process/tableEntry/kineticsTableEntryType";
import { generateKineticsRollerTableEntryListAsync } from "./createKineticsRollerTableEntry";
import { getWorksheetCostAsync } from "../../../process/tableEntryUtility";
import { isKineticsRollerSpec } from "../../../../type/sharePoint/project/spec/kineticsSpec";

function partitionWindowSelectDetailedByKineticRollerBlindType(
  windowSelectDetailedList: WindowSelectDetailed[],
) {
  const partitionMapping: KineticsRollerBlindTypeToWindowSelectDetailedList = {
    "Kinetics Blockout Roller Blind": [],
    "Kinetics Light Filtering Roller Blind": [],
    "Kinetics Sunscreen Roller Blind": [],
  };

  Object.entries(partitionMapping).forEach(([key, value]) => {
    const filteredList = windowSelectDetailedList.filter((w) => {
      const spec = w.treatment.spec;

      if (!isKineticsRollerSpec(spec)) return false;

      if (
        spec.blindType.localeCompare(key, undefined, {
          sensitivity: "base",
        }) === 0
      )
        return true;

      return false;
    });

    value.push(...filteredList);
  });

  return partitionMapping;
}

export async function createBlockoutRollerBlindDocumentAsync(
  windowSelectDetailedList: WindowSelectDetailed[],
  projectFile: SharePointProjectFile,
): Promise<Worksheet[]> {
  const worksheetList: Worksheet[] = [];

  const partitionedMapping =
    partitionWindowSelectDetailedByKineticRollerBlindType(
      windowSelectDetailedList,
    );

  const blockoutWindowSelectDetailedList =
    partitionedMapping["Kinetics Blockout Roller Blind"];

  const blockoutWorksheet = await createRollerPDFAsync(
    "blockout-roller",
    blockoutWindowSelectDetailedList,
    projectFile,
  );

  if (typeof blockoutWorksheet !== "undefined")
    worksheetList.push(blockoutWorksheet);

  const lightFilteringWindowSelectDetailedList =
    partitionedMapping["Kinetics Light Filtering Roller Blind"];

  const lightFilteringWorksheet = await createRollerPDFAsync(
    "light-filtering-roller",
    lightFilteringWindowSelectDetailedList,
    projectFile,
  );

  if (typeof lightFilteringWorksheet !== "undefined")
    worksheetList.push(lightFilteringWorksheet);

  return worksheetList;
}

// we can probably switch sunscreen roller to using this...
async function createRollerPDFAsync(
  processName: ProcessName,
  windowSelectDetailedList: WindowSelectDetailed[],
  projectFile: SharePointProjectFile,
): Promise<Worksheet | undefined> {
  if (windowSelectDetailedList.length === 0) return undefined;

  const customerInformation: CustomerInformation = {
    name: projectFile.name,
    reference: projectFile.reference,
    salesConsultant: projectFile.salesConsultant,
  };

  const kineticsRollerTableEntryList: KineticsRollerTableEntry[] =
    await generateKineticsRollerTableEntryListAsync(
      windowSelectDetailedList,
      projectFile,
    );

  if (kineticsRollerTableEntryList.length === 0) return undefined;

  const kineticsRollerWorksheetCost = await getWorksheetCostAsync(
    kineticsRollerTableEntryList,
    processName,
  );

  const pdfDocument = await createRollerBlindDocumentAsync(
    processName,
    customerInformation,
    kineticsRollerTableEntryList,
    kineticsRollerWorksheetCost,
  );

  if (typeof pdfDocument === "undefined") return undefined;

  const worksheet: Worksheet = {
    customer: customerInformation,
    processName: processName,
    blindList: kineticsRollerTableEntryList,
    worksheetCost: kineticsRollerWorksheetCost,
    pdfList: [pdfDocument],
    projectFile: projectFile,
  };

  return worksheet;
}
