import { getKineticsRollerOperationString } from "../../../../../utility/kinetics/kineticsRoller";
import type { SharePointSpec2Type } from "../../../../../zod/sharePointProjectFile";

type Props = {
  spec: SharePointSpec2Type;
};

function RoomCardTreatmentKineticsRoller(props: Props) {
  const { spec } = props;

  const operation = getKineticsRollerOperationString(spec);

  if (typeof spec.fabric === "undefined" || spec.fabric === null)
    return <p>Fabric information is missing</p>;

  return (
    <div className="grid grid-cols-[160px_1fr] gap-x-4 gap-y-4 align-middle">
      <span className="text-sm text-gray-500">Fabric</span>
      <span className="">{spec.fabric.name}</span>

      <span className="text-sm text-gray-500">Roll</span>
      <span className="">{spec.rollDirection}</span>

      <span className="text-sm text-gray-500">Bottom Rail</span>
      <span className="">
        {spec.bottomRailType} - {spec.bottomRailColour}
      </span>

      <span className="text-sm text-gray-500">Bracket</span>
      <span className="">{spec.bracketColour}</span>

      <span className="text-sm text-gray-500">Operation</span>
      <span className="">{operation}</span>

      {spec.pelmetType && (
        <>
          <span className="text-sm text-gray-500">Pelmet</span>
          <span className="">{spec.pelmetType}</span>
        </>
      )}
    </div>
  );
}

export default RoomCardTreatmentKineticsRoller;
