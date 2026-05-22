import { useState } from "react";
import type { ConsultantTypeWithFolderId } from "../../utility/sharePoint";
import ConsultantCardHeader from "./ConsultantCardHeader";
import ConsultantCardFileList from "./ConsultantCardFileList";

type Props = {
  consultant: ConsultantTypeWithFolderId;
};

function ConsultantCard(props: Props) {
  const { consultant } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  function toggleFileListDisplay() {
    setIsExpanded((prev) => !prev);
  }

  return (
    <li className="flex w-full flex-col space-y-3 shadow-md p-6 border border-black/15 pb-6">
      <ConsultantCardHeader
        consultant={consultant}
        toggleFileList={toggleFileListDisplay}
        isExpanded={isExpanded}
      />
      <ConsultantCardFileList consultant={consultant} isExpanded={isExpanded} />
    </li>
  );
}

export default ConsultantCard;
