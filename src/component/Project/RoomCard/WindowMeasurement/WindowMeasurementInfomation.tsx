import type { CheckboxFormData } from "../../../../page/ProjectPage";

import type { WindowMeasurement } from "../../../../type/sharePoint/project/windowMeasurement/windowMeasurementType";
import type {
  Fit,
  WindowSelect,
} from "../../../../type/process/windowSelectType";
import { getWindowBlindCountString } from "../../../../utility/sharePoint/windowMeasurementUtility";
import { capitalisedString } from "../../../../utility/general/Capitalised";
import WindowMeasurementControl from "./WindowMeasurementControl";
import WindowMeasurementTreatment from "./WindowMeasurementTreatment";
import type { Treatment } from "../../../../type/sharePoint/project/projectFileType";
import WindowMeasurementDimensions from "./WindowMeasurementDimensions";
import { useState } from "react";
import TreatmentCollapseButton from "./TreatmentCollapseButton";

type Props = {
  fit: Fit;
  windowMeasurement: WindowMeasurement;
  treatment: Treatment;
  formData: WindowSelect[];
  onChangeHandlerCheckBox: (window: CheckboxFormData) => void;
};

function WindowMeasurementInfomation(props: Props) {
  const { windowMeasurement, fit, treatment } = props;

  const [isExpanded, setIsExpanded] = useState(false);

  const blindCountString = getWindowBlindCountString(
    fit === "inside"
      ? windowMeasurement.blindCount
      : windowMeasurement.outsideBlindCount,
  );

  const blindCountText = capitalisedString(blindCountString);

  function toggleIsExpanded(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    setIsExpanded((prev) => !prev);
  }

  return (
    <section className="flex flex-col w-full space-y-6 overflow-hidden">
      <p className="w-full text-sm text-gray-500 italic">{blindCountText}</p>

      <div className="grid grid-cols-[50px_1fr] gap-x-4 gap-y-1 align-middle w-full">
        <WindowMeasurementDimensions
          windowMeasurement={windowMeasurement}
          fit={fit}
        />
        <WindowMeasurementControl windowMeasurement={windowMeasurement} />
      </div>
      <TreatmentCollapseButton
        isExpanded={isExpanded}
        toggleExpanded={toggleIsExpanded}
      />
      <div
        className={`grid transition-all duration-300 ease-in-out ${isExpanded ? `grid-rows-[1fr] opacity-100 pointer-events-auto` : `grid-rows-[0fr] opacity-0 pointer-events-none`}`}
      >
        <WindowMeasurementTreatment fit={fit} treatment={treatment} />
      </div>
    </section>
  );
}

export default WindowMeasurementInfomation;
