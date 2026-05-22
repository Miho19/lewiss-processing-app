import { useState } from "react";
import type { SharePointRoomType } from "../../../zod/sharePointProjectFile";
import RoomCardHeader from "./RoomCardHeader";

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
    </li>
  );
}

export default RoomCard;
