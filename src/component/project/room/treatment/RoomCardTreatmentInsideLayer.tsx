import type { SharePointTreatmentType } from "../../../../zod/sharePointProjectFile";
import RoomCardTreatmentFactory from "./RoomCardTreatmentFactory";

type Props = {
  treatment: SharePointTreatmentType;
};

function RoomCardTreatmentInsideLayer(props: Props) {
  const { treatment } = props;

  return (
    <div className="flex flex-col w-full space-y-6">
      <div className="flex w-full justify-between border-b border-black/5 pb-3">
        <p>Inside Treatment</p>
        <p className="text-sm text-gray-500 italic">
          {treatment.insideLayer.spec.blindType}
        </p>
      </div>
      <RoomCardTreatmentFactory spec={treatment.insideLayer.spec} />
    </div>
  );
}

export default RoomCardTreatmentInsideLayer;
