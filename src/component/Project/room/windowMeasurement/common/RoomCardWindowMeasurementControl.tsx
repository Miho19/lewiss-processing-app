import type { WindowMeasurement } from "../../../../../type/sharePoint/project/windowMeasurement/windowMeasurementType";

type Props = {
  windowMeasurement: WindowMeasurement;
};

function RoomCardWindowMeasurementControl(props: Props) {
  const { windowMeasurement } = props;
  return (
    <>
      <p className="text-gray-500 text-xs">Control</p>
      <p className="text-xs">
        {windowMeasurement.controlSide} {windowMeasurement.controlLength}mm
      </p>
    </>
  );
}

export default RoomCardWindowMeasurementControl;
