import type { BlindType } from "../../../../../type/process/productType";
import type { WindowSelectDetailed } from "../../../../../type/process/windowSelectType";
import type {
  CustomerInformation,
  Worksheet,
} from "../../../../../type/process/worksheetType";
import type { SharePointProjectFile } from "../../../../../type/sharePoint/project/projectFileType";
import { getWorksheetCostAsync } from "../../../../process/tableEntryUtility";
import { createLewissAluminiumPDFAsync } from "./createLewissAluminiumPDF";
import { generateLewissAluminiumTableEntryListAsync } from "./lewissAluminiumTableEntry";

export async function createLewissAluminiumWorksheetAsync(
  blindType: BlindType,
  windowSelectDetailedList: WindowSelectDetailed[],
  projectFile: SharePointProjectFile,
): Promise<Worksheet[]> {
  const customerInformation: CustomerInformation = {
    name: projectFile.name,
    reference: projectFile.reference,
    salesConsultant: projectFile.salesConsultant,
  };

  const entryList = await generateLewissAluminiumTableEntryListAsync(
    windowSelectDetailedList,
    projectFile,
  );
  if (entryList.length === 0) return [];

  const worksheetCost = await getWorksheetCostAsync(entryList, blindType);

  const pdf = await createLewissAluminiumPDFAsync(
    customerInformation,
    entryList,
    worksheetCost,
    blindType,
  );

  if (typeof pdf === "undefined") return [];

  const worksheet: Worksheet = {
    customer: customerInformation,
    blindType: blindType,
    blindList: entryList,
    worksheetCost: worksheetCost,
    pdfList: [pdf],
  };

  return [worksheet];
}
