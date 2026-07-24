import type { BlindType } from "../../../../type/process/productType";
import { isKineticsTableEntryList } from "../../../../type/process/tableEntry/kineticsTableEntryType";
import type { TableEntry } from "../../../../type/process/tableEntry/tableEntryType";
import type { AdditionalProduct } from "../../../../type/process/worksheetType";
import { getKineticsAccessoryProductListAsync } from "../../general/getAccessoryProductListAsync";
import { getMotorAdditionalProductListAsync } from "../../general/getMotorAdditionalProductListAsync";

export async function getKineticsMikronwoodAdditionalProductListAsync(
  tableEntryList: TableEntry[],
  blindType: BlindType,
): Promise<AdditionalProduct[]> {
  if (!isKineticsTableEntryList(tableEntryList)) return [];

  const motorAdditionalProductList: AdditionalProduct[] =
    await getMotorAdditionalProductListAsync(tableEntryList, blindType);

  if (motorAdditionalProductList.length === 0) return [];

  const accessoryProductList: AdditionalProduct[] =
    await getKineticsAccessoryProductListAsync(tableEntryList, blindType);

  return [...motorAdditionalProductList, ...accessoryProductList];
}
