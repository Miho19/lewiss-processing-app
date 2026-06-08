import type { projectFormDataType } from "../page/ProjectPage";
import type {
  SharePointInsideLayerType,
  SharePointOutsideLayerType,
  SharePointProjectFileType,
  SharePointRoomType,
  SharePointWindowType,
} from "../type/sharePointProjectFile";

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
): WindowMeasurementJoined[] {
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

    if (typeof treatment === "undefined" || treatment === null) return [];

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

  return joinedList.flat();
}

export {
  filterSelectedWindows,
  joinTreatment,
  getWindowBlindCountString,
  getWindowWidth,
  getWindowHeight,
  getRoomAndWindowFromProjectFileByWindowId,
};
