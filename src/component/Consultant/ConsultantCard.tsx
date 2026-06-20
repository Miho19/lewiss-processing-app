import { useState } from "react";
import ConsultantCardHeader from "./ConsultantCardHeader";
import ConsultantCardFileList from "./ConsultantCardFileList";
import type { ConsultantFolder } from "../../type/sharePoint/consultant/consultantType";

type Props = {
  consultant: ConsultantFolder;
};

function ConsultantCard(props: Props) {
  const { consultant } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  function toggleFileListDisplay() {
    setIsExpanded((prev) => !prev);
  }

  return (
    <li
      className={`flex w-full flex-col shadow-md border border-slate-200/60 xl:w-3xl rounded-2xl p-6 bg-white ${isExpanded && `space-y-12 pb-12`}`}
    >
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
