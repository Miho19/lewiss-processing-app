import type { Fit } from "../../../../type/process/windowSelectType";
import type { WindowMeasurement } from "../../../../type/sharePoint/project/windowMeasurement/windowMeasurementType";
import { capitalisedString } from "../../../../utility/general/Capitalised";
import {
  getWindowHeight,
  getWindowWidth,
} from "../../../../utility/sharePoint/windowMeasurementUtility";

type Props = {
  fit: Fit;
  windowMeasurement: WindowMeasurement;
};
function WindowMeasurementDimensions(props: Props) {
  const { windowMeasurement, fit } = props;

  const measurementDisplay = getMeasurementDisplay(windowMeasurement, fit);

  const fitText = capitalisedString(fit);

  return (
    <>
      <p className="text-sm text-gray-500">{fitText}</p>
      {measurementDisplay}
    </>
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

export default WindowMeasurementDimensions;
