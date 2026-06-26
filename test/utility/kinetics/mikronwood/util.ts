import sharePointProjectFile from "../../../projectFileExample.json";
import { SharePointProjectFile } from "../../../../src/type/sharePoint/project/projectFileType";
import { getWindowSelectList } from "../../../../src/utility/sharePoint/projectFileUtility";
import { getWindowSelectDetailedList } from "../../../../src/utility/process/processUtility";

export function getVenentianWindowSelectDetailedListWithProjectFile() {
  const projectFile = JSON.parse(
    JSON.stringify(sharePointProjectFile),
  ) as SharePointProjectFile;

  const windowSelectList = getWindowSelectList(projectFile);

  const windowSelectDetailList = getWindowSelectDetailedList(
    windowSelectList,
    projectFile,
  );

  const filterForVenetians = windowSelectDetailList.filter(
    (w) => w.treatment.productId === "venetian-blind",
  );

  return {
    projectFile: projectFile,
    windowSelectDetailedList: filterForVenetians,
  };
}
