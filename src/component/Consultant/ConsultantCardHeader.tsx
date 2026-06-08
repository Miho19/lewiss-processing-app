import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import type { ConsultantFolder } from "../../type/sharePoint/consultantType";

type Props = {
  consultant: ConsultantFolder;
  toggleFileList: () => void;
  isExpanded: boolean;
};
function ConsultantCardHeader(props: Props) {
  const { consultant, toggleFileList, isExpanded } = props;

  const chevronClassNames =
    "w-10 h-10 rounded-full group-hover:-translate-y-1 transition-all duration-150 ease-in-out group-hover:scale-125";
  const chevronIcon = isExpanded ? (
    <ChevronDownIcon className={chevronClassNames} />
  ) : (
    <ChevronUpIcon className={chevronClassNames} />
  );

  return (
    <section
      className="flex w-full border-b border-black/10 pb-6 justify-between group cursor-pointer"
      onClick={toggleFileList}
    >
      <div className="flex space-x-6">
        {chevronIcon}
        <h1 className="text-lg group-hover:-translate-y-1 group-hover:translate-x-10 transition-all duration-150 ease-in-out group-hover:scale-125">
          {consultant.name}
        </h1>
      </div>

      <div className="flex flex-col text-sm text-right text-gray-400">
        <p>{consultant.email}</p>
        <p>{consultant.phone}</p>
      </div>
    </section>
  );
}

export default ConsultantCardHeader;
