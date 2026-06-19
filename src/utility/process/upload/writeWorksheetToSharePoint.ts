import type { Worksheet } from "../../../type/process/worksheetType";
import { writeOrderPDFAsync } from "./writeOrderPDF";
import { writeHistoryFileAsync } from "./writeHistoryFile";

export async function writeWorksheetToSharePointAsync(
  worksheetList: Worksheet[],
) {
  const writeJobs = worksheetList.map(async (worksheet) => {
    let historyFileId = await writeHistoryFileAsync(worksheet);
    if (typeof historyFileId === "undefined") historyFileId = "Error";

    let pdfFileId = await writeOrderPDFAsync(worksheet);
    if (typeof pdfFileId === "undefined") pdfFileId = "Error";

    return { historyFileId: historyFileId, pdfFileId: pdfFileId };
  });

  const fileList = await Promise.all(writeJobs);

  return fileList;
}
