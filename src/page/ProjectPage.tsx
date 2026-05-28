import { useEffect, useState, type SubmitEvent } from "react";
import CustomerCard from "../component/customer/CustomerCard";
import Loading from "../component/loading/Loading";
import RoomCardList from "../component/project/room/RoomCardList";
import useSharePointProjectFileQuery from "../hook/useSharePointProjectFileQuery";
import { projectRoute } from "../router/router";
import {
  filterSelectedWindows,
  joinTreatment,
  type WindowFitType,
  type WindowMeasurement,
  type WindowMeasurementJoined,
} from "../utility/processProject";
import { getOrderPDF, openPDFDocument } from "../utility/pdfmake/pdfmake";

export type onChangeHandlerProjectFormDataCheckboxParameterType = {
  id: string;
  fit: WindowFitType;
  isChecked: boolean;
};

export type projectFormDataType = Record<string, WindowMeasurement>;

// TODO 27/05/2026, switch to context to avoid the prop drilling

function ProjectPage() {
  const { projectId } = projectRoute.useParams();
  const [projectFormData, setProjectFormData] = useState<projectFormDataType>(
    {},
  );

  const { data, isSuccess, isLoading, isError, error } =
    useSharePointProjectFileQuery(projectId);

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
    if (typeof data === "undefined") return;

    // potential to give feedback here instead of returning nothing
    const selectedWindows = filterSelectedWindows(projectFormData);
    if (selectedWindows.length === 0) return;

    const joinedSelectedWindows: WindowMeasurementJoined[] = joinTreatment(
      data,
      selectedWindows,
    );

    getOrderPDF(data, joinedSelectedWindows)
      .then((pdfDocuments) => {
        openPDFDocument(pdfDocuments[0]);
      })
      .catch((error) => console.error(error));
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
    <main className="flex-1 p-6 space-y-12 pt-30">
      <CustomerCard projectFile={data} />
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
          projectFile={data}
          onChangeHandlerProjectFormDataCheckBox={
            onChangeHandlerprojectFormDataCheckbox
          }
          projectFormData={projectFormData}
        />
      </form>
    </main>
  );
}

export default ProjectPage;
