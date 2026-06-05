import { it } from "vitest";
import { excelTableStringToStringArray } from "../../../../src/utility/spreadsheet/spreadsheet";

it("just works", () => {
  const strArr = [
    "240	1000	1250	1500	1750	2000	2250	2500	2750	3000	3250	3500	3750	4000	4250	4500	4750	5000",
  ];

  const result = excelTableStringToStringArray(strArr);
  console.log(result);
});
