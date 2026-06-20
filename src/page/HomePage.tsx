import ConsultantCard from "../component/Consultant/ConsultantCard";
import Loading from "../component/Loading/Loading";
import useSharePointRootFolderQuery from "../hook/useSharePointRootFolderQuery";
import useSharePointStaffListQuery from "../hook/useSharePointStaffListQuery";
import { getConsultantFolder } from "../utility/sharePoint/consultant";

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

  const errorStyleClassName = "flex items-center justify-center flex-1";

  if (isLoadingStaffList) return <Loading />;
  if (isErrorStaffList)
    return (
      <div className={errorStyleClassName}>error: {errorStaffList.message}</div>
    );
  if (!isSuccessStaffList)
    return (
      <div className={errorStyleClassName}>Failed to query for staff list</div>
    );

  if (isLoadingRootFolder) return <Loading />;
  if (isErrorRootFolder)
    return (
      <div className={errorStyleClassName}>
        error: {errorRootFolder.message}
      </div>
    );
  if (!isSuccessRootFolder)
    return (
      <div className={errorStyleClassName}>Failed to query the root folder</div>
    );

  const consultantList = getConsultantFolder(staffList.consultants, rootFolder);

  const consultantCards = consultantList.map((c) => (
    <ConsultantCard consultant={c} key={c.folderId} />
  ));

  return (
    <main className="flex-1 p-6 pt-30">
      <ul className="flex flex-col w-full items-center justify-center space-y-12">
        {consultantCards}
      </ul>
    </main>
  );
}

export default HomePage;
