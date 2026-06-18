import { useEffect, useState, type SubmitEvent } from "react";
import CustomerCard from "../component/Customer/CustomerCard";
import Loading from "../component/Loading/Loading";
import RoomCardList from "../component/Project/room/RoomCardList";
import useSharePointProjectFileQuery from "../hook/useSharePointProjectFileQuery";
import { projectRoute } from "../router/router";

import type { Fit, WindowSelect } from "../type/process/windowSelectType";
import { processWindowsSelectedAsync } from "../utility/process/processUtility";

export type CheckboxFormData = {
  windowId: string;
  fit: Fit;
  isChecked: boolean;
};

function filterSelectedWindows(
  windowSelectList: WindowSelect[],
): WindowSelect[] {
  return windowSelectList.filter((window) => window.selected);
}

function ProjectPage() {
  const { projectId } = projectRoute.useParams();
  const [formData, setFormData] = useState<WindowSelect[]>([]);

  const {
    data: sharePointProjectFile,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useSharePointProjectFileQuery(projectId);

  useEffect(() => {
    if (!isSuccess) return;

    sharePointProjectFile.project.rooms.forEach((room) => {
      const roomId = room.id;
      room.windows.forEach((window) => {
        const windowId = window.id;

        // typescript complaining aobut fit not being assignable...
        const insideWindow: WindowSelect = {
          windowId: windowId,
          roomId: roomId,
          fit: "inside",
          selected: false,
        };

        const outsideWindow: WindowSelect = {
          windowId: windowId,
          roomId: roomId,
          fit: "outside",
          selected: false,
        };

        setFormData((prev) => [...prev, insideWindow, outsideWindow]);
      });
    });
  }, [sharePointProjectFile, isSuccess]);

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
    if (typeof sharePointProjectFile === "undefined") return;

    // potential to give feedback here instead of returning nothing
    const selectedWindows = filterSelectedWindows(formData);
    if (selectedWindows.length === 0) return;

    processWindowsSelectedAsync(selectedWindows, sharePointProjectFile);
  }

  function onChangeHandlerCheckBox(formData: CheckboxFormData) {
    setFormData((prev) =>
      prev.map((window) => {
        if (
          window.windowId === formData.windowId &&
          window.fit === formData.fit
        ) {
          return { ...window, selected: formData.isChecked };
        }

        return window;
      }),
    );
  }

  return (
    <main className="flex-1 p-6 space-y-12 pt-30">
      <CustomerCard projectFile={sharePointProjectFile} />
      <form
        className="flex w-full flex-col space-y-6 relative"
        onSubmit={onSubmitHandler}
      >
        <div className="fixed right-6 top-18 z-100">
          <button
            type="submit"
            className="w-26 flex ml-auto justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1D1D1D] hover:bg-[#393939] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1D1D1D] hover:-translate-y-1 transition-all duration-100 ease-in-out cursor-pointer"
          >
            Submit
          </button>
        </div>

        <RoomCardList
          roomList={sharePointProjectFile.project.rooms}
          onChangeHandlerCheckBox={onChangeHandlerCheckBox}
          formData={formData}
        />
      </form>
    </main>
  );
}

export default ProjectPage;
