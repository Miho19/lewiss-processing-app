import type { WindowSelectDetailed } from "../../../../type/process/windowSelectType";
import type { SharePointProjectFile } from "../../../../type/sharePoint/project/projectFileType";
import type {
  CustomerInformation,
  Worksheet,
} from "../../../../type/process/worksheetType";
import type { KineticsMikronwoodTableEntry } from "../../../../type/process/tableEntry/kineticsTableEntryType";
import { generateKineticsMikroonTableEntryListAsync } from "./kineticsMikronwoodTableEntry";
import { getWorksheetCostAsync } from "../../../process/tableEntryUtility";

import type { BlindType } from "../../../../type/process/productType";

export async function createKineticsMikronwoodWorksheetAsync(
  blindType: BlindType,
  windowSelectDetailedList: WindowSelectDetailed[],
  projectFile: SharePointProjectFile,
): Promise<Worksheet[]> {
  const customerInformation: CustomerInformation = {
    name: projectFile.name,
    reference: projectFile.reference,
    salesConsultant: projectFile.salesConsultant,
  };

  const entryList: KineticsMikronwoodTableEntry[] =
    await generateKineticsMikroonTableEntryListAsync(
      windowSelectDetailedList,
      projectFile,
    );

  if (entryList.length === 0) return [];

  const worksheetCost = await getWorksheetCostAsync(entryList, blindType);

  const worksheet: Worksheet = {
    customer: customerInformation,
    blindType: blindType,
    blindList: entryList,
    worksheetCost: worksheetCost,
  };

  return [worksheet];
}
