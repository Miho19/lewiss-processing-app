import type {
  onChangeHandlerProjectFormDataCheckboxParameterType,
  projectFormDataType,
} from "../../../../../page/ProjectPage";
import type { WindowMeasurement } from "../../../../../type/sharePoint/project/windowMeasurement/windowMeasurementType";

import RoomCardWindowMeasurementExtra from "../common/RoomCardWindowMeasurementsExtra";
import RoomCardWindowMeasurement from "../measurement/RoomCardWindowMeasurement";

type Props = {
  window: WindowMeasurement;
  projectFormData: projectFormDataType;
  onChangeHandlerProjectFormDataCheckBox: (
    window: onChangeHandlerProjectFormDataCheckboxParameterType,
  ) => void;
};

function RoomCardWindowListElement(props: Props) {
  const { window } = props;

  return (
    <li className="flex flex-col w-full pb-6 border border-black/15 shadow-md space-y-3 p-3">
      <div className="flex w-full justify-between border-b border-black/5 pb-3">
        <p className="text-md">{window.name}</p>
        <p className="text-xs text-gray-500 italic">{window.id}</p>
      </div>

      <RoomCardWindowMeasurement {...props} fit="inside" />
      <RoomCardWindowMeasurement {...props} fit="outside" />

      <RoomCardWindowMeasurementExtra window={window} />
    </li>
  );
}

export default RoomCardWindowListElement;
