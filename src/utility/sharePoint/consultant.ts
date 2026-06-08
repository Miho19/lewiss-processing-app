import type { ConsultantFolder } from "../../type/sharePoint/consultant";
import type { SharePointFolderListItem } from "../../type/sharePoint/folderType";
import type { Consultant } from "../../type/sharePointStaffList";

export function getConsultantFolder(
  consultantList: Consultant[],
  sharePointRootFolderItemList: SharePointFolderListItem[],
): ConsultantFolder[] {
  const consultantFolderList = sharePointRootFolderItemList.map((file) => {
    if (!file.isFolder) return [];
    if (file.size <= 0) return [];

    const consultant = consultantList.find(
      (c) =>
        c.name.localeCompare(file.name, undefined, {
          sensitivity: "base",
        }) === 0,
    );

    if (!consultant) return [];
    if (consultant.functions.search(/consultant/i) === -1) return [];

    const consultantFolder: ConsultantFolder = {
      folderId: file.id,
      ...consultant,
    };

    return consultantFolder;
  });

  return consultantFolderList.flat();
}
