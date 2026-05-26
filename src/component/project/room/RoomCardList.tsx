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

  return <ul className="flex flex-col w-full space-y-6">{roomCards}</ul>;
}

export default RoomCardList;
