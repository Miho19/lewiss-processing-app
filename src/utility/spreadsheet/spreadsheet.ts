function excelRowStringToCommaSeperatedString(str: string) {
  if (!str || str.length === 0) return "";
  return "[" + str.trim().replace(/\t/g, ",") + "],";
}

function excelTableStringToStringArray(strArray: string[]) {
  let result: string = "";

  strArray.forEach((str) => {
    result += excelRowStringToCommaSeperatedString(str);
  });

  return result;
}

export { excelTableStringToStringArray };
