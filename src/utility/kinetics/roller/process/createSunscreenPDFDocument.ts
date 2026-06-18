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

export async function createSunscreenRollerBlindDocumentAsync(
  windowSelectDetailedList: WindowSelectDetailed[],
  projectFile: SharePointProjectFile,
): Promise<Worksheet[]> {
  const kineticsRollerTableEntryList: KineticsRollerTableEntry[] =
    await generateKineticsRollerTableEntryListAsync(
      windowSelectDetailedList,
      projectFile,
    );

  if (kineticsRollerTableEntryList.length === 0) return [];

  const kineticsRollerWorksheetCost = await getWorksheetCostAsync(
    kineticsRollerTableEntryList,
    "sunscreen-roller",
  );

  const customerInformation: CustomerInformation = {
    name: projectFile.name,
    reference: projectFile.reference,
    salesConsultant: projectFile.salesConsultant,
  };

  const sunscreenDocument = await createRollerBlindDocumentAsync(
    "sunscreen-roller",
    customerInformation,
    kineticsRollerTableEntryList,
    kineticsRollerWorksheetCost,
  );

  if (typeof sunscreenDocument === "undefined") return [];

  const worksheet: Worksheet = {
    customer: customerInformation,
    processName: "sunscreen-roller",
    blindList: kineticsRollerTableEntryList,
    worksheetCost: kineticsRollerWorksheetCost,
    pdfList: [sunscreenDocument],
    projectFile: projectFile,
  };

  return [worksheet];
}
