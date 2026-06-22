import type { ChangeEvent } from "react";
import type { CheckboxFormData } from "../../../../../page/ProjectPage";
import type {
  Fit,
  WindowSelect,
} from "../../../../../type/process/windowSelectType";
import type { WindowMeasurement } from "../../../../../type/sharePoint/project/windowMeasurement/windowMeasurementType";

import RoomCardWindowMeasurement from "../measurement/RoomCardWindowMeasurement";
import {
  getWindowHeight,
  getWindowWidth,
} from "../../../../../utility/sharePoint/windowMeasurementUtility";

type Props = {
  fit: Fit;
  windowMeasurement: WindowMeasurement;
  formData: WindowSelect[];
  onChangeHandlerCheckBox: (window: CheckboxFormData) => void;
};

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

function RoomCardWindowListElement(props: Props) {
  const { windowMeasurement, fit, formData, onChangeHandlerCheckBox } = props;

  if (!isAbleToDisplayMeasurement(windowMeasurement, fit)) return <></>;

  const windowSelect = formData.find(
    (w) => w.windowId === windowMeasurement.id && w.fit === fit,
  );
  if (typeof windowSelect === "undefined") return <></>;

  function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    event.stopPropagation();
    onChangeHandlerCheckBox({
      windowId: windowMeasurement.id,
      fit: fit,
      isChecked: event.target.checked,
    });
  }

  const htmlId = `${windowMeasurement.id}-${fit}`;

  return (
    <li className="flex flex-col w-full rounded-3xl shadow-md border border-slate-200/60 group hover:border-slate-600/60 transition-all duration-150 ease-in-out ">
      <label
        htmlFor={htmlId}
        className="flex flex-col w-full p-6 cursor-pointer"
      >
        <div className="flex w-full justify-between space-x-6">
          <RoomCardWindowMeasurement {...props} />
          <input
            id={htmlId}
            type="checkbox"
            className="w-5 h-5 border border-black/5 rounded-full checked:bg-black cursor-pointer ml-auto accent-black"
            checked={windowSelect.selected}
            onChange={onChangeHandler}
          />
        </div>
      </label>
    </li>
  );
}

export default RoomCardWindowListElement;

{
  /* <RoomCardWindowMeasurement {...props} /> */
}
