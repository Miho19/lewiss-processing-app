import useSharePointFolderQuery from "../../hook/useSharePointFolderQuery";
import type { ConsultantFolder } from "../../type/sharePoint/consultant/consultantType";
import {
  filterFolderItemList,
  sortByLastModified,
} from "../../utility/sharePoint/folderUtility";
import Loading from "../Loading/Loading";
import ConsultantCardFileListElement from "./ConsultantCardFileListElement";

type Props = {
  consultant: ConsultantFolder;
  isExpanded: boolean;
};

function ConsultantCardFileList(props: Props) {
  const { consultant, isExpanded } = props;

  const {
    data: fileList,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useSharePointFolderQuery(consultant.folderId);

  const errorStyleClassNames = "flex flex-1 justify-center items-center";

  if (isLoading)
    return (
      <div className="flex w-full h-4 justify-center items-center">
        <Loading />
      </div>
    );
  if (isError)
    return <div className={errorStyleClassNames}>error: {error.message}</div>;
  if (!isSuccess)
    return (
      <div className={errorStyleClassNames}>
        Failed to fetch consultant folder
      </div>
    );

  const filteredFiles = filterFolderItemList(fileList);
  const sortedFiles = sortByLastModified(filteredFiles);

  const fileListElements = sortedFiles.map((file) => (
    <ConsultantCardFileListElement file={file} key={file.id} />
  ));

  return (
    <section
      className={`grid transition-all duration-300 ease-in-out ${isExpanded ? `grid-rows-[1fr] opacity-100 pointer-events-auto` : `grid-rows-[0fr] opacity-0 pointer-events-none`}`}
    >
      <ul
        className={`flex w-full flex-col space-y-12 overflow-hidden ${isExpanded && `pt-3`}`}
      >
        {fileListElements}
      </ul>
    </section>
  );
}

export default ConsultantCardFileList;
