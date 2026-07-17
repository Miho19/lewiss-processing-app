import type { BlindType } from "../../../../../type/process/productType";
import type { WindowSelectDetailed } from "../../../../../type/process/windowSelectType";
import type {
  CustomerInformation,
  Worksheet,
} from "../../../../../type/process/worksheetType";
import type { SharePointProjectFile } from "../../../../../type/sharePoint/project/projectFileType";
import { getWorksheetCostAsync } from "../../../../process/tableEntryUtility";
import { generateLewissPhoenixwoodTableEntryListAsync } from "./lewissPhoenixwoodTableEntry";

export async function createLewissPhoenixwoodWorksheetAsyncblindType(
  blindType: BlindType,
  windowSelectDetailedList: WindowSelectDetailed[],
  projectFile: SharePointProjectFile,
): Promise<Worksheet[]> {
  const customerInformation: CustomerInformation = {
    name: projectFile.name,
    reference: projectFile.reference,
    salesConsultant: projectFile.salesConsultant,
  };

  const entryList = await generateLewissPhoenixwoodTableEntryListAsync(
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
    projectFile: projectFile,
  };

  return [worksheet];
}
