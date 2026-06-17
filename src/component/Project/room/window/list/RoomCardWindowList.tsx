import type { CheckboxFormData } from "../../../../../page/ProjectPage";
import type { WindowSelect } from "../../../../../type/process/windowSelectType";
import type { Room } from "../../../../../type/sharePoint/project/projectFileType";

import RoomCardWindowListElement from "./RoomCardWindowListElement";

type Props = {
  room: Room;
  formData: WindowSelect[];
  onChangeHandlerCheckBox: (window: CheckboxFormData) => void;
};
function RoomCardWindowList(props: Props) {
  const { room } = props;
  const windows = room.windows;

  const roomCardWindowListElements = windows.map((windowMeasurement) => (
    <RoomCardWindowListElement
      key={windowMeasurement.id}
      windowMeasurement={windowMeasurement}
      {...props}
    />
  ));

  return (
    <ul className="flex flex-col space-y-6 w-full">
      {roomCardWindowListElements}
    </ul>
  );
}

export default RoomCardWindowList;
