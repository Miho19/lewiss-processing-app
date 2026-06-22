import type { CheckboxFormData } from "../../../../../page/ProjectPage";
import type { WindowSelect } from "../../../../../type/process/windowSelectType";
import type { Room } from "../../../../../type/sharePoint/project/projectFileType";

import RoomCardWindowListElement from "./RoomCardWindowListElement";

type Props = {
  room: Room;
  formData: WindowSelect[];
  onChangeHandlerCheckBox: (window: CheckboxFormData) => void;
};
function RoomCardWindowMeasurementList(props: Props) {
  const { room, formData, onChangeHandlerCheckBox } = props;
  const windows = room.windows;

  const roomCardWindowListElements = windows.map((windowMeasurement) => {
    return [
      <RoomCardWindowListElement
        key={`${windowMeasurement.id}-inside`}
        windowMeasurement={windowMeasurement}
        formData={formData}
        onChangeHandlerCheckBox={onChangeHandlerCheckBox}
        fit="inside"
      />,
      <RoomCardWindowListElement
        key={`${windowMeasurement.id}-outside`}
        windowMeasurement={windowMeasurement}
        formData={formData}
        onChangeHandlerCheckBox={onChangeHandlerCheckBox}
        fit="outside"
      />,
    ];
  });

  return (
    <ul className="flex flex-col space-y-6 w-full">
      {roomCardWindowListElements.flat()}
    </ul>
  );
}

export default RoomCardWindowMeasurementList;
