import type { ChangeEvent } from "react";
import type {
  onChangeHandlerProjectFormDataCheckboxParameterType,
  projectFormDataType,
} from "../../../../../page/ProjectPage";
import { getWindowBlindCountString } from "../../../../../utility/roomCardMeasurement";
import type { SharePointWindowType } from "../../../../../zod/sharePointProjectFile";
import RoomCardWindowMeasurementControl from "../common/RoomCardWindowMeasurementControl";

type Props = {
  window: SharePointWindowType;
  projectFormData: projectFormDataType;
  onChangeHandlerProjectFormDataCheckBox: (
    window: onChangeHandlerProjectFormDataCheckboxParameterType,
  ) => void;
};

// note, copy of function in inside variant of this, we can make this DRY later
function getInsideMeasurementDisplay(window: SharePointWindowType) {
  if (
    typeof window.blindLeft === "undefined" ||
    typeof window.blindRight === "undefined" ||
    typeof window.blindAbove === "undefined" ||
    typeof window.blindUnderhang === "undefined" ||
    typeof window.outsideBlindLeftWidth === "undefined"
  ) {
    return <></>;
  }

  const height =
    Math.max(window.internalHeightL, window.internalHeightR) +
    window.blindAbove +
    window.blindUnderhang;

  const width = window.internalWidth + window.blindLeft + window.blindRight;

  const blindCount = window.blindCount;

  if (
    (typeof blindCount === "string" &&
      (blindCount as string).localeCompare("dual", undefined, {
        sensitivity: "base",
      }) === 0) ||
    blindCount === 1
  ) {
    return (
      <p className="text-sm">
        {width}mm x {height}mm
      </p>
    );
  }

  if (blindCount === 2) {
    let outsideBlindLeftWidth;

    try {
      outsideBlindLeftWidth = parseInt(window.outsideBlindLeftWidth);
    } catch (error) {
      return <>Invalid outside blind left width</>;
    }

    return (
      <p className="text-sm flex space-x-3">
        <span>
          {outsideBlindLeftWidth}mm x {height}mm
        </span>
        <span>|</span>
        <span>
          {width - outsideBlindLeftWidth}mm x {height}mm
        </span>
      </p>
    );
  }

  return <p>Invalid blind count</p>;
}

function RoomCardWindowOutsideMeasurement(props: Props) {
  const { window, projectFormData, onChangeHandlerProjectFormDataCheckBox } =
    props;

  if (!projectFormData[window.id]) return <></>;

  function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    event.stopPropagation();
    onChangeHandlerProjectFormDataCheckBox({
      id: window.id,
      fit: "outside",
      isChecked: event.target.checked,
    });
  }

  return (
    <div className="flex flex-col w-full space-y-1 border-b border-black/5 pb-3">
      <p className="w-full text-end text-sm text-gray-500 italic">
        {getWindowBlindCountString(window.blindCount)}
      </p>
      <div className="grid grid-cols-[50px_1fr] gap-x-4 gap-y-1 align-middle">
        <p className="text-sm text-gray-500">Outside</p>
        {getInsideMeasurementDisplay(window)}
        <RoomCardWindowMeasurementControl window={window} />
      </div>

      <label>
        <input
          id={window.id}
          type="checkbox"
          className="w-5 h-5 border border-black/25 rounded-full checked:bg-black cursor-pointer"
          checked={
            projectFormData[window.id].selected &&
            projectFormData[window.id].fit === "outside"
          }
          onChange={onChangeHandler}
        />
      </label>
    </div>
  );
}

export default RoomCardWindowOutsideMeasurement;
