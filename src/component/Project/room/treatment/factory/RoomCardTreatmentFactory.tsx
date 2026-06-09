import type {
  KineticsCellularSpec,
  KineticsRollerSpec,
} from "../../../../../type/sharePoint/project/spec/kineticsSpec";
import type { Spec } from "../../../../../type/sharePoint/project/spec/spec";
import RoomCardTreatmentKineticsCellular from "./RoomCardTreatmentKineticsCellular";
import RoomCardTreatmentKineticsRoller from "./RoomCardTreatmentKineticsRoller";

type Props = {
  spec: Spec;
};

function RoomCardTreatmentFactory(props: Props) {
  const { spec } = props;

  switch (spec.blindType.toLowerCase()) {
    case "Kinetics 10mm Cellular Blind".toLowerCase():
    case "Kinetics 20mm Cellular Blind".toLowerCase():
      return (
        <RoomCardTreatmentKineticsCellular
          spec={spec as KineticsCellularSpec}
        />
      );

    case "Kinetics Sunscreen Roller Blind".toLowerCase():
    case "Kinetics Blockout Roller Blind".toLowerCase():
    case "Kinetics Light Filtering Roller Blind".toLowerCase():
      return (
        <RoomCardTreatmentKineticsRoller spec={spec as KineticsRollerSpec} />
      );

    default:
      return <p>'{spec.blindType}' is not valid blind type</p>;
  }
}

export default RoomCardTreatmentFactory;

//   "Kinetics Sunscreen Roller Blind"             → "Sunscreen Roller"
//   "Kinetics Blockout Roller Blind"              → "Blockout Roller"
//   "Kinetics Light Filtering Roller Blind"       → "Light Filter Roller"
//   "Kinetics 10mm Cellular Blind"                → "10mm Cellular"
//   "Kinetics 20mm Cellular Blind"                → "20mm Cellular"
//   "Kinetics Mikronwood 50mm Venetian"           → "Mikronwood 50mm Venetian"
//   "Lewis's 25mm Aluminium Venetian"             → "25mm Aluminium Venetian"
//   "Lewis's 50mm Phoenixwood Venetian"           → "50mm Phoenixwood Venetian"
//   "Santa Fe Normandy Shutter"                   → "Normandy Shutter"
//   "Santa Fe Waterproof Woodlore Plus Shutter"   → "Waterproof Woodlore Plus Shutter"
