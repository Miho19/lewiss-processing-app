import { useQuery } from "@tanstack/react-query";
import { GETSharePointProjectFile } from "../http/sharePoint";

function useSharePointProjectFileQuery(fileId: string) {
  return useQuery({
    queryKey: [`file: ${fileId}`],
    queryFn: () => GETSharePointProjectFile(fileId),
    enabled: typeof fileId !== "undefined",
  });
}

export default useSharePointProjectFileQuery;
