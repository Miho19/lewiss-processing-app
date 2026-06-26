import type { VenetianBlindTypeToWindowSelectDetailed } from "../../type/process/processType";
import type { WindowSelectDetailed } from "../../type/process/windowSelectType";
import type {
  CustomerInformation,
  Worksheet,
} from "../../type/process/worksheetType";
import type { SharePointProjectFile } from "../../type/sharePoint/project/projectFileType";
import { isVenetianSpec } from "../../type/sharePoint/project/spec/venetianSpec";

export async function createVenetianBlindDocumentAsync(
  windowSelectDetailedList: WindowSelectDetailed[],
  projectFile: SharePointProjectFile,
): Promise<Worksheet[]> {
  // split windowselect --> createPDF func --> create worksheet

  const partitionedWindowSelectDetailedList =
    partitionVenetianWindowSelectDetailed(windowSelectDetailedList);

  const customerInformation: CustomerInformation = {
    name: projectFile.name,
    reference: projectFile.reference,
    salesConsultant: projectFile.salesConsultant,
  };

  return [];
}

export function partitionVenetianWindowSelectDetailed(
  windowSelectDetailedList: WindowSelectDetailed[],
): VenetianBlindTypeToWindowSelectDetailed {
  const partitionMapping: VenetianBlindTypeToWindowSelectDetailed = {
    "Kinetics Mikronwood 50mm Venetian": [],
    "Lewis's 25mm Aluminium Venetian": [],
    "Lewis's 50mm Aluminium Venetian": [],
    "Lewis's 50mm Fauxwood Venetian": [],
    "Lewis's 63mm Fauxwood Venetian": [],
    "Lewis's 50mm Phoenixwood Venetian": [],
    "Lewis's 63mm Phoenixwood Venetian": [],
  };

  Object.entries(partitionMapping).forEach(([key, value]) => {
    const filteredList = windowSelectDetailedList.filter((w) => {
      const spec = w.treatment.spec;

      if (!isVenetianSpec(spec)) return false;

      const { baseType } = spec;
      if (typeof baseType === "undefined") return false;

      if (baseType.localeCompare(key, undefined, { sensitivity: "base" }) === 0)
        return true;

      return false;
    });

    value.push(...filteredList);
  });

  return partitionMapping;
}
