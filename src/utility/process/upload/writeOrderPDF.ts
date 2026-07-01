import { queryClient } from "../../../http/queryClient";
import { POSTSharePointOrderPDF } from "../../../http/sharePoint/POSTSharePointOrderPDF";
import type { BlindTypeMappedToString } from "../../../type/process/processType";
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
  const manufacturer = manufacturerNameMap[worksheet.blindType];
  const tag = blindTypeFileTag[worksheet.blindType];
  const { reference } = worksheet.customer;
  return `${manufacturer}-${reference}-${tag}.pdf`;
}

export const blindTypeFileTag: BlindTypeMappedToString = {
  "Kinetics Sunscreen Roller Blind": "roller-ss",
  "Kinetics Blockout Roller Blind": "roller-bo",
  "Kinetics Light Filtering Roller Blind": "roller-lf",
  "Kinetics 10mm Cellular Blind": "cellular-10",
  "Kinetics 20mm Cellular Blind": "cellular-20",
  "Kinetics Mikronwood 50mm Venetian": "mikronwood-50",
  "Lewis's 25mm Aluminium Venetian": "aluminium-25",
  "Lewis's 50mm Aluminium Venetian": "aluminium-50",
  "Lewis's 50mm Fauxwood Venetian": "fauxwood-50",
  "Lewis's 63mm Fauxwood Venetian": "fauxwood-63",
  "Lewis's 50mm Phoenixwood Venetian": "pheonixwood-50",
  "Lewis's 63mm Phoenixwood Venetian": "pheonixwood-63",
};

const manufacturerNameMap: BlindTypeMappedToString = {
  "Kinetics Sunscreen Roller Blind": "Windoware",
  "Kinetics Blockout Roller Blind": "Windoware",
  "Kinetics Light Filtering Roller Blind": "Windoware",
  "Kinetics 10mm Cellular Blind": "Windoware",
  "Kinetics 20mm Cellular Blind": "Windoware",
  "Kinetics Mikronwood 50mm Venetian": "Windoware",
  "Lewis's 25mm Aluminium Venetian": "",
  "Lewis's 50mm Aluminium Venetian": "",
  "Lewis's 50mm Fauxwood Venetian": "",
  "Lewis's 63mm Fauxwood Venetian": "",
  "Lewis's 50mm Phoenixwood Venetian": "",
  "Lewis's 63mm Phoenixwood Venetian": "",
};

async function writeFile(
  worksheet: Worksheet,
  fileName: string,
): Promise<string | undefined> {
  try {
    if (typeof fileName === "undefined") return undefined;
    if (!fileName.endsWith(".pdf")) return undefined;

    const observer = getObserver();
    const blindType = worksheet.blindType;

    const fileBase64 = await getPDFasBase64(worksheet);
    const result = await observer.mutate({
      blindType: blindType,
      fileName: fileName,
      fileBase64: fileBase64,
    });
    return result.webUrl;
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
