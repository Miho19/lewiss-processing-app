import type { CheckboxFormData } from "../../../../page/ProjectPage";
import type { WindowSelect } from "../../../../type/process/windowSelectType";
import type { Room } from "../../../../type/sharePoint/project/projectFileType";
import WindowMeasurementListElement from "./WindowMeasurementListElement";

type Props = {
  room: Room;
  formData: WindowSelect[];
  onChangeHandlerCheckBox: (window: CheckboxFormData) => void;
};
function WindowMeasurementList(props: Props) {
  const { room, formData, onChangeHandlerCheckBox } = props;
  const { windows, treatment } = room;

  const roomCardWindowListElements = windows.map((windowMeasurement) => {
    return [
      <WindowMeasurementListElement
        key={`${windowMeasurement.id}-inside`}
        windowMeasurement={windowMeasurement}
        formData={formData}
        onChangeHandlerCheckBox={onChangeHandlerCheckBox}
        fit="inside"
        treatment={treatment}
      />,
      <WindowMeasurementListElement
        key={`${windowMeasurement.id}-outside`}
        windowMeasurement={windowMeasurement}
        formData={formData}
        onChangeHandlerCheckBox={onChangeHandlerCheckBox}
        fit="outside"
        treatment={treatment}
      />,
    ];
  });

  return (
    <ul className="flex flex-col space-y-6 w-full">
      {roomCardWindowListElements.flat()}
    </ul>
  );
}

export default WindowMeasurementList;
