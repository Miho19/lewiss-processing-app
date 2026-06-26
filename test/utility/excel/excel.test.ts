import { it } from "vitest";
import {
  excelRowStringToCommaSeperatedString,
  excelTableStringToStringArray,
} from "../../../src/utility/excel/excel";

it("just works", () => {
  const strArr = [
    "600	700	800	900	1000	1100	1200	1300	1400	1500	1600	1700	1800	1900	2000	2100	2200	2300	2400	2500	2600	2700	2800	2890",
  ];

  const result = excelTableStringToStringArray(strArr);
  console.log(result);
});

it.skip("seperate pelmets", () => {
  const str = `46.33
     57.91 
     69.49 
     81.07 
     92.66 
     104.24 
     115.82 
     127.40 
     138.98 
     150.56 
     162.15 
     173.73 
     185.31 
     196.89 
     208.47 
     220.06 
     231.64 
     243.22 
     254.80`;

  const result = excelRowStringToCommaSeperatedString(str);
  console.log(result);
});
