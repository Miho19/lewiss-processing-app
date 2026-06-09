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
