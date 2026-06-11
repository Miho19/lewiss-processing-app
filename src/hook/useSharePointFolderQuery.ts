import { useQuery } from "@tanstack/react-query";
import { GETSharePointFolder } from "../http/sharePoint";

function useSharePointFolderQuery(folderId: string) {
  return useQuery({
    queryKey: [`folder ${folderId}`],
    queryFn: () => GETSharePointFolder(folderId),
    enabled: typeof folderId !== "undefined",
  });
}

export default useSharePointFolderQuery;
