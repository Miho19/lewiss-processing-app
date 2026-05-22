import type { SharePointFolderItemListType } from "../zod/sharePointFolder";
import type { ConsultantsType } from "../zod/sharePointStaffList";

export type ConsultantTypeWithFolderId = {
  folderId: string;
} & ConsultantsType;

function consultantJoinToRootFolderFileList(
  consultants: ConsultantsType[],
  rootFolder: SharePointFolderItemListType[],
): ConsultantTypeWithFolderId[] {
  const joinedList: ConsultantTypeWithFolderId[] = [];

  rootFolder.forEach((file) => {
    if (!file.isFolder) return;
    if (!file.size) return;

    const consultant = consultants.find(
      (c) => c.name.toLocaleLowerCase() === file.name.toLocaleLowerCase(),
    );

    if (!consultant) return;
    if (consultant.functions.search(/consultant/i) === -1) return;

    joinedList.push({
      folderId: file.id,
      ...consultant,
    });
  });

  return [...joinedList];
}

export type JSONProjectFileNameType = {
  surname: string;
  reference: string;
  date: string;
};

function sharePointDestructureJSONProjectFileName(
  fileName: string,
): JSONProjectFileNameType | undefined {
  if (typeof fileName === "undefined" || !fileName) return undefined;
  const base = fileName.slice(0, -5);
  const m = base.match(/^([A-Za-z]+)-(\d{5,6})-(\d{8})$/);
  if (!m) return undefined;

  return {
    surname: m[1],
    reference: m[2],
    date: m[3],
  };
}

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
  consultantJoinToRootFolderFileList,
  sharePointDestructureJSONProjectFileName,
  sharePointFilterFolderItemListForJSONFiles,
  isoUTCOffsetToNZDateTimeObject,
  displayDate,
};
