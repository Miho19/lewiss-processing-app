import type { SharePointTreatmentType } from "../../../../type/sharePointProjectFile";
import RoomCardTreatmentFactory from "./factory/RoomCardTreatmentFactory";

type Props = {
  treatment: SharePointTreatmentType;
};

function RoomCardTreatmentInsideLayer(props: Props) {
  const { treatment } = props;

  if (treatment.insideLayer === null) return <></>;

  return (
    <div className="flex flex-col w-full pb-6 border border-black/15 shadow-md space-y-6 p-3">
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
