import type { SharePointTreatmentType } from "../../../../zod/sharePointProjectFile";

type Props = {
  treatment: SharePointTreatmentType;
};

function RoomCardTreatmentOutsideLayer(props: Props) {
  const { treatment } = props;

  return <div></div>;
}

export default RoomCardTreatmentOutsideLayer;
