import type { WindowSelectDetailed } from "../../../../type/process/windowSelectType";
import type { SharePointProjectFile } from "../../../../type/sharePoint/project/projectFileType";
import type { KineticsCellularTableEntry } from "../../../../type/process/tableEntry/kineticsTableEntryType";
import { generateKineticsCellularTableEntryListAsync } from "./kineticsCellularTableEntry";
import { getWorksheetCostAsync } from "../../../process/tableEntryUtility";
import type {
  CustomerInformation,
  Worksheet,
} from "../../../../type/process/worksheetType";
import type { BlindType } from "../../../../type/process/productType";

export async function createKineticsCellularDocumentAsync(
  blindType: BlindType,
  windowSelectDetailedList: WindowSelectDetailed[],
  projectFile: SharePointProjectFile,
): Promise<Worksheet[]> {
  const kineticsCellularEntryList: KineticsCellularTableEntry[] =
    await generateKineticsCellularTableEntryListAsync(
      windowSelectDetailedList,
      projectFile,
    );

  if (kineticsCellularEntryList.length === 0) return [];

  const kineticsCellularWorksheetCost = await getWorksheetCostAsync(
    kineticsCellularEntryList,
    blindType,
  );

  const customerInformation: CustomerInformation = {
    name: projectFile.name,
    reference: projectFile.reference,
    salesConsultant: projectFile.salesConsultant,
  };

  const worksheet: Worksheet = {
    customer: customerInformation,
    blindType: blindType,
    blindList: kineticsCellularEntryList,
    worksheetCost: kineticsCellularWorksheetCost,
    projectFile: projectFile,
  };

  return [worksheet];
}
