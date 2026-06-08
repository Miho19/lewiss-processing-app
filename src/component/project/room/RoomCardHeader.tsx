import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import type { SharePointRoomType } from "../../../type/sharePointProjectFile";

type Props = {
  room: SharePointRoomType;
  isExpanded: boolean;
  toggleExpanded: () => void;
};

function RoomCardHeader(props: Props) {
  const { room, isExpanded, toggleExpanded } = props;

  const chevronClassNames =
    "w-10 h-10 rounded-full group-hover:-translate-y-1 transition-all duration-150 ease-in-out group-hover:scale-125";
  const chevronIcon = isExpanded ? (
    <ChevronDownIcon className={chevronClassNames} />
  ) : (
    <ChevronUpIcon className={chevronClassNames} />
  );

  return (
    <section
      className="flex w-full border-b border-black/5 pb-6 justify-between items-center space-x-6 group cursor-pointer"
      onClick={toggleExpanded}
    >
      <div className="flex space-x-2 items-center">
        {chevronIcon}
        <p className="group-hover:-translate-y-1 group-hover:translate-x-10 transition-all duration-150 ease-in-out group-hover:scale-125">
          {room.name}
        </p>
      </div>

      <p className="text-xs text-gray-500 italic">{room.id}</p>
    </section>
  );
}

export default RoomCardHeader;
