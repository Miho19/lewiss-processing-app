import { useQuery } from "@tanstack/react-query";
import GETSharePointRootFolder from "../http/GETSharePointRootFolder";

function useSharePointRootFolderQuery() {
  return useQuery({
    queryKey: [`sharepoint root folder`],
    queryFn: () => GETSharePointRootFolder(),
  });
}

export default useSharePointRootFolderQuery;
