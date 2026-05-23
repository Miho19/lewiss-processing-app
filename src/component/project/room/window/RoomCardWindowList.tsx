import type { SharePointRoomType } from "../../../../zod/sharePointProjectFile";
import RoomCardWindowListElement from "./RoomCardWindowListElement";

type Props = {
  room: SharePointRoomType;
};
function RoomCardWindowList(props: Props) {
  const { room } = props;
  const windows = room.windows;

  const roomCardWindowListElements = windows.map((window) => (
    <RoomCardWindowListElement key={window.id} window={window} />
  ));

  return (
    <ul className="flex flex-col space-y-6 w-full">
      {roomCardWindowListElements}
    </ul>
  );
}

export default RoomCardWindowList;
