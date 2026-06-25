import type { CheckboxFormData } from "../../../../page/ProjectPage";

import type { WindowMeasurement } from "../../../../type/sharePoint/project/windowMeasurement/windowMeasurementType";
import type {
  Fit,
  WindowSelect,
} from "../../../../type/process/windowSelectType";
import {
  getWindowBlindCountString,
  getWindowHeight,
  getWindowWidth,
} from "../../../../utility/sharePoint/windowMeasurementUtility";
import { capitalisedString } from "../../../../utility/general/Capitalised";
import WindowMeasurementControl from "./WindowMeasurementControl";
import WindowMeasurementTreatment from "./WindowMeasurementTreatment";
import type { Treatment } from "../../../../type/sharePoint/project/projectFileType";
import WindowMeasurementDimensions from "./WindowMeasurementDimensions";

type Props = {
  fit: Fit;
  windowMeasurement: WindowMeasurement;
  treatment: Treatment;
  formData: WindowSelect[];
  onChangeHandlerCheckBox: (window: CheckboxFormData) => void;
};

function WindowMeasurementInfomation(props: Props) {
  const { windowMeasurement, fit, treatment } = props;

  const blindCountString = getWindowBlindCountString(
    fit === "inside"
      ? windowMeasurement.blindCount
      : windowMeasurement.outsideBlindCount,
  );

  const blindCountText = capitalisedString(blindCountString);

  return (
    <section className="flex flex-col w-full space-y-6">
      <p className="w-full text-sm text-gray-500 italic">{blindCountText}</p>

      <div className="grid grid-cols-[50px_1fr] gap-x-4 gap-y-1 align-middle w-full">
        <WindowMeasurementDimensions
          windowMeasurement={windowMeasurement}
          fit={fit}
        />
        <WindowMeasurementControl windowMeasurement={windowMeasurement} />
      </div>

      <WindowMeasurementTreatment fit={fit} treatment={treatment} />
    </section>
  );
}

export default WindowMeasurementInfomation;
