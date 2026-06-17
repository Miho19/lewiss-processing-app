import type { ChangeEvent } from "react";
import type { CheckboxFormData } from "../../../../../page/ProjectPage";

import RoomCardWindowMeasurementControl from "../common/RoomCardWindowMeasurementControl";
import type { WindowMeasurement } from "../../../../../type/sharePoint/project/windowMeasurement/windowMeasurementType";
import type {
  Fit,
  WindowSelect,
} from "../../../../../type/process/windowSelectType";
import {
  getWindowBlindCountString,
  getWindowHeight,
  getWindowWidth,
} from "../../../../../utility/sharePoint/windowMeasurementUtility";

type Props = {
  windowMeasurement: WindowMeasurement;
  formData: WindowSelect[];
  onChangeHandlerCheckBox: (window: CheckboxFormData) => void;

  fit: Fit;
};

function getMeasurementDisplayInside(window: WindowMeasurement) {
  const height = getWindowHeight(window, "inside");
  const widthArray = getWindowWidth(window, "inside");

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
        {widthArray[0]}mm x {height}mm
      </p>
    );
  }

  if (blindCount === 2) {
    const [blindLeftWidth, blindRightWidth] = widthArray;
    return (
      <p className="text-sm flex space-x-3">
        <span>
          {blindLeftWidth}mm x {height}mm
        </span>
        <span>|</span>
        <span>
          {blindRightWidth}mm x {height}mm
        </span>
      </p>
    );
  }

  return <p>Invalid blind count</p>;
}

function getMeasurementDisplayOutside(window: WindowMeasurement) {
  const height = getWindowHeight(window, "outside");
  const widthArray = getWindowWidth(window, "outside");

  const blindCount = window.outsideBlindCount;

  if (
    (typeof blindCount === "string" &&
      (blindCount as string).localeCompare("dual", undefined, {
        sensitivity: "base",
      }) === 0) ||
    blindCount === 1
  ) {
    return (
      <p className="text-sm">
        {widthArray[0]}mm x {height}mm
      </p>
    );
  }

  if (blindCount === 2) {
    const [outsideBlindLeft, outsideBlindRight] = widthArray;

    return (
      <p className="text-sm flex space-x-3">
        <span>
          {outsideBlindLeft}mm x {height}mm
        </span>
        <span>|</span>
        <span>
          {outsideBlindRight}mm x {height}mm
        </span>
      </p>
    );
  }

  return <p>Invalid blind count</p>;
}

function getMeasurementDisplay(window: WindowMeasurement, fit: Fit) {
  switch (fit) {
    case "inside":
      return getMeasurementDisplayInside(window);
    case "outside":
      return getMeasurementDisplayOutside(window);
    default:
      return <p>Fit style is not valid</p>;
  }
}

function isAbleToDisplayMeasurement(
  window: WindowMeasurement,
  fit: Fit,
): boolean {
  const widthArray = getWindowWidth(window, fit);

  if (widthArray.length === 0) return false;
  if (widthArray[0] === 0) return false;

  const height = getWindowHeight(window, fit);
  if (height === 0) return false;

  // probably should check blindcount string here

  return true;
}

function RoomCardWindowMeasurement(props: Props) {
  const { windowMeasurement, formData, onChangeHandlerCheckBox, fit } = props;

  const windowSelect = formData.find(
    (w) => w.windowId === windowMeasurement.id && w.fit === fit,
  );
  if (typeof windowSelect === "undefined") return <></>;

  if (!isAbleToDisplayMeasurement(windowMeasurement, fit)) return <></>;

  function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    event.stopPropagation();
    onChangeHandlerCheckBox({
      windowId: windowMeasurement.id,
      fit: fit,
      isChecked: event.target.checked,
    });
  }

  const htmlId = `${windowMeasurement.id} ${fit}`;

  return (
    <label
      htmlFor={htmlId}
      className="flex flex-col w-full space-y-1 border-b border-black/5 py-3 group hover:-translate-y-4 transition-all duration-100 ease-in-out cursor-pointer"
    >
      <p className="w-full text-end text-sm text-gray-500 italic">
        {getWindowBlindCountString(
          fit === "inside"
            ? windowMeasurement.blindCount
            : windowMeasurement.outsideBlindCount,
        )}
      </p>
      <div className="grid grid-cols-[50px_1fr] gap-x-4 gap-y-1 align-middle">
        <p className="text-sm text-gray-500">
          {fit.charAt(0).toUpperCase() + fit.slice(1)}
        </p>
        {getMeasurementDisplay(windowMeasurement, fit)}
        <RoomCardWindowMeasurementControl
          windowMeasurement={windowMeasurement}
        />
      </div>

      <input
        id={htmlId}
        type="checkbox"
        className="w-5 h-5 border border-black/25 rounded-full checked:bg-black cursor-pointer ml-auto accent-black"
        checked={windowSelect.selected}
        onChange={onChangeHandler}
      />
    </label>
  );
}

export default RoomCardWindowMeasurement;
