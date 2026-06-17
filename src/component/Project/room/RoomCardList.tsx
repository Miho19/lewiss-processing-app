import type { CheckboxFormData } from "../../../page/ProjectPage";
import type { WindowSelect } from "../../../type/process/windowSelectType";
import type { Room } from "../../../type/sharePoint/project/projectFileType";
import RoomCard from "./RoomCard";

type Props = {
  roomList: Room[];
  formData: WindowSelect[];
  onChangeHandlerCheckBox: (window: CheckboxFormData) => void;
};

function RoomCardList(props: Props) {
  const { roomList } = props;

  const roomCards = roomList.map((room) => (
    <RoomCard room={room} key={room.id} {...props} />
  ));

  return <ul className="flex flex-col w-full space-y-12">{roomCards}</ul>;
}

export default RoomCardList;
