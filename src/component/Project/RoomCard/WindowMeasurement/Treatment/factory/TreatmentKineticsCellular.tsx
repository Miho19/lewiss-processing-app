import {
  isKineticsCellularSpec,
  type KineticsCellularSpec,
} from "../../../../../../type/sharePoint/project/spec/kineticsSpec";
import type { Spec } from "../../../../../../type/sharePoint/project/spec/spec";
import {
  getKineticsCellularControlString,
  getKineticsCellularSideChannelColour,
} from "../../../../../../utility/kinetics/cellular/presentation/kineticsCellular";

type Props = {
  spec: Spec;
};

function RoomCardTreatmentKineticsCellular(props: Props) {
  const { spec } = props;

  if (!isKineticsCellularSpec(spec)) return <></>;

  const control = getKineticsCellularControlString(spec);

  const sideChannelColour = getKineticsCellularSideChannelColour(spec);

  return (
    <div className="grid grid-cols-[160px_1fr] gap-x-4 gap-y-4 align-middle">
      <span className="text-sm text-gray-500">Fabric</span>
      <span className="">{spec.fabric?.name}</span>

      <span className="text-sm text-gray-500">Control</span>
      <span>{control}</span>

      <span className="text-sm text-gray-500">Headrail Colour</span>
      <span>{spec.bracketColour}</span>

      <span className="text-sm text-gray-500">Side Channel Colour</span>
      <span>{sideChannelColour}</span>
    </div>
  );
}

export default RoomCardTreatmentKineticsCellular;
