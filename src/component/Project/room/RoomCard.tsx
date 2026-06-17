import { useState } from "react";

import RoomCardHeader from "./RoomCardHeader";
import RoomCardTreatment from "./treatment/RoomCardTreatment";
import RoomCardWindowList from "./window/list/RoomCardWindowList";

import type { Room } from "../../../type/sharePoint/project/projectFileType";
import type { WindowSelect } from "../../../type/process/windowSelectType";
import type { CheckboxFormData } from "../../../page/ProjectPage";

type Props = {
  room: Room;
  formData: WindowSelect[];
  onChangeHandlerCheckBox: (window: CheckboxFormData) => void;
};

function RoomCard(props: Props) {
  const { room } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  function toggleExpanded() {
    setIsExpanded((prev) => !prev);
  }

  return (
    <li className="flex flex-col space-y-6 shadow-md p-6 border border-black/15 pb-6">
      <RoomCardHeader
        room={room}
        isExpanded={isExpanded}
        toggleExpanded={toggleExpanded}
      />

      <div
        className={`grid transition-all duration-200 ease-in-out ${isExpanded ? `grid-rows-[1fr] opacity-100 pointer-events-auto` : `grid-rows-[0fr] opacity-0 pointer-events-none`}`}
      >
        <div className="flex flex-col w-full h-full overflow-hidden space-y-6">
          <RoomCardWindowList {...props} />
          <RoomCardTreatment room={room} />
        </div>
      </div>
    </li>
  );
}

export default RoomCard;
