import type { WindowSelect } from "../../type/process/windowSelectType";
import type {
  Room,
  SharePointProjectFile,
} from "../../type/sharePoint/project/projectFileType";
import type { WindowMeasurement } from "../../type/sharePoint/project/windowMeasurement/windowMeasurementType";

export function getRoomAndWindowMeasurement(
  projectFile: SharePointProjectFile,
  roomId: string,
  windowId: string,
): [Room, WindowMeasurement] {
  if (typeof projectFile === "undefined" || !roomId || !windowId)
    throw new Error("Parameters are missing");

  const room = projectFile.project.rooms.find((room) => room.id === roomId);
  if (!room) throw new Error("Room not found");

  const window = room.windows.find((window) => window.id === windowId);
  if (!window) throw new Error("Window not found");

  return [{ ...room }, { ...window }];
}

export function getWindowSelectList(
  projectFile: SharePointProjectFile,
): WindowSelect[] {
  const rooms = projectFile.project.rooms;
  if (rooms.length === 0) return [];

  const outputList: WindowSelect[] = [];

  rooms.forEach((room) => {
    const { id, windows } = room;

    windows.forEach((window) => {
      const [insideWindow, outsideWindow] = getWindowSelect(id, window);
      outputList.push(insideWindow);
      outputList.push(outsideWindow);
    });
  });

  return outputList.flat();
}

export function getWindowSelect(
  roomId: string,
  windowMeasurement: WindowMeasurement,
): WindowSelect[] {
  if (typeof windowMeasurement === "undefined") return [];

  const windowId = windowMeasurement.id;

  // typescript complaining aobut fit not being assignable...
  const insideWindow: WindowSelect = {
    windowId: windowId,
    roomId: roomId,
    fit: "inside",
    selected: false,
  };

  const outsideWindow: WindowSelect = {
    windowId: windowId,
    roomId: roomId,
    fit: "outside",
    selected: false,
  };

  return [insideWindow, outsideWindow];
}
