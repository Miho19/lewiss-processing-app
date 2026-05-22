import useSharePointStaffListQuery from "../hook/useSharePointStaffListQuery";

function HomePage() {
  const {
    data: staffList,
    isSuccess: isSuccessStaffList,
    isLoading: isLoadingStaffList,
    isError: isErrorStaffList,
    error: errorStaffList,
  } = useSharePointStaffListQuery();

  const {
    data: rootFolder,
    isSuccess: isSuccessRootFolder,
    isLoading: isLoadingRootFolder,
    isError: isErrorRootFolder,
    error: errorRootFolder,
  } = useSharePointRootFolderQuery();

  if (isLoadingStaffList) return <div>Loading...</div>;
  if (isErrorStaffList) return <div>error: {errorStaffList.message}</div>;
  if (!isSuccessStaffList) return <div>Failed to query for staff list</div>;

  if (isLoadingRootFolder) return <div>Loading...</div>;
  if (isErrorRootFolder) return <div>error: {errorRootFolder.message}</div>;
  if (!isSuccessRootFolder) return <div>Failed to query the root folder</div>;

  const consultantList = consultantListJoinWithRootFolderList(
    staffList.consultants,
    rootFolder,
  );

  const consultantCards = consultantList.map((c) => (
    <ConsultantCardContainer consultant={c} key={c.folderId} />
  ));

  return <main className="grow p-6 container mx-auto"></main>;
}

export default HomePage;
