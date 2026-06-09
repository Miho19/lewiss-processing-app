import { Link } from "@tanstack/react-router";
import type { SharePointFolderListItem } from "../../type/sharePoint/folder/folderType";
import { destructureProjectFileName } from "../../utility/sharePoint/folderUtility";
import {
  displayDate,
  isoUTCOffsetToNZDateTimeObject,
} from "../../utility/date/dateUtility";

type Props = {
  file: SharePointFolderListItem;
};
function ConsultantCardFileListElement(props: Props) {
  const { file } = props;
  const fileNameObject = destructureProjectFileName(file.name);
  if (typeof fileNameObject === "undefined") return <></>;

  return (
    <li className="flex flex-1 w-full flex-col p-3 shadow-md sm:rounded-lg hover:bg-gray-100 hover:-translate-y-3 cursor-pointer transition-all duration-100 ease-in-out group border border-black/15 space-y-1">
      <Link to="/project/$projectId" params={{ projectId: file.id }}>
        <div className="flex w-full justify-between border-b border-black/10 pb-3">
          <p className="text-lg">{fileNameObject.surname}</p>
          <p className="text-xs text-gray-500 italic">
            Last Modified: {isoUTCOffsetToNZDateTimeObject(file.lastModified)}
          </p>
        </div>

        <div className="flex justify-between pt-3">
          <p>Reference: {fileNameObject.reference}</p>
          <p>{displayDate(fileNameObject.date)}</p>
        </div>

        <div className="flex justify-end pt-3">
          <p className="text-xs text-gray-500">{file.id}</p>
        </div>
      </Link>
    </li>
  );
}

export default ConsultantCardFileListElement;
