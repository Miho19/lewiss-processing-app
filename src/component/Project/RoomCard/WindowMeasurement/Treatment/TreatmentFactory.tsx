import type { Spec } from "../../../../../type/sharePoint/project/spec/spec";
import { getBlindTypeFromSpec } from "../../../../../utility/process/processUtility";
import {
  TreatmentKineticsCellular,
  TreatmentKineticsMikronwood,
  TreatmentKineticsRoller,
  TreatmentLewissAluminium,
} from "./factory";

type Props = {
  spec: Spec | undefined;
};

function TreatmentFactory(props: Props) {
  const { spec } = props;

  if (!spec || typeof spec === "undefined")
    return <p className="overflow-hidden">Spec infomation missing</p>;

  const blindType = getBlindTypeFromSpec(spec);

  if (typeof blindType === "undefined")
    return (
      <p className="overflow-hidden">'{blindType}' is not valid blind type</p>
    );

  switch (blindType) {
    case "Kinetics Mikronwood 50mm Venetian":
      return <TreatmentKineticsMikronwood spec={spec} />;
    case "Kinetics 10mm Cellular Blind":
    case "Kinetics 20mm Cellular Blind":
      return <TreatmentKineticsCellular spec={spec} />;

    case "Kinetics Sunscreen Roller Blind":
    case "Kinetics Blockout Roller Blind":
    case "Kinetics Light Filtering Roller Blind":
      return <TreatmentKineticsRoller spec={spec} />;
    case "Lewis's 25mm Aluminium Venetian":
    case "Lewis's 50mm Aluminium Venetian":
      return <TreatmentLewissAluminium spec={spec} />;

    default:
      return (
        <p className="overflow-hidden">'{blindType}' is not valid blind type</p>
      );
  }
}

export default TreatmentFactory;
