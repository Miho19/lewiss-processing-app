import type { SharePointWindowType } from "../../../../zod/sharePointProjectFile";

type Props = {
  window: SharePointWindowType;
};

function RoomCardWindowInsideMeasurement(props: Props) {
  const { window } = props;

  const height = Math.max(window.internalHeightL, window.internalHeightR);

  return (
    <div className="flex flex-col w-full space-y-1 border-b border-black/5 pb-3">
      <p className="flex space-x-2 w-full">
        <span className="text-sm text-gray-500">Inside</span>
        <span className="text-sm ">
          {window.internalWidth}mm x {height}mm
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

export default RoomCardWindowInsideMeasurement;
