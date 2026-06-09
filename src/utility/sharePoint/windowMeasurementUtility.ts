import type { BlindCount, Fit } from "../../type/process/windowSelectType";
import type { WindowMeasurement } from "../../type/sharePoint/project/windowMeasurement/windowMeasurementType";

export function getWindowBlindCountString(
  blindCount: string | number,
): BlindCount {
  if (
    typeof blindCount === "string" &&
    (blindCount as string).localeCompare("dual", undefined, {
      sensitivity: "base",
    }) === 0
  ) {
    return "dual";
  }

  if (blindCount === 1) return "single";

  if (blindCount === 2) return "butting";

  return "invalid";
}

export function getWindowWidth(
  windowMeasurement: WindowMeasurement,
  fit: Fit,
): number[] {
  switch (fit) {
    case "inside":
      return _getWindowWidthInside(windowMeasurement);
    case "outside":
      return _getWindowWidthOutside(windowMeasurement);
    default:
      return [0];
  }
}

function _getWindowWidthInside(windowMeasurement: WindowMeasurement): number[] {
  const blindCount = windowMeasurement.blindCount;
  if (
    (typeof blindCount === "string" &&
      (blindCount as string).localeCompare("dual", undefined, {
        sensitivity: "base",
      }) === 0) ||
    blindCount === 1
  ) {
    return [windowMeasurement.internalWidth];
  }

  if (blindCount !== 2) return [0];

  if (typeof windowMeasurement.blindLeftWidth === "undefined") return [0];

  try {
    const blindLeftWidth = parseInt(windowMeasurement.blindLeftWidth);
    return [blindLeftWidth, windowMeasurement.internalWidth - blindLeftWidth];
  } catch (error) {
    console.error(error);
    return [0];
  }
}

function _getWindowWidthOutside(
  windowMeasurement: WindowMeasurement,
): number[] {
  if (
    typeof windowMeasurement.blindLeft === "undefined" ||
    typeof windowMeasurement.blindRight === "undefined" ||
    typeof windowMeasurement.blindAbove === "undefined" ||
    typeof windowMeasurement.blindUnderhang === "undefined" ||
    typeof windowMeasurement.outsideBlindLeftWidth === "undefined" ||
    typeof windowMeasurement.outsideBlindCount === "undefined"
  ) {
    return [0];
  }

  const width =
    windowMeasurement.internalWidth +
    windowMeasurement.blindLeft +
    windowMeasurement.blindRight;
  const outsideBlindCount = windowMeasurement.outsideBlindCount;

  if (
    (typeof outsideBlindCount === "string" &&
      (outsideBlindCount as string).localeCompare("dual", undefined, {
        sensitivity: "base",
      }) === 0) ||
    outsideBlindCount === 1
  ) {
    return [width];
  }

  if (outsideBlindCount !== 2) return [0];

  try {
    const outsideBlindLeftWidth = parseInt(
      windowMeasurement.outsideBlindLeftWidth,
    );
    return [outsideBlindLeftWidth, width - outsideBlindLeftWidth];
  } catch (error) {
    console.error(error);
    return [0];
  }
}

export function getWindowHeight(
  windowMeasurement: WindowMeasurement,
  fit: Fit,
): number {
  switch (fit) {
    case "inside":
      return _getWindowHeightInside(windowMeasurement);
    case "outside":
      return _getWindowHeightOutside(windowMeasurement);
    default:
      return 0;
  }
}

function _getWindowHeightInside(windowMeasurement: WindowMeasurement) {
  return Math.max(
    windowMeasurement.internalHeightL,
    windowMeasurement.internalHeightR,
  );
}

function _getWindowHeightOutside(windowMeasurement: WindowMeasurement) {
  if (
    typeof windowMeasurement.blindAbove === "undefined" ||
    typeof windowMeasurement.blindUnderhang === "undefined"
  ) {
    return 0;
  }
  const insideHeight = _getWindowHeightInside(windowMeasurement);
  return (
    insideHeight +
    windowMeasurement.blindAbove +
    windowMeasurement.blindUnderhang
  );
}
