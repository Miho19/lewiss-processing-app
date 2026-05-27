import type {
  onChangeHandlerProjectFormDataCheckboxParameterType,
  projectFormDataType,
} from "../../../../../page/ProjectPage";
import type { SharePointWindowType } from "../../../../../zod/sharePointProjectFile";
import RoomCardWindowMeasurementExtra from "../common/RoomCardWindowMeasurementsExtra";
import RoomCardWindowInsideMeasurement from "../inside/RoomCardWindowInsideMeasurement";
import RoomCardWindowOutsideMeasurement from "../outside/RoomCardWindowOutsideMeasurement";

type Props = {
  window: SharePointWindowType;
  projectFormData: projectFormDataType;
  onChangeHandlerProjectFormDataCheckBox: (
    window: onChangeHandlerProjectFormDataCheckboxParameterType,
  ) => void;
};

// can make this dry by passing in fit for measurement...

function RoomCardWindowListElement(props: Props) {
  const { window } = props;

  return (
    <li className="flex flex-col w-full pb-6 border border-black/15 shadow-md space-y-3 p-3">
      <div className="flex w-full justify-between border-b border-black/5 pb-3">
        <p className="text-md">{window.name}</p>
        <p className="text-xs text-gray-500 italic">{window.id}</p>
      </div>

      <RoomCardWindowInsideMeasurement {...props} />
      <RoomCardWindowOutsideMeasurement {...props} />

      <RoomCardWindowMeasurementExtra window={window} />
    </li>
  );
}

export default RoomCardWindowListElement;
