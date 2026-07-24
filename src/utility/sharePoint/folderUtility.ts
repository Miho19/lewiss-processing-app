import type { SharePointFolderListItem } from "../../type/sharePoint/folder/folderType";
import type { SharePointProjectFileName } from "../../type/sharePoint/project/projectFileType";

type SortByLastModifiedOptions = {
  ascending?: boolean;
};

const SortByLastModifiedOptionsDefault: Required<SortByLastModifiedOptions> = {
  ascending: false,
};

export function sortByLastModified(
  folderItemList: SharePointFolderListItem[],
  options?: SortByLastModifiedOptions,
) {
  const finalOptions = { ...SortByLastModifiedOptionsDefault, options };

  const sortedArray = folderItemList.toSorted((a, b) => {
    if (finalOptions.ascending) {
      return (
        new Date(a.lastModified).getTime() - new Date(b.lastModified).getTime()
      );
    }

    return (
      new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
    );
  });

  return sortedArray;
}

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
