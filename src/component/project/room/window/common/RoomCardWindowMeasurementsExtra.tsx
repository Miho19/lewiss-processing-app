import type { SharePointWindowType } from "../../../../../zod/sharePointProjectFile";

type Props = {
  window: SharePointWindowType;
};

function RoomCardWindowMeasurementExtra(props: Props) {
  const { window } = props;

  return (
    <>
      <p className="flex w-full space-x-2 items-center text-sm">
        <span className="text-gray-500">Reveal</span>
        <span>{window.reveal}mm</span>
      </p>
      {typeof window.blindAbove !== "undefined" && (
        <p className="flex w-full space-x-2 items-center text-sm">
          <span className="text-gray-500">Blind Above</span>
          <span>{window.blindAbove}mm</span>
        </p>
      )}
      {typeof window.blindUnderhang !== "undefined" && (
        <p className="flex w-full space-x-2 items-center text-sm">
          <span className="text-gray-500">Under Hang</span>
          <span>{window.blindUnderhang}mm</span>
        </p>
      )}
    </>
  );
}

export default RoomCardWindowMeasurementExtra;
