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

export type GETSharePointJSONFileResponse = {
  ok: boolean;
  content: string;
};

export type POSTSharePointJSONFileResponse = {
  ok: boolean;
  filename: string;
  itemId: string;
  error: string;
  webUrl: string;
};
