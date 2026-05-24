import type { SharePointWindowType } from "../../../../zod/sharePointProjectFile";

type Props = {
  window: SharePointWindowType;
};

function RoomCardWindowListElement2BlindOutside(props: Props) {
  const { window } = props;

  if (
    typeof window.blindLeft === "undefined" ||
    typeof window.blindRight === "undefined" ||
    typeof window.blindAbove === "undefined"
  ) {
    return <></>;
  }

  if (typeof window.blindLeftWidth === "undefined") return <>Error</>;
  if (typeof window.outsideBlindLeftWidth === "undefined") return <>Error</>;

  const outsideWidth =
    window.internalWidth + window.blindLeft + window.blindRight;

  const blindRightWidth = outsideWidth - parseInt(window.blindLeftWidth);

  const height = Math.max(window.internalHeightL, window.internalHeightR);
  const outsideHeight = height + window.blindAbove;

  return (
    <div className="flex flex-col w-full space-y-1 border-b border-black/5 pb-3">
      <p className="flex space-x-2 items-center">
        <span className="text-sm text-gray-500">Outside</span>
        <span className="text-sm">
          {window.blindLeftWidth}mm x {outsideHeight}mm
        </span>
        <span>|</span>
        <span className="text-sm">
          {blindRightWidth}mm x {outsideHeight}mm
        </span>
      </p>

      <p className="text-xs flex space-x-2 pl-3">
        <span className="text-gray-500">Control</span>
        <span className="">{window.controlSide}</span>
        <span className="">{window.controlLength}mm</span>
      </p>
    </div>
  );
}

export default RoomCardWindowListElement2BlindOutside;
