import { useEffect, useState, type ChangeEvent, type SubmitEvent } from "react";
import CustomerCard from "../component/customer/CustomerCard";
import Loading from "../component/loading/Loading";
import RoomCardList from "../component/project/room/RoomCardList";
import useSharePointProjectFileQuery from "../hook/useSharePointProjectFileQuery";
import { projectRoute } from "../router/router";

type WindowMeasurement = {
  id: string;
  roomId: string;
  fit: "inside" | "outside";
  selected: boolean;
};

export type onChangeHandlerProjectFormDataCheckboxParameterType = {
  id: string;
  fit: "inside" | "outside";
  isChecked: boolean;
};

export type projectFormDataType = Record<string, WindowMeasurement>;

function ProjectPage() {
  const { projectId } = projectRoute.useParams();
  const [projectFormData, setProjectFormData] = useState<projectFormDataType>(
    {},
  );

  const { data, isSuccess, isLoading, isError, error } =
    useSharePointProjectFileQuery(projectId);

  // maybe there is a better way to do this, smells funny
  useEffect(() => {
    if (!isSuccess) return;

    data.project.rooms.forEach((room) => {
      const roomId = room.id;
      room.windows.forEach((window) => {
        const windowId = window.id;

        const newEntry: WindowMeasurement = {
          id: windowId,
          roomId: roomId,
          fit: "inside",
          selected: false,
        };

        setProjectFormData((prev) => ({ ...prev, [windowId]: newEntry }));
      });
    });
  }, [data, isSuccess]);

  const errorStyleClassName = "flex items-center justify-center flex-1";

  if (isLoading) return <Loading />;
  if (isError)
    return <div className={errorStyleClassName}>error: {error.message}</div>;
  if (!isSuccess)
    return (
      <div className={errorStyleClassName}>Failed to fetch project file</div>
    );

  function onSubmitHandler(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function onChangeHandlerprojectFormDataCheckbox(
    window: onChangeHandlerProjectFormDataCheckboxParameterType,
  ) {
    setProjectFormData((prev) => ({
      ...prev,
      [window.id]: {
        ...prev[window.id],
        fit: window.fit,
        selected: window.isChecked,
      },
    }));
  }

  return (
    <main className="flex flex-col flex-1 overflow-y-auto p-6 items-center space-y-6">
      <CustomerCard projectFile={data} />
      <form
        className="flex w-full flex-col space-y-6 items-start"
        onSubmit={onSubmitHandler}
      >
        <RoomCardList
          projectFile={data}
          onChangeHandlerProjectFormDataCheckBox={
            onChangeHandlerprojectFormDataCheckbox
          }
          projectFormData={projectFormData}
        />

        <button
          type="submit"
          className="px-6 py-3 border-2 border-green-500 ml-auto cursor-pointer hover:border-green-700 transition-all duration-100 ease-in-out hover:scale-105"
        >
          Submit
        </button>
      </form>
    </main>
  );
}

export default ProjectPage;
