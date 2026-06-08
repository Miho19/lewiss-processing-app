export type SharePointFolderListItem = {
  id: string;
  isFile: boolean;
  isFolder: boolean;
  lastModified: string;
  name: string;
  size: number;
};

export type GETSharePointFolderResponse = {
  ok: boolean;
  children: SharePointFolderListItem[];
};
