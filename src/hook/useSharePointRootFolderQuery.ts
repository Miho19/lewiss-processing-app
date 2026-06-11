import { useQuery } from "@tanstack/react-query";
import { GETSharePointRootFolder } from "../http/sharePoint";

function useSharePointRootFolderQuery() {
  return useQuery({
    queryKey: [`sharepoint root folder`],
    queryFn: () => GETSharePointRootFolder(),
  });
}

export default useSharePointRootFolderQuery;
