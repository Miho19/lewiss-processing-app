import type { SharePointTreatmentType } from "../../../../zod/sharePointProjectFile";
import RoomCardTreatmentFactory from "./factory/RoomCardTreatmentFactory";

type Props = {
  treatment: SharePointTreatmentType;
};

function RoomCardTreatmentOutsideLayer(props: Props) {
  const { treatment } = props;

  return (
    <div className="flex flex-col w-full pb-6 border border-black/15 shadow-md space-y-6 p-3">
      <div className="flex w-full justify-between border-b border-black/5 pb-3">
        <p>Outside Treatment</p>
        <p className="text-sm text-gray-500 italic">
          {treatment.outsideLayer.spec.blindType}
        </p>
      </div>
      <RoomCardTreatmentFactory spec={treatment.outsideLayer.spec} />
    </div>
  );
}

export default RoomCardTreatmentOutsideLayer;
