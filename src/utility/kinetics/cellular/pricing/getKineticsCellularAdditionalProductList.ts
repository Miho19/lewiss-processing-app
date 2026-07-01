import type { BlindType } from "../../../../type/process/productType";
import type { TableEntry } from "../../../../type/process/tableEntry/tableEntryType";
import { getKineticsAccessoryProductListAsync } from "../../general/getAccessoryProductListAsync";
import { getMotorAdditionalProductListAsync } from "../../general/getMotorAdditionalProductListAsync";

// note that blindtype is going to be 10mm cellular regardless whether it is 10 or 20mm
export async function getKineticsCellularAdditionalProductListAsync(
  tableEntryList: TableEntry[],
  blindType: BlindType,
) {
  const motorAdditionalProductList = await getMotorAdditionalProductListAsync(
    tableEntryList,
    blindType,
  );

  const accessoryAdditionalProductList =
    await getKineticsAccessoryProductListAsync(tableEntryList, blindType);

  return [...motorAdditionalProductList, ...accessoryAdditionalProductList];
}

export async function getAccessoryProductListAsync() {}
