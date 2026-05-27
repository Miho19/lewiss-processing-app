import type { ChangeEvent } from "react";
import type {
  onChangeHandlerProjectFormDataCheckboxParameterType,
  projectFormDataType,
} from "../../../../../page/ProjectPage";
import type { SharePointWindowType } from "../../../../../zod/sharePointProjectFile";
import RoomCardWindowMeasurementControl from "../common/RoomCardWindowMeasurementControl";
import { getWindowBlindCountString } from "../../../../../utility/processProject";

type Props = {
  window: SharePointWindowType;
  projectFormData: projectFormDataType;
  onChangeHandlerProjectFormDataCheckBox: (
    window: onChangeHandlerProjectFormDataCheckboxParameterType,
  ) => void;

  fit: "inside" | "outside";
};

function getMeasurementDisplayInside(window: SharePointWindowType) {
  const height = Math.max(window.internalHeightL, window.internalHeightR);
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
        {window.internalWidth}mm x {height}mm
      </p>
    );
  }

  if (blindCount === 2) {
    if (typeof window.blindLeftWidth === "undefined")
      return <p>Blind left width measurement missing</p>;
    const blindLeftWidth = parseInt(window.blindLeftWidth);

    return (
      <p className="text-sm flex space-x-3">
        <span>
          {blindLeftWidth}mm x {height}mm
        </span>
        <span>|</span>
        <span>
          {window.internalWidth - blindLeftWidth}mm x {height}mm
        </span>
      </p>
    );
  }

  return <p>Invalid blind count</p>;
}

function getMeasurementDisplayOutside(window: SharePointWindowType) {
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

function getMeasurementDisplay(
  window: SharePointWindowType,
  fit: "inside" | "outside",
) {
  switch (fit) {
    case "inside":
      return getMeasurementDisplayInside(window);
    case "outside":
      return getMeasurementDisplayOutside(window);
    default:
      return <p>Fit style is not valid</p>;
  }
}

function RoomCardWindowMeasurement(props: Props) {
  const {
    window,
    projectFormData,
    onChangeHandlerProjectFormDataCheckBox,
    fit,
  } = props;

  if (!projectFormData[window.id]) return <></>;

  function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    event.stopPropagation();
    onChangeHandlerProjectFormDataCheckBox({
      id: window.id,
      fit: fit,
      isChecked: event.target.checked,
    });
  }

  const htmlId = `${window.id} ${fit}`;

  return (
    <label
      htmlFor={htmlId}
      className="flex flex-col w-full space-y-1 border-b border-black/5 py-3 group hover:-translate-y-4 transition-all duration-100 ease-in-out cursor-pointer"
    >
      <p className="w-full text-end text-sm text-gray-500 italic">
        {getWindowBlindCountString(
          fit === "inside" ? window.blindCount : window.outsideBlindCount,
        )}
      </p>
      <div className="grid grid-cols-[50px_1fr] gap-x-4 gap-y-1 align-middle">
        <p className="text-sm text-gray-500">
          {fit.charAt(0).toUpperCase() + fit.slice(1)}
        </p>
        {getMeasurementDisplay(window, fit)}
        <RoomCardWindowMeasurementControl window={window} />
      </div>

      <input
        id={htmlId}
        type="checkbox"
        className="w-5 h-5 border border-black/25 rounded-full checked:bg-black cursor-pointer ml-auto accent-black"
        checked={
          projectFormData[window.id].selected &&
          projectFormData[window.id].fit === fit
        }
        onChange={onChangeHandler}
      />
    </label>
  );
}

export default RoomCardWindowMeasurement;
