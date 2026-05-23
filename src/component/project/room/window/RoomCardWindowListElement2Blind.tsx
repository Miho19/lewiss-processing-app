import type { SharePointWindowType } from "../../../../zod/sharePointProjectFile";

type Props = {
  window: SharePointWindowType;
};

function RoomCardWindowListElement2Blind(props: Props) {
  const { window } = props;

  const width = window.internalWidth;

  if (typeof window.blindLeftWidth === "undefined") return <>Error</>;

  const blindLeftWidth = parseInt(window.blindLeftWidth);

  const height = Math.max(window.internalHeightL, window.internalHeightR);

  return (
    <li className="flex flex-col w-full pb-6 border border-black/15 shadow-md space-y-3 p-3">
      <div className="flex w-full justify-between border-b border-black/5 pb-3">
        <p className="text-md">{window.name}</p>
        <p className="text-sm text-gray-500 italic">Butting</p>
      </div>

      <div className="flex flex-col w-full space-y-1 border-b border-black/5 pb-3">
        <p className="flex space-x-2 w-full">
          <span className="text-sm text-gray-500">Inside</span>
          <span className="text-sm ">
            {width}mm x {height}mm
          </span>
        </p>

        <p className="flex space-x-2 w-full pl-3 items-center">
          <span className="text-sm ">
            {window.blindLeftWidth}mm x {height}mm
          </span>
          <span>|</span>
          <span className="text-sm">
            {width - blindLeftWidth}mm x {height}mm
          </span>
        </p>

        <p className="text-xs flex space-x-2 pl-3">
          <span className="text-gray-500">Control</span>
          <span className="">{window.controlSide}</span>
          <span className="">{window.controlLength}mm</span>
        </p>
      </div>

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
