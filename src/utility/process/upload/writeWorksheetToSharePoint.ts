import type { ProcessNameMappedToString } from "../../../type/process/processType";
import type { Worksheet } from "../../../type/process/worksheetType";
import { writeConfirmedPDFAsync } from "./writeConfirmedPDF";
import { writeHistoryFileAsync } from "./writeHistoryFile";

export async function writeWorksheetToSharePointAsync(
  worksheetList: Worksheet[],
) {
  const writeJobs = worksheetList.map(async (worksheet) => {
    const historyFileItemId: string = await writeHistoryFileAsync(worksheet);

    const pdfFileId: string = await writeConfirmedPDFAsync(worksheet);

    return { historyFileId: historyFileItemId, pdfFileId: pdfFileId };
  });

  const fileList = await Promise.all(writeJobs);

  return fileList;
}

function createOrderPDFName(worksheet: Worksheet): string {
  const manufacturer = manufacturerNameMap[worksheet.processName];
  const { reference } = worksheet.customer;
  return `${manufacturer}-${reference}-${worksheet.processName}.pdf`;
}

const manufacturerNameMap: ProcessNameMappedToString = {
  "cellular-blind": "Windoware",
  "sunscreen-roller": "Windoware",
  "blockout-roller": "Windoware",
  "light-filtering-roller": "Windoware",
};
