import { queryClient } from "../../../http/queryClient";
import { POSTSharePointHistoryFile } from "../../../http/sharePoint/POSTSharePointHistoryFile";
import type { Worksheet } from "../../../type/process/worksheetType";
import { MutationObserver } from "@tanstack/react-query";

export async function writeHistoryFileAsync(
  worksheet: Worksheet,
): Promise<string | undefined> {
  const fileName = getFileName(worksheet);
  return await writeFile(worksheet, fileName);
}

function getFileName(worksheet: Worksheet): string {
  const { name, reference, salesConsultant } = worksheet.customer;
  const salesConsultantCode = getConsultantCode(salesConsultant);
  return `${salesConsultantCode} ${name}-${reference} ${worksheet.processName}.json`;
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
    const processName = worksheet.processName;
    const data = JSON.stringify(worksheet, null, 2);

    return await observer.mutate({
      processName: processName,
      fileName: fileName,
      data: data,
    });
  } catch {
    return undefined;
  }
}

function getObserver() {
  return new MutationObserver(queryClient, {
    mutationFn: POSTSharePointHistoryFile,
  });
}
