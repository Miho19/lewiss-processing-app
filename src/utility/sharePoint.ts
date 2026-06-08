import type { ConsultantsType } from "../type/sharePointStaffList";
import type { JSONProjectFileNameType } from "./sharePoint/type";

function sharePointFilterFolderItemListForJSONFiles(
  fileList: SharePointFolderItemListType[],
): SharePointFolderItemListType[] {
  const filteredList = fileList.filter((file) => {
    if (!file.isFile) return false;
    if (!file.name.toLowerCase().endsWith(".json")) return false;
    const fileNameObject = sharePointDestructureJSONProjectFileName(file.name);
    if (typeof fileNameObject === "undefined") return false;
    return true;
  });

  return [...filteredList];
}

function isoUTCOffsetToNZDateTimeObject(dateString: string): string {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("en-NZ", {
    timeZone: "Pacific/Auckland",
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);
}

function displayDate(date: string) {
  const year = date.substring(0, 4);
  const month = date.substring(4, 6);
  const day = date.substring(6, 8);

  return `${day}/${month}/${year}`;
}

export {
  sharePointDestructureJSONProjectFileName,
  sharePointFilterFolderItemListForJSONFiles,
  isoUTCOffsetToNZDateTimeObject,
  displayDate,
};
