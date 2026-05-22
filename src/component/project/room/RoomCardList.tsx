import type { SharePointProjectFileType } from "../../../zod/sharePointProjectFile";
import RoomCard from "./RoomCard";

type Props = {
  projectFile: SharePointProjectFileType;
};

function RoomCardList(props: Props) {
  const { projectFile } = props;

  const roomCards = projectFile.project.rooms.map((room) => (
    <RoomCard room={room} key={room.id} />
  ));

  return (
    <ul className="flex w-full flex-col space-y-3 pb-6 md:w-xl">{roomCards}</ul>
  );
}

export default RoomCardList;
