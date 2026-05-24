import type { SharePointRoomType } from "../../../../zod/sharePointProjectFile";
import RoomCardTreatmentInsideLayer from "./RoomCardTreatmentInsideLayer";
import RoomCardTreatmentOutsideLayer from "./RoomCardTreatmentOutsideLayer";

type Props = {
  room: SharePointRoomType;
};

function RoomCardTreatment(props: Props) {
  const { room } = props;
  const { treatment } = room;

  return (
    <div className="flex flex-col w-full pb-6 border border-black/15 shadow-md space-y-3 p-3">
      <RoomCardTreatmentInsideLayer treatment={treatment} />
      <RoomCardTreatmentOutsideLayer treatment={treatment} />
    </div>
  );
}

export default RoomCardTreatment;
