import type { Spec } from "../../../../../../type/sharePoint/project/spec/spec";
import { isVenetianSpec } from "../../../../../../type/sharePoint/project/spec/venetianSpec";
import {
  getLewissAluminiumControlString,
  getLewissAluminiumSlatSize,
} from "../../../../../../utility/santaFe/venetian/aluminium/presentation/lewissAluminium";

type Props = {
  spec: Spec;
};

function TreatmentLewissAluminium(props: Props) {
  const { spec } = props;

  if (!isVenetianSpec(spec)) return <></>;

  const slatSize = getLewissAluminiumSlatSize(spec);
  const control = getLewissAluminiumControlString(spec);

  const spacerBlockString = spec.spacerBlock ? "Yes" : "No";

  return (
    <div className="grid grid-cols-[160px_1fr] gap-x-4 gap-y-4 align-middle overflow-hidden">
      <span className="text-sm text-gray-500">Slat Size</span>
      <span className="">{slatSize}</span>

      <span className="text-sm text-gray-500">Colour</span>
      <span className="">{spec.fabric?.name}</span>

      <span className="text-sm text-gray-500">Control</span>
      <span className="">{control}</span>

      <span className="text-sm text-gray-500">Spacer Block</span>
      <span className="">{spacerBlockString}</span>
    </div>
  );
}

export default TreatmentLewissAluminium;
