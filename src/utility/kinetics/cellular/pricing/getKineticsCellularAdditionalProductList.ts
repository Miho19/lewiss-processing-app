import type { BlindType } from "../../../../type/process/productType";
import { isKineticsCellularTableEntryList } from "../../../../type/process/tableEntry/kineticsTableEntryType";
import type { TableEntry } from "../../../../type/process/tableEntry/tableEntryType";
import { getKineticsAccessoryProductListAsync } from "../../general/getAccessoryProductListAsync";
import { getMotorAdditionalProductListAsync } from "../../general/getMotorAdditionalProductListAsync";

export async function getKineticsCellularAdditionalProductListAsync(
  tableEntryList: TableEntry[],
  blindType: BlindType,
) {
  if (!isKineticsCellularTableEntryList(tableEntryList)) return [];

  const motorAdditionalProductList = await getMotorAdditionalProductListAsync(
    tableEntryList,
    blindType,
  );

  const accessoryAdditionalProductList =
    await getKineticsAccessoryProductListAsync(tableEntryList, blindType);

  return [...motorAdditionalProductList, ...accessoryAdditionalProductList];
}
