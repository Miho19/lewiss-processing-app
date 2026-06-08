import type { SharePointRoomType } from "../../../../type/sharePointProjectFile";
import RoomCardTreatmentInsideLayer from "./RoomCardTreatmentInsideLayer";
import RoomCardTreatmentOutsideLayer from "./RoomCardTreatmentOutsideLayer";

type Props = {
  room: SharePointRoomType;
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
