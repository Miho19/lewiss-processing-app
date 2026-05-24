import useSharePointFolderQuery from "../../hook/useSharePointFolderQuery";
import {
  sharePointFilterFolderItemListForJSONFiles,
  type ConsultantTypeWithFolderId,
} from "../../utility/sharePoint";
import Loading from "../loading/Loading";
import ConsultantCardFileListElement from "./ConsultantCardFileListElement";

type Props = {
  consultant: ConsultantTypeWithFolderId;
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

  if (isLoading) return <Loading />;
  if (isError)
    return <div className={errorStyleClassNames}>error: {error.message}</div>;
  if (!isSuccess)
    return (
      <div className={errorStyleClassNames}>
        Failed to fetch consultant folder
      </div>
    );

  const filteredForJSONProjectFilesList =
    sharePointFilterFolderItemListForJSONFiles(fileList);

  const fileListElements = filteredForJSONProjectFilesList.map((file) => (
    <ConsultantCardFileListElement file={file} key={file.id} />
  ));

  return (
    <section
      className={`grid transition-all duration-200 ease-in-out ${isExpanded ? `grid-rows-[1fr] opacity-100 pointer-events-auto` : `grid-rows-[0fr] opacity-0 pointer-events-none`}`}
    >
      <ul className="flex w-full flex-col space-y-6 p-6 overflow-hidden">
        {fileListElements}
      </ul>
    </section>
  );
}

export default ConsultantCardFileList;

//https://flyonui.com/docs/components/collapse/
