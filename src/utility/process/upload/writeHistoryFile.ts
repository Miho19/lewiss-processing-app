import type { Worksheet } from "../../../type/process/worksheetType";

export async function writeHistoryFileAsync(
  worksheet: Worksheet,
): Promise<string> {
  const fileName = createHstioryFileName(worksheet);

  return "";
}

function createHstioryFileName(worksheet: Worksheet): string {
  const { name, reference, salesConsultant } = worksheet.customer;
  const salesConsultantCode = saleConsultantNameToCode(salesConsultant);
  return `${salesConsultantCode} ${name}-${reference} ${worksheet.processName}.json`;
}

function saleConsultantNameToCode(consultant: string): string {
  let [first, last] = consultant.split(" ");
  first = first.charAt(0).toUpperCase().trim();
  last = last.charAt(0).toUpperCase().trim();

  return `${first}${last}`;
}
