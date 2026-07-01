import type { WindowSelectDetailed } from "../../../../type/process/windowSelectType";
import type { SharePointProjectFile } from "../../../../type/sharePoint/project/projectFileType";
import type {
  CustomerInformation,
  Worksheet,
} from "../../../../type/process/worksheetType";
import type { KineticsMikronwoodTableEntry } from "../../../../type/process/tableEntry/kineticsTableEntryType";
import { generateKineticsMikroonTableEntryListAsync } from "./kineticsMikronwoodTableEntry";
import { getWorksheetCostAsync } from "../../../process/tableEntryUtility";

export async function createMikronwoodDocumentAsync(
  windowSelectDetailedList: WindowSelectDetailed[],
  projectFile: SharePointProjectFile,
): Promise<Worksheet | undefined> {
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

  if (entryList.length === 0) return undefined;

  // what happens when we have other venetians...
  const worksheetCost = await getWorksheetCostAsync(
    entryList,
    "venetian-blind",
  );

  // todo
  const pdf = await createMikronwoodPDF();
  if (typeof pdf === "undefined") return undefined;

  const worksheet: Worksheet = {
    customer: customerInformation,
    processName: "venetian-blind",
    blindList: entryList,
    worksheetCost: worksheetCost,
    pdfList: [pdf],
  };

  return worksheet;
}

async function createMikronwoodPDF() {}
