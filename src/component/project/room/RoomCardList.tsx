import type { projectFormDataType } from "../../../page/ProjectPage";
import type { SharePointProjectFileType } from "../../../zod/sharePointProjectFile";
import RoomCard from "./RoomCard";

type Props = {
  projectFile: SharePointProjectFileType;
  projectFormData: projectFormDataType;
  toggleProjectFormDataCheckBox: (
    id: string,
    fit: "inside" | "outside",
  ) => void;
};

function RoomCardList(props: Props) {
  const { projectFile, projectFormData, toggleProjectFormDataCheckBox } = props;

  const roomCards = projectFile.project.rooms.map((room) => (
    <RoomCard
      room={room}
      key={room.id}
      projectFormData={projectFormData}
      toggleProjectFormDataCheckBox={toggleProjectFormDataCheckBox}
    />
  ));

  return <ul className="flex flex-col w-full space-y-6">{roomCards}</ul>;
}

export default RoomCardList;
