import type { BlindType } from "../../../../../type/process/productType";
import type { TableEntry } from "../../../../../type/process/tableEntry/tableEntryType";
import type { AdditionalProduct } from "../../../../../type/process/worksheetType";

// Current lewiss 25/50 aluminium does not have any additional products...
export async function getLewissAluminiumAdditionalProductListAsync(
  tableEntryList: TableEntry[],
  blindType: BlindType,
): Promise<AdditionalProduct[]> {
  return [];
}
