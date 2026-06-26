import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import type { Spec } from "../../../../type/sharePoint/project/spec/spec";
import { isVenetianSpec } from "../../../../type/sharePoint/project/spec/venetianSpec";

type Props = {
  spec: Spec | undefined;
  isExpanded: boolean;
  toggleExpanded: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

function TreatmentCollapseButton(props: Props) {
  const { spec, isExpanded, toggleExpanded } = props;

  const specName = getTreatmentName(spec);

  const chevronClassNames =
    "w-10 h-10 rounded-full group-hover:-translate-y-1 transition-all duration-150 ease-in-out group-hover:scale-125";
  const chevronIcon = isExpanded ? (
    <ChevronDownIcon className={chevronClassNames} />
  ) : (
    <ChevronUpIcon className={chevronClassNames} />
  );

  return (
    <button
      className="flex w-full justify-between items-center space-x-6 group cursor-pointer "
      onClick={toggleExpanded}
    >
      <div className="flex space-x-2 items-center text-sm">
        {chevronIcon}
        <p className="group-hover:-translate-y-1 group-hover:translate-x-10 transition-all duration-150 ease-in-out group-hover:scale-125">
          {specName}
        </p>
      </div>
    </button>
  );
}

function getTreatmentName(spec: Spec | undefined) {
  if (typeof spec === "undefined") return "Invalid Treatment";

  if (isVenetianSpec(spec)) return spec.baseType ?? "Invalid Treatment";

  return spec.blindType;
}

export default TreatmentCollapseButton;
