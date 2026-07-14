import { useEffect, useState, type SubmitEvent } from "react";
import CustomerCard from "../component/Customer/CustomerCard";
import Loading from "../component/Loading/Loading";

import useSharePointProjectFileQuery from "../hook/useSharePointProjectFileQuery";
import { projectRoute } from "../router/router";

import type { Fit, WindowSelect } from "../type/process/windowSelectType";
import {
  filterWindowSelectBySelected,
  processWindowsSelectedAsync,
} from "../utility/process/processUtility";
import { openPDFDocumentAsync } from "../utility/pdfmake/documentUtility";

import RoomCardList from "../component/Project/RoomCard/RoomCardList";

import { getWindowSelectList } from "../utility/sharePoint/projectFileUtility";
import { getWorksheetPDFAsync } from "../utility/process/pdfUtility";
import SubmitButton from "../component/Project/form/SubmitButton";

export type CheckboxFormData = {
  windowId: string;
  fit: Fit;
  isChecked: boolean;
};

function ProjectPage() {
  const { projectId } = projectRoute.useParams();
  const [formData, setFormData] = useState<WindowSelect[]>([]);

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [formError, SetFormError] = useState("");

  const {
    data: sharePointProjectFile,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useSharePointProjectFileQuery(projectId);

  useEffect(() => {
    if (isLoading) return;
    if (!isSuccess) return;

    const windowSelectList: WindowSelect[] = getWindowSelectList(
      sharePointProjectFile,
    );

    setFormData(() => [...windowSelectList]);
  }, [sharePointProjectFile, isSuccess, isLoading]);

  const errorStyleClassName = "flex items-center justify-center flex-1";

  if (isLoading) return <Loading />;
  if (isError)
    return <div className={errorStyleClassName}>error: {error.message}</div>;
  if (!isSuccess)
    return (
      <div className={errorStyleClassName}>Failed to fetch project file</div>
    );

  async function onSubmitHandler(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsFormSubmitting(true);
    SetFormError("");

    try {
      if (typeof sharePointProjectFile === "undefined") {
        SetFormError("Missing project file");
        return;
      }

      const selectedWindows = filterWindowSelectBySelected(formData);
      if (selectedWindows.length === 0) {
        SetFormError("No windows selected");
        return;
      }

      const worksheetList = await processWindowsSelectedAsync(
        selectedWindows,
        sharePointProjectFile,
      );

      for (const worksheet of worksheetList) {
        const pdf = await getWorksheetPDFAsync(worksheet);
        if (typeof pdf === "undefined") continue;
        await openPDFDocumentAsync(pdf);
      }
    } catch (error: unknown) {
      if (error instanceof Error) SetFormError(error.message);
    } finally {
      console.error(formError);
      setIsFormSubmitting(false);
    }
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
    <main className="flex-1 p-6 pt-30 space-y-12">
      <div className="flex w-full justify-center">
        <CustomerCard projectFile={sharePointProjectFile} />
      </div>

      <form
        className="flex w-full flex-col space-y-6 relative"
        onSubmit={onSubmitHandler}
      >
        <SubmitButton isFormSubmitting={isFormSubmitting} />

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
