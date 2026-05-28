import type { projectFormDataType } from "../page/ProjectPage";
import type {
  SharePointInsideLayerType,
  SharePointOutsideLayerType,
  SharePointProjectFileType,
  SharePointRoomType,
  SharePointWindowType,
} from "../zod/sharePointProjectFile";

export type WindowBlindCountStringType =
  | "single"
  | "dual"
  | "butting"
  | "invalid";

export type WindowMeasurement = {
  id: string;
  roomId: string;
  fit: WindowFitType;
  selected: boolean;
};

export type WindowMeasurementJoined = {
  windowId: string;
  roomId: string;
  blindCountString: WindowBlindCountStringType;
  fit: WindowFitType;
  width: number[];
  height: number;
  treatment: SharePointInsideLayerType | SharePointOutsideLayerType;
};

export type WindowFitType = "inside" | "outside";

function filterSelectedWindows(
  formData: projectFormDataType,
): WindowMeasurement[] {
  const filteredWindows: WindowMeasurement[] = [];

  Object.entries(formData).forEach(([, value]) => {
    if (!value.selected) return;
    filteredWindows.push(value);
  });

  return [...filteredWindows];
}

function getRoomAndWindowFromProjectFileByWindowId(
  projectFile: SharePointProjectFileType,
  roomId: string,
  windowId: string,
): [SharePointRoomType, SharePointWindowType] {
  if (typeof projectFile === "undefined" || !roomId || !windowId)
    throw new Error("Parameters are missing");

  const room = projectFile.project.rooms.find((room) => room.id === roomId);
  if (!room) throw new Error("Room not found");

  const window = room.windows.find((window) => window.id === windowId);
  if (!window) throw new Error("Window not found");

  return [{ ...room }, { ...window }];
}

function joinTreatment(
  projectFile: SharePointProjectFileType,
  filteredList: WindowMeasurement[],
) {
  const joinedList = filteredList.map((window) => {
    const [projectRoom, projectWindow] =
      getRoomAndWindowFromProjectFileByWindowId(
        projectFile,
        window.roomId,
        window.id,
      );

    const blindCountString = getWindowBlindCountString(
      window.fit === "inside"
        ? projectWindow.blindCount
        : projectWindow.outsideBlindCount,
    );

    const treatment =
      window.fit === "inside"
        ? projectRoom.treatment.insideLayer
        : projectRoom.treatment.outsideLayer;

    const newEntry: WindowMeasurementJoined = {
      windowId: window.id,
      roomId: window.roomId,
      blindCountString: blindCountString,
      fit: window.fit,
      width: getWindowWidth(projectWindow, window.fit),
      height: getWindowHeight(projectWindow, window.fit),
      treatment: treatment,
    };

    return newEntry;
  });
  return [...joinedList];
}

function getWindowBlindCountString(
  blindCount: string | number,
): WindowBlindCountStringType {
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

function getWindowWidth(
  window: SharePointWindowType,
  fit: WindowFitType,
): number[] {
  switch (fit) {
    case "inside":
      return _getWindowWidthInside(window);
    case "outside":
      return _getWindowWidthOutside(window);
    default:
      return [0];
  }
}

function _getWindowWidthInside(window: SharePointWindowType): number[] {
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

function _getWindowWidthOutside(window: SharePointWindowType): number[] {
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

function getWindowHeight(
  window: SharePointWindowType,
  fit: WindowFitType,
): number {
  switch (fit) {
    case "inside":
      return _getWindowHeightInside(window);
    case "outside":
      return _getWindowHeightOutside(window);
    default:
      return 0;
  }
}

function _getWindowHeightInside(window: SharePointWindowType) {
  return Math.max(window.internalHeightL, window.internalHeightR);
}

function _getWindowHeightOutside(window: SharePointWindowType) {
  if (
    typeof window.blindAbove === "undefined" ||
    typeof window.blindUnderhang === "undefined"
  ) {
    return 0;
  }
  const insideHeight = _getWindowHeightInside(window);
  return insideHeight + window.blindAbove + window.blindUnderhang;
}

export {
  filterSelectedWindows,
  joinTreatment,
  getWindowBlindCountString,
  getWindowWidth,
  getWindowHeight,
  getRoomAndWindowFromProjectFileByWindowId,
};
