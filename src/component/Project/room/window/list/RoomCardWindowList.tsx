import type {
  onChangeHandlerProjectFormDataCheckboxParameterType,
  projectFormDataType,
} from "../../../../../page/ProjectPage";
import type { Room } from "../../../../../type/sharePoint/project/projectFileType";

import RoomCardWindowListElement from "./RoomCardWindowListElement";

type Props = {
  room: Room;
  projectFormData: projectFormDataType;
  onChangeHandlerProjectFormDataCheckBox: (
    window: onChangeHandlerProjectFormDataCheckboxParameterType,
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
