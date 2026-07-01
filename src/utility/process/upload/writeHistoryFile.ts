import { queryClient } from "../../../http/queryClient";
import { POSTSharePointHistoryFile } from "../../../http/sharePoint/POSTSharePointHistoryFile";
import type { Worksheet } from "../../../type/process/worksheetType";
import { MutationObserver } from "@tanstack/react-query";
import { blindTypeFileTag } from "./writeOrderPDF";

export async function writeHistoryFileAsync(
  worksheet: Worksheet,
): Promise<string | undefined> {
  const fileName = getFileName(worksheet);
  return await writeFile(worksheet, fileName);
}

function getFileName(worksheet: Worksheet): string {
  const { name, reference, salesConsultant } = worksheet.customer;
  const salesConsultantCode = getConsultantCode(salesConsultant);
  const tag = blindTypeFileTag[worksheet.blindType];
  return `${salesConsultantCode} ${name}-${reference} ${tag}.json`;
}

function getConsultantCode(consultant: string): string {
  let [first, last] = consultant.split(" ");
  first = first.charAt(0).toUpperCase().trim();
  last = last.charAt(0).toUpperCase().trim();

  return `${first}${last}`;
}

async function writeFile(
  worksheet: Worksheet,
  fileName: string,
): Promise<string | undefined> {
  try {
    if (typeof fileName === "undefined") return undefined;
    if (!fileName.endsWith(".json")) return undefined;

    const observer = getObserver();
    const blindType = worksheet.blindType;
    const data = JSON.stringify(worksheet, null, 2);

    const result = await observer.mutate({
      blindType: blindType,
      fileName: fileName,
      data: data,
    });

    return result.webUrl;
  } catch {
    return undefined;
  }
}

function getObserver() {
  return new MutationObserver(queryClient, {
    mutationFn: POSTSharePointHistoryFile,
  });
}
