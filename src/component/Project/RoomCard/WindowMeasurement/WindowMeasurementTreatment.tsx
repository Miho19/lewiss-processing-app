import { useState } from "react";
import type { Fit } from "../../../../type/process/windowSelectType";
import type { Treatment } from "../../../../type/sharePoint/project/projectFileType";
import TreatmentFactory from "./Treatment/TreatmentFactory";
import TreatmentCollapseButton from "./TreatmentCollapseButton";
import type { Spec } from "../../../../type/sharePoint/project/spec/spec";

type Props = {
  fit: Fit;
  treatment: Treatment;
};

function WindowMeasurementTreatment(props: Props) {
  const { fit, treatment } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  function toggleIsExpanded(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    setIsExpanded((prev) => !prev);
  }

  const spec = getSpec(fit, treatment);

  return (
    <>
      <TreatmentCollapseButton
        spec={spec}
        isExpanded={isExpanded}
        toggleExpanded={toggleIsExpanded}
      />
      <div
        className={`grid transition-all duration-300 ease-in-out ${isExpanded ? `grid-rows-[1fr] opacity-100 pointer-events-auto` : `grid-rows-[0fr] opacity-0 pointer-events-none`}`}
      >
        <TreatmentFactory spec={spec} />
      </div>
    </>
  );
}

function getSpec(fit: Fit, treatment: Treatment): Spec | undefined {
  switch (fit) {
    case "inside":
      return treatment.insideLayer?.spec;
    case "outside":
      return treatment.outsideLayer?.spec;
    default:
      return undefined;
  }
}

export default WindowMeasurementTreatment;
