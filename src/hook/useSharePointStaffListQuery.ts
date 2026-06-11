import { useQuery } from "@tanstack/react-query";
import { GETSharePointStaffList } from "../http/sharePoint";

function useSharePointStaffListQuery() {
  return useQuery({
    queryKey: [`staff list`],
    queryFn: () => GETSharePointStaffList(),
  });
}

export default useSharePointStaffListQuery;
