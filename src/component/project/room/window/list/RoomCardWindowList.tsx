import type { projectFormDataType } from "../../../../../page/ProjectPage";
import type { SharePointRoomType } from "../../../../../zod/sharePointProjectFile";
import RoomCardWindowListElement from "./RoomCardWindowListElement";

type Props = {
  room: SharePointRoomType;
  projectFormData: projectFormDataType;
  toggleProjectFormDataCheckBox: (
    id: string,
    fit: "inside" | "outside",
  ) => void;
};
function RoomCardWindowList(props: Props) {
  const { room } = props;
  const windows = room.windows;

  const roomCardWindowListElements = windows.map((window) => (
    <RoomCardWindowListElement key={window.id} window={window} {...props} />
  ));

  return (
    <ul className="flex flex-col space-y-6 w-full">
      {roomCardWindowListElements}
    </ul>
  );
}

export default RoomCardWindowList;
