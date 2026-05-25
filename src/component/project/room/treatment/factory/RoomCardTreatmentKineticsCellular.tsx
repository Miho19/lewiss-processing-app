import type { SharePointSpecType } from "../../../../../zod/sharePointProjectFile";

type Props = {
  spec: SharePointSpecType;
};
function RoomCardTreatmentKineticsCellular(props: Props) {
  const { spec } = props;

  const operation =
    typeof spec.motorisation === "undefined" ? "Cord" : "Lithium-ion";

  let sideChannelsColour = "None";

  if (spec.sideChannels) {
    sideChannelsColour = "White";
    if (spec.customColour) sideChannelsColour = "Custom";
  }

  return (
    <div className="grid grid-cols-[160px_1fr] gap-x-4 gap-y-4 align-middle">
      <span className="text-sm text-gray-500">Fabric</span>
      <span className="">{spec.fabric.name}</span>

      <span className="text-sm text-gray-500">Operation</span>
      <span>{operation}</span>

      <span className="text-sm text-gray-500">Headrail Colour</span>
      <span>{spec.bracketColour}</span>

      <span className="text-sm text-gray-500">Side Channel Colour</span>
      <span>{sideChannelsColour}</span>
    </div>
  );
}

export default RoomCardTreatmentKineticsCellular;
