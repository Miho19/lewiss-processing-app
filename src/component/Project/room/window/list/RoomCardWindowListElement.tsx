import type { CheckboxFormData } from "../../../../../page/ProjectPage";
import type { WindowSelect } from "../../../../../type/process/windowSelectType";
import type { WindowMeasurement } from "../../../../../type/sharePoint/project/windowMeasurement/windowMeasurementType";

import RoomCardWindowMeasurementExtra from "../common/RoomCardWindowMeasurementsExtra";
import RoomCardWindowMeasurement from "../measurement/RoomCardWindowMeasurement";

type Props = {
  windowMeasurement: WindowMeasurement;
  formData: WindowSelect[];
  onChangeHandlerCheckBox: (window: CheckboxFormData) => void;
};

function RoomCardWindowListElement(props: Props) {
  const { windowMeasurement } = props;

  return (
    <li className="flex flex-col w-full pb-6 border border-black/15 shadow-md space-y-3 p-3">
      <div className="flex w-full justify-between border-b border-black/5 pb-3">
        <p className="text-md">{window.name}</p>
        <p className="text-xs text-gray-500 italic">{windowMeasurement.id}</p>
      </div>

      <RoomCardWindowMeasurement {...props} fit="inside" />
      <RoomCardWindowMeasurement {...props} fit="outside" />

      <RoomCardWindowMeasurementExtra windowMeasurement={windowMeasurement} />
    </li>
  );
}

export default RoomCardWindowListElement;
