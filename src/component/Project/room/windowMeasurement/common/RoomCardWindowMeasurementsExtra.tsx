import type { WindowMeasurement } from "../../../../../type/sharePoint/project/windowMeasurement/windowMeasurementType";

type Props = {
  windowMeasurement: WindowMeasurement;
};

function RoomCardWindowMeasurementExtra(props: Props) {
  const { windowMeasurement } = props;

  return (
    <>
      <p className="flex w-full space-x-2 items-center text-sm">
        <span className="text-gray-500">Reveal</span>
        <span>{windowMeasurement.reveal}mm</span>
      </p>
      {typeof windowMeasurement.blindAbove !== "undefined" && (
        <p className="flex w-full space-x-2 items-center text-sm">
          <span className="text-gray-500">Blind Above</span>
          <span>{windowMeasurement.blindAbove}mm</span>
        </p>
      )}
      {typeof windowMeasurement.blindUnderhang !== "undefined" && (
        <p className="flex w-full space-x-2 items-center text-sm">
          <span className="text-gray-500">Under Hang</span>
          <span>{windowMeasurement.blindUnderhang}mm</span>
        </p>
      )}
    </>
  );
}

export default RoomCardWindowMeasurementExtra;
