import type { SharePointSpecType } from "../../../../zod/sharePointProjectFile";
import RoomCardTreatmentKineticsCellular10mm from "./RoomCardTreatmentKineticsCellular10mm";

type Props = {
  spec: SharePointSpecType;
};

function RoomCardTreatmentFactory(props: Props) {
  const { spec } = props;

  switch (spec.blindType.toLowerCase()) {
    case "Kinetics 10mm Cellular Blind".toLowerCase():
      return <RoomCardTreatmentKineticsCellular10mm spec={spec} />;
    default:
      return <p>'{spec.blindType}' is not valid blind type</p>;
  }
}

export default RoomCardTreatmentFactory;
