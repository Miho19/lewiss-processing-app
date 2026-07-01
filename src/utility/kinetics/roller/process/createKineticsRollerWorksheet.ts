import type { WindowSelectDetailed } from "../../../../type/process/windowSelectType";
import type { SharePointProjectFile } from "../../../../type/sharePoint/project/projectFileType";
import type {
  CustomerInformation,
  Worksheet,
} from "../../../../type/process/worksheetType";
import type { KineticsRollerTableEntry } from "../../../../type/process/tableEntry/kineticsTableEntryType";
import { generateKineticsRollerTableEntryListAsync } from "./createKineticsRollerTableEntry";
import { getWorksheetCostAsync } from "../../../process/tableEntryUtility";
import type { BlindType } from "../../../../type/process/productType";
import { createKineticsRollerPDFAsync } from "./createKineticsRollerPDF";

export async function createKineticsRollerWorksheetAsync(
  blindType: BlindType,
  windowSelectDetailedList: WindowSelectDetailed[],
  projectFile: SharePointProjectFile,
): Promise<Worksheet[]> {
  if (windowSelectDetailedList.length === 0) return [];

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

  if (kineticsRollerTableEntryList.length === 0) return [];

  const kineticsRollerWorksheetCost = await getWorksheetCostAsync(
    kineticsRollerTableEntryList,
    blindType,
  );

  const pdfDocument = await createKineticsRollerPDFAsync(
    blindType,
    customerInformation,
    kineticsRollerTableEntryList,
    kineticsRollerWorksheetCost,
  );

  if (typeof pdfDocument === "undefined") return [];

  const worksheet: Worksheet = {
    customer: customerInformation,
    blindType: blindType,
    blindList: kineticsRollerTableEntryList,
    worksheetCost: kineticsRollerWorksheetCost,
    pdfList: [pdfDocument],
    projectFile: projectFile,
  };

  return [worksheet];
}
