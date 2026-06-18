import type { Worksheet } from "../../type/process/worksheetType";

export async function writeWorksheetToSharePointAsync(
  worksheetList: Worksheet[],
) {
  const writeJobs = worksheetList.map(async (worksheet) => {
    const fileName = createFileName(worksheet);
    console.log(fileName);
  });

  await Promise.all(writeJobs);
}

function createFileName(worksheet: Worksheet): string {
  const { name, reference, salesConsultant } = worksheet.customer;
  const salesConsultantCode = saleConsultantNameToCode(salesConsultant);
  return `${salesConsultantCode} ${name}-${reference} ${worksheet.processName}`;
}

function saleConsultantNameToCode(consultant: string): string {
  let [first, last] = consultant.split(" ");
  first = first.charAt(0).toUpperCase().trim();
  last = last.charAt(0).toUpperCase().trim();

  return `${first}${last}`;
}
