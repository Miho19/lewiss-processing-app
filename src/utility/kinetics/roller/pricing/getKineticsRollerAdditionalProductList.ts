import type { BlindType } from "../../../../type/process/productType";
import type { TableEntry } from "../../../../type/process/tableEntry/tableEntryType";
import type { AdditionalProduct } from "../../../../type/process/worksheetType";
import { getKineticsAccessoryProductListAsync } from "../../general/getAccessoryProductListAsync";
import { getMotorAdditionalProductListAsync } from "../../general/getMotorAdditionalProductListAsync";

export async function getKineticsRollerAdditionalProductListAsync(
  tableEntryList: TableEntry[],
  blindType: BlindType,
): Promise<AdditionalProduct[]> {
  const motorAdditionalProductList: AdditionalProduct[] =
    await getMotorAdditionalProductListAsync(tableEntryList, blindType);

  if (motorAdditionalProductList.length === 0) return [];

  const accessoryProductList: AdditionalProduct[] =
    await getKineticsAccessoryProductListAsync(tableEntryList, blindType);

  return [...motorAdditionalProductList, ...accessoryProductList];
}
