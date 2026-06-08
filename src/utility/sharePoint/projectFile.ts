import type { SharePointFolderListItem } from "../../type/sharePoint/folderType";

export function filterFolderItemList(
  folderItemList: SharePointFolderListItem[],
): SharePointFolderListItem[] {
  const filteredList = folderItemList.filter((file) => {
    if (!file.isFile) return false;
    if (!isfileJSON(file)) return false;
  });

  return filteredList;
}

function isfileJSON(file: SharePointFolderListItem) {
  return file.name.toLocaleLowerCase().endsWith(".json");
}

export function destructureProjectFileName(
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
