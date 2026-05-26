import { getWindowBlindCountString } from "../../../../../utility/roomCardMeasurement";
import type { SharePointWindowType } from "../../../../../zod/sharePointProjectFile";
import RoomCardWindowMeasurementControl from "../common/RoomCardWindowMeasurementControl";

type Props = {
  window: SharePointWindowType;
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
    if (typeof window.blindLeftWidth === "undefined")
      return <p>Blind left width measurement missing</p>;

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
  const { window } = props;

  if (
    typeof window.blindLeft === "undefined" ||
    typeof window.blindRight === "undefined" ||
    typeof window.blindAbove === "undefined" ||
    typeof window.blindUnderhang === "undefined"
  ) {
    return <></>;
  }

  const outsideWidth =
    window.internalWidth + window.blindLeft + window.blindRight;

  const height = Math.max(window.internalHeightL, window.internalHeightR);
  const outsideHeight = height + window.blindAbove + window.blindUnderhang;

  return (
    <div className="flex flex-col w-full space-y-1 border-b border-black/5 pb-3">
      <p className="w-full text-end text-sm text-gray-500 italic">
        {getWindowBlindCountString(window.blindCount)}
      </p>
      <div className="grid grid-cols-[50px_1fr] gap-x-4 gap-y-1 align-middle">
        <p className="text-sm text-gray-500">Inside</p>
        {getInsideMeasurementDisplay(window)}
        <RoomCardWindowMeasurementControl window={window} />
      </div>
    </div>
  );
}

export default RoomCardWindowOutsideMeasurement;
