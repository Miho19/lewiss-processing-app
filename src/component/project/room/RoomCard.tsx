import { useState } from "react";
import type { SharePointRoomType } from "../../../zod/sharePointProjectFile";
import RoomCardHeader from "./RoomCardHeader";
import RoomCardTreatment from "./treatment/RoomCardTreatment";
import RoomCardWindowList from "./window/RoomCardWindowList";

type Props = {
  room: SharePointRoomType;
};

function RoomCard(props: Props) {
  const { room } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  function toggleExpanded() {
    setIsExpanded((prev) => !prev);
  }

  return (
    <li className="flex w-full flex-col space-y-3 shadow-md p-6 border border-black/15 pb-6">
      <RoomCardHeader
        room={room}
        isExpanded={isExpanded}
        toggleExpanded={toggleExpanded}
      />
      <div
        className={`flex flex-col space-y-3 w-full overflow-hidden transition-all duration-200 ease-in-out ${isExpanded ? `max-h-125` : `max-h-0`}`}
      >
        <RoomCardWindowList room={room} />
        <RoomCardTreatment room={room} />
      </div>
    </li>
  );
}

export default RoomCard;
