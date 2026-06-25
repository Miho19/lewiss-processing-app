import type { Fit } from "../../../../type/process/windowSelectType";
import type { Treatment } from "../../../../type/sharePoint/project/projectFileType";
import TreatmentFactory from "./Treatment/TreatmentFactory";

type Props = {
  fit: Fit;
  treatment: Treatment;
};

function WindowMeasurementTreatment(props: Props) {
  const { fit, treatment } = props;

  switch (fit) {
    case "inside":
      return <TreatmentFactory spec={treatment.insideLayer?.spec} />;
    case "outside":
      return <TreatmentFactory spec={treatment.outsideLayer?.spec} />;

    default:
      return <p>Treatment information missing</p>;
  }
}

export default WindowMeasurementTreatment;
