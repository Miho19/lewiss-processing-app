import type { SharePointFolderListItem } from "../../type/sharePoint/folder/folderType";
import type { SharePointProjectFileName } from "../../type/sharePoint/project/projectFileType";

export function filterFolderItemList(
  folderItemList: SharePointFolderListItem[],
): SharePointFolderListItem[] {
  const filteredList = folderItemList.filter((file) => {
    if (!file.isFile) return false;
    if (!isfileJSON(file)) return false;
    const fileNameObject = destructureProjectFileName(file.name);
    if (typeof fileNameObject === "undefined") return false;

    return true;
  });

  return filteredList;
}

function isfileJSON(file: SharePointFolderListItem) {
  return file.name.toLocaleLowerCase().endsWith(".json");
}

export function destructureProjectFileName(
  fileName: string,
): SharePointProjectFileName | undefined {
  if (!fileName || typeof fileName === "undefined") return undefined;
  const base = fileName.slice(0, -5);
  const m = base.match(/^([A-Za-z]+)-(\d{5,6})-(\d{8})$/);
  if (!m) return undefined;

  return {
    surname: m[1],
    reference: m[2],
    date: m[3],
  };
}
