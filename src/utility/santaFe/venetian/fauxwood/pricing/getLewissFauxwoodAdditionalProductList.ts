import type { BlindType } from "../../../../../type/process/productType";
import type { TableEntry } from "../../../../../type/process/tableEntry/tableEntryType";
import type { AdditionalProduct } from "../../../../../type/process/worksheetType";

export async function getLewissFauxwoodAdditionalProductListAsync(
  _tableEntryList: TableEntry[],
  _blindType: BlindType,
): Promise<AdditionalProduct[]> {
  return [];
}
