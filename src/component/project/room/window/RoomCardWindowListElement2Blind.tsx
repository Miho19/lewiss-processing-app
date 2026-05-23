import type { SharePointWindowType } from "../../../../zod/sharePointProjectFile";
import RoomCardWindowListElement2BlindInside from "./RoomCardWindowListElement2BlindInside";
import RoomCardWindowListElement2BlindOutside from "./RoomCardWindowListElement2BlindOutside";

type Props = {
  window: SharePointWindowType;
};

function RoomCardWindowListElement2Blind(props: Props) {
  const { window } = props;

  return (
    <li className="flex flex-col w-full pb-6 border border-black/15 shadow-md space-y-3 p-3">
      <div className="flex w-full justify-between border-b border-black/5 pb-3">
        <p className="text-md">{window.name}</p>
        <p className="text-sm text-gray-500 italic">Butting</p>
      </div>

      <RoomCardWindowListElement2BlindInside window={window} />
      <RoomCardWindowListElement2BlindOutside window={window} />

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

export default RoomCardWindowListElement2Blind;
