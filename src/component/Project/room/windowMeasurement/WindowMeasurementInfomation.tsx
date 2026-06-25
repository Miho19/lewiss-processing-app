import type { CheckboxFormData } from "../../../../page/ProjectPage";

import type { WindowMeasurement } from "../../../../type/sharePoint/project/windowMeasurement/windowMeasurementType";
import type {
  Fit,
  WindowSelect,
} from "../../../../type/process/windowSelectType";
import {
  getWindowBlindCountString,
  getWindowHeight,
  getWindowWidth,
} from "../../../../utility/sharePoint/windowMeasurementUtility";
import { capitalisedString } from "../../../../utility/general/Capitalised";
import WindowMeasurementControl from "./WindowMeasurementControl";
import WindowMeasurementTreatment from "./WindowMeasurementTreatment";
import type { Treatment } from "../../../../type/sharePoint/project/projectFileType";

type Props = {
  fit: Fit;
  windowMeasurement: WindowMeasurement;
  treatment: Treatment;
  formData: WindowSelect[];
  onChangeHandlerCheckBox: (window: CheckboxFormData) => void;
};

function WindowMeasurementInfomation(props: Props) {
  const { windowMeasurement, fit } = props;

  const blindCountString = getWindowBlindCountString(
    fit === "inside"
      ? windowMeasurement.blindCount
      : windowMeasurement.outsideBlindCount,
  );

  const blindCountText = capitalisedString(blindCountString);

  const measurementDisplay = getMeasurementDisplay(windowMeasurement, fit);

  const fitText = capitalisedString(fit);

  return (
    <section className="flex flex-col w-full">
      <p className="w-full text-sm text-gray-500 italic mb-6">
        {blindCountText}
      </p>
      <div className="flex w-full justify-between">
        <div className="grid grid-cols-[50px_1fr] gap-x-4 gap-y-1 align-middle">
          <p className="text-sm text-gray-500">{fitText}</p>
          {measurementDisplay}
          <WindowMeasurementControl windowMeasurement={windowMeasurement} />
        </div>

        <WindowMeasurementTreatment />
      </div>
    </section>
  );
}

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

export default WindowMeasurementInfomation;
