import type { Spec } from "../../../../../../type/sharePoint/project/spec/spec";
import { isVenetianSpec } from "../../../../../../type/sharePoint/project/spec/venetianSpec";
import {
  getKineticsMikronwoodControlString,
  getKineticsMikronwoodFasciaString,
  getKineticsMikronwoodHoldDownBracketString,
} from "../../../../../../utility/kinetics/mikronwood/presentation/kineticsMikronwood";

type Props = { spec: Spec };

export function TreatmentKineticsMikronwood(props: Props) {
  const { spec } = props;

  if (!isVenetianSpec(spec)) return <></>;

  const control = getKineticsMikronwoodControlString(spec);

  const fascia = getKineticsMikronwoodFasciaString(spec);

  const holdDownBracket = getKineticsMikronwoodHoldDownBracketString(spec);

  return (
    <div className="grid grid-cols-[160px_1fr] gap-x-4 gap-y-4 align-middle overflow-hidden">
      <span className="text-sm text-gray-500">Colour</span>
      <span className="">{spec.fabric?.name}</span>

      <span className="text-sm text-gray-500">Control</span>
      <span className="">{control}</span>

      <span className="text-sm text-gray-500">Fascia</span>
      <span className="">{fascia}</span>

      <span className="text-sm text-gray-500">Hold Down Bracket</span>
      <span className="">{holdDownBracket}</span>
    </div>
  );
}
