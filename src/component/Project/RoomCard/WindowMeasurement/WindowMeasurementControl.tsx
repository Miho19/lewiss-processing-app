import type { WindowMeasurement } from "../../../../type/sharePoint/project/windowMeasurement/windowMeasurementType";

type Props = {
  windowMeasurement: WindowMeasurement;
};

function WindowMeasurementControl(props: Props) {
  const { windowMeasurement } = props;

  if (windowMeasurement.controlSide.length === 0) return <></>;

  return (
    <>
      <p className="text-gray-500 text-xs">Control</p>
      <p className="text-xs">
        {windowMeasurement.controlSide} {windowMeasurement.controlLength}mm
      </p>
    </>
  );
}

export default WindowMeasurementControl;
