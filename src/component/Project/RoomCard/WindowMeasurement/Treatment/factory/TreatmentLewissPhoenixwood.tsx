import type { Spec } from "../../../../../../type/sharePoint/project/spec/spec";
import { isVenetianSpec } from "../../../../../../type/sharePoint/project/spec/venetianSpec";
import {
  getLewissPhoenixwoodControlString,
  getLewissPhoenixwoodSlatSize,
  getLewissPhoenixwoodValanceString,
} from "../../../../../../utility/santaFe/venetian/phoenixwood/presentation/lewissPhoenixwood";

type Props = {
  spec: Spec;
};

export function TreatmentLewissPhoenixwood(props: Props) {
  const { spec } = props;

  if (!isVenetianSpec(spec)) return <></>;

  const slatSize = getLewissPhoenixwoodSlatSize(spec);
  const control = getLewissPhoenixwoodControlString(spec);
  const spacerBlock = spec.spacerBlock ? "Yes" : "No";
  const valance = getLewissPhoenixwoodValanceString(spec) ?? "None";
  const cutOut = spec.cutout ? "Yes" : "No";

  return (
    <div className="grid grid-cols-[160px_1fr] gap-x-4 gap-y-4 align-middle overflow-hidden">
      <span className="text-sm text-gray-500">Slat Size</span>
      <span className="">{slatSize}</span>

      <span className="text-sm text-gray-500">Colour</span>
      <span className="">{spec.fabric?.name}</span>

      <span className="text-sm text-gray-500">Control</span>
      <span className="">{control}</span>

      <span className="text-sm text-gray-500">Spacer Block</span>
      <span className="">{spacerBlock}</span>

      <span className="text-sm text-gray-500">Valance</span>
      <span className="">{valance}</span>

      <span className="text-sm text-gray-500">Cut out</span>
      <span className="">{cutOut}</span>
    </div>
  );
}
