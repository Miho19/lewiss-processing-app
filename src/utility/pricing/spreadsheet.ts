function excelRowStringToCommaSeperatedString(str: string) {
  return str
    .split(" ")
    .map((s) => s.trim().replace(/\t/g, ""))
    .join(",");
}
