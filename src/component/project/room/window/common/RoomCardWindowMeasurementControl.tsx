import type { SharePointWindowType } from "../../../../../type/sharePointProjectFile";

type Props = {
  window: SharePointWindowType;
};

function RoomCardWindowMeasurementControl(props: Props) {
  const { window } = props;
  return (
    <>
      <p className="text-gray-500 text-xs">Control</p>
      <p className="text-xs">
        {window.controlSide} {window.controlLength}mm
      </p>
    </>
  );
}

export default RoomCardWindowMeasurementControl;
