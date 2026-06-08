import type {
  BlindCount,
  Fit,
} from "../../../type/process/windowMeasurementType";
import type { WindowDetail } from "../../../type/sharePoint/project/windowDetail.ts/windowDetail";

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

export function getWindowWidth(window: WindowDetail, fit: Fit): number[] {
  switch (fit) {
    case "inside":
      return _getWindowWidthInside(window);
    case "outside":
      return _getWindowWidthOutside(window);
    default:
      return [0];
  }
}

function _getWindowWidthInside(window: WindowDetail): number[] {
  const blindCount = window.blindCount;
  if (
    (typeof blindCount === "string" &&
      (blindCount as string).localeCompare("dual", undefined, {
        sensitivity: "base",
      }) === 0) ||
    blindCount === 1
  ) {
    return [window.internalWidth];
  }

  if (blindCount !== 2) return [0];

  if (typeof window.blindLeftWidth === "undefined") return [0];

  try {
    const blindLeftWidth = parseInt(window.blindLeftWidth);
    return [blindLeftWidth, window.internalWidth - blindLeftWidth];
  } catch (error) {
    console.error(error);
    return [0];
  }
}

function _getWindowWidthOutside(window: WindowDetail): number[] {
  if (
    typeof window.blindLeft === "undefined" ||
    typeof window.blindRight === "undefined" ||
    typeof window.blindAbove === "undefined" ||
    typeof window.blindUnderhang === "undefined" ||
    typeof window.outsideBlindLeftWidth === "undefined" ||
    typeof window.outsideBlindCount === "undefined"
  ) {
    return [0];
  }

  const width = window.internalWidth + window.blindLeft + window.blindRight;
  const outsideBlindCount = window.outsideBlindCount;

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
    const outsideBlindLeftWidth = parseInt(window.outsideBlindLeftWidth);
    return [outsideBlindLeftWidth, width - outsideBlindLeftWidth];
  } catch (error) {
    console.error(error);
    return [0];
  }
}

export function getWindowHeight(window: WindowDetail, fit: Fit): number {
  switch (fit) {
    case "inside":
      return _getWindowHeightInside(window);
    case "outside":
      return _getWindowHeightOutside(window);
    default:
      return 0;
  }
}

function _getWindowHeightInside(window: WindowDetail) {
  return Math.max(window.internalHeightL, window.internalHeightR);
}

function _getWindowHeightOutside(window: WindowDetail) {
  if (
    typeof window.blindAbove === "undefined" ||
    typeof window.blindUnderhang === "undefined"
  ) {
    return 0;
  }
  const insideHeight = _getWindowHeightInside(window);
  return insideHeight + window.blindAbove + window.blindUnderhang;
}
