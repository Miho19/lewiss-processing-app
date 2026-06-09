import type { Room } from "../../../../type/sharePoint/project/projectFileType";
import RoomCardTreatmentInsideLayer from "./RoomCardTreatmentInsideLayer";
import RoomCardTreatmentOutsideLayer from "./RoomCardTreatmentOutsideLayer";

type Props = {
  room: Room;
};

function RoomCardTreatment(props: Props) {
  const { room } = props;
  const { treatment } = room;

  return (
    <>
      <RoomCardTreatmentInsideLayer treatment={treatment} />
      <RoomCardTreatmentOutsideLayer treatment={treatment} />
    </>
  );
}

export default RoomCardTreatment;
