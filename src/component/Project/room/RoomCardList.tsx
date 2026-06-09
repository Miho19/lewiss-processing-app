import type {
  onChangeHandlerProjectFormDataCheckboxParameterType,
  projectFormDataType,
} from "../../../page/ProjectPage";
import type { SharePointProjectFile } from "../../../type/sharePoint/project/projectFileType";
import RoomCard from "./RoomCard";

type Props = {
  projectFile: SharePointProjectFile;
  projectFormData: projectFormDataType;
  onChangeHandlerProjectFormDataCheckBox: (
    window: onChangeHandlerProjectFormDataCheckboxParameterType,
  ) => void;
};

function RoomCardList(props: Props) {
  const { projectFile } = props;

  const roomCards = projectFile.project.rooms.map((room) => (
    <RoomCard room={room} key={room.id} {...props} />
  ));

  return <ul className="flex flex-col w-full space-y-12">{roomCards}</ul>;
}

export default RoomCardList;
