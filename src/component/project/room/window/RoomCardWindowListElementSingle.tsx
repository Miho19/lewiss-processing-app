import type { SharePointWindowType } from "../../../../zod/sharePointProjectFile";
import RoomCardWindowInsideMeasurement from "./RoomCardWindowInsideMeasurement";
import RoomCardWindowOutsideMeasurement from "./RoomCardWindowOutsideMeasurement";

type Props = {
  window: SharePointWindowType;
};

function getBlindCountType(window: SharePointWindowType): string {
  const blindCount = window.blindCount;

  if (
    typeof blindCount === "string" &&
    (blindCount as string).localeCompare("dual", undefined, {
      sensitivity: "base",
    }) === 0
  ) {
    return "Dual";
  }

  return "Single";
}

function RoomCardWindowListElementSingle(props: Props) {
  const { window } = props;

  const blindCountString = getBlindCountType(window);

  return (
    <li className="flex flex-col w-full pb-6 border border-black/5 shadow-md space-y-3 p-3">
      <div className="flex w-full justify-between border-b border-black/5 pb-3">
        <p className="text-md">{window.name}</p>
        <p className="text-sm text-gray-500 italic">{blindCountString}</p>
      </div>

      <RoomCardWindowInsideMeasurement window={window} />
      <RoomCardWindowOutsideMeasurement window={window} />

      <p className="flex w-full space-x-2 items-center text-sm">
        <span className="text-gray-500">Reveal</span>
        <span>{window.reveal}mm</span>
      </p>

      {typeof window.blindUnderhang !== "undefined" && (
        <p className="flex w-full space-x-2 items-center text-sm">
          <span className="text-gray-500">Under Hang</span>
          <span>{window.blindUnderhang}mm</span>
        </p>
      )}
    </li>
  );
}

export default RoomCardWindowListElementSingle;
