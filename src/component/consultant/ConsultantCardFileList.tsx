import useSharePointFolderQuery from "../../hook/useSharePointFolderQuery";
import {
  sharePointFilterFolderItemListForJSONFiles,
  type ConsultantTypeWithFolderId,
} from "../../utility/sharePoint";
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

  if (isLoading) return <div className={errorStyleClassNames}>Loading...</div>;
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
      className={`flex w-full overflow-hidden transition-all duration-200 ease-in-out ${isExpanded ? `max-h-125` : `max-h-0`}`}
    >
      <ul className="flex w-full flex-col space-y-6 overflow-y-scroll p-6">
        {fileListElements}
      </ul>
    </section>
  );
}

export default ConsultantCardFileList;

//https://flyonui.com/docs/components/collapse/
