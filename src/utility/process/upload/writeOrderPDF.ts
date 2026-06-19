import { queryClient } from "../../../http/queryClient";
import { POSTSharePointOrderPDF } from "../../../http/sharePoint/POSTSharePointOrderPDF";
import type { ProcessNameMappedToString } from "../../../type/process/processType";
import type { Worksheet } from "../../../type/process/worksheetType";
import { MutationObserver } from "@tanstack/react-query";

import { getPDFDocumentAsync } from "../../pdfmake/documentUtility";

export async function writeOrderPDFAsync(
  worksheet: Worksheet,
): Promise<string | undefined> {
  const fileName = getFileName(worksheet);
  return await writeFile(worksheet, fileName);
}

function getFileName(worksheet: Worksheet): string {
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

async function writeFile(
  worksheet: Worksheet,
  fileName: string,
): Promise<string | undefined> {
  try {
    if (typeof fileName === "undefined") return undefined;
    if (!fileName.endsWith(".pdf")) return undefined;

    const observer = getObserver();
    const processName = worksheet.processName;

    const fileBase64 = await getPDFasBase64(worksheet);

    return await observer.mutate({
      processName: processName,
      fileName: fileName,
      fileBase64: fileBase64,
    });
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

function getObserver() {
  return new MutationObserver(queryClient, {
    mutationFn: POSTSharePointOrderPDF,
  });
}

async function getPDFasBase64(worksheet: Worksheet) {
  const pdf = worksheet.pdfList[0];

  const pdfDocument = await getPDFDocumentAsync(pdf);

  return await pdfDocument.getBase64();
}
