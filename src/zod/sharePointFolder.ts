type SharePointFolderItemListType = {
  id: string;
  isFile: boolean;
  isFolder: boolean;
  lastModified: string;
  name: string;
  size: number;
};

type GETSharePointFolderResponseType = {
  ok: boolean;
  children: SharePointFolderItemListType[];
};

export type { SharePointFolderItemListType, GETSharePointFolderResponseType };
