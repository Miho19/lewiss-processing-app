import type { Spec } from "../../../../../../type/sharePoint/project/spec/spec";
import { isVenetianSpec } from "../../../../../../type/sharePoint/project/spec/venetianSpec";
import {
  getLewissFauxwoodControlString,
  getLewissFauxwoodSlatSize,
  getLewissFauxwoodValanceString,
} from "../../../../../../utility/santaFe/venetian/fauxwood/presentation/lewissFauxwood";

type Props = {
  spec: Spec;
};

export function TreatmentLewissFauxwood(props: Props) {
  const { spec } = props;

  if (!isVenetianSpec(spec)) return <></>;

  const slatSize = getLewissFauxwoodSlatSize(spec);
  const control = getLewissFauxwoodControlString(spec);

  const spacerBlockString = spec.spacerBlock ? "Yes" : "No";

  const valanceString = getLewissFauxwoodValanceString(spec) ?? `None`;

  const cutOutString = spec.cutout ? "Yes" : "No";

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

      <span className="text-sm text-gray-500">Valance</span>
      <span className="">{valanceString}</span>

      <span className="text-sm text-gray-500">Cut out</span>
      <span className="">{cutOutString}</span>
    </div>
  );
}
