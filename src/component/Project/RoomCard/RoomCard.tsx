import { useState } from "react";
import type { Room } from "../../../type/sharePoint/project/projectFileType";
import type { WindowSelect } from "../../../type/process/windowSelectType";
import type { CheckboxFormData } from "../../../page/ProjectPage";
import WindowMeasurementList from "./WindowMeasurement/WindowMeasurementList";
import CardHeader from "./CardHeader";

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
    <li
      className={`flex w-full flex-col shadow-md border border-slate-200/60 xl:w-5xl rounded-2xl p-6 bg-white ${isExpanded && `space-y-12`}`}
    >
      <CardHeader
        room={room}
        isExpanded={isExpanded}
        toggleExpanded={toggleExpanded}
      />

      <div
        className={`grid transition-all duration-200 ease-in-out ${isExpanded ? `grid-rows-[1fr] opacity-100 pointer-events-auto` : `grid-rows-[0fr] opacity-0 pointer-events-none`}`}
      >
        <div className="flex flex-col w-full h-full overflow-hidden space-y-6">
          <WindowMeasurementList {...props} />
        </div>
      </div>
    </li>
  );
}

export default RoomCard;
