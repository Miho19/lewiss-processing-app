import type { KineticsRollerSpec } from "../../../../../type/sharePoint/project/spec/kineticsSpec";
import { getKineticsRollerPelmetString } from "../../../../../utility/kinetics/roller/presentation";
import {
  getKineticsRollerControlString,
  getKineticsRollerFabricOpacity,
} from "../../../../../utility/kinetics/roller/presentation/kineticsRoller";

type Props = {
  spec: KineticsRollerSpec;
};

function RoomCardTreatmentKineticsRoller(props: Props) {
  const { spec } = props;

  const control = getKineticsRollerControlString(spec);

  if (typeof spec.fabric === "undefined" || spec.fabric === null)
    return <p>Fabric information is missing</p>;

  let fabricOpacity = getKineticsRollerFabricOpacity(spec.blindType);
  if (typeof fabricOpacity === "undefined")
    return <p>Fabric information is missing</p>;

  fabricOpacity =
    fabricOpacity?.charAt(0).toUpperCase() + fabricOpacity.slice(1);

  const fabric = `${spec.fabric.name} - ${fabricOpacity}`;

  return (
    <div className="grid grid-cols-[160px_1fr] gap-x-4 gap-y-4 align-middle">
      <span className="text-sm text-gray-500">Fabric</span>
      <span className="">{fabric}</span>

      <span className="text-sm text-gray-500">Roll</span>
      <span className="">{spec.rollDirection}</span>

      <span className="text-sm text-gray-500">Bottom Rail</span>
      <span className="">
        {spec.bottomRailType} - {spec.bottomRailColour}
      </span>

      <span className="text-sm text-gray-500">Bracket</span>
      <span className="">{spec.bracketColour}</span>

      <span className="text-sm text-gray-500">Control</span>
      <span className="">{control}</span>

      {spec.pelmetType && (
        <>
          <span className="text-sm text-gray-500">Pelmet</span>
          <span className="">
            {getKineticsRollerPelmetString(spec.pelmetType)}
          </span>
        </>
      )}
    </div>
  );
}

export default RoomCardTreatmentKineticsRoller;
