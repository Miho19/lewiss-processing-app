import sharePointProjectFile from "../projectFileExample.json";
import { SharePointProjectFile } from "../../src/type/sharePoint/project/projectFileType";
import { getWindowSelectList } from "../../src/utility/sharePoint/projectFileUtility";
import { getWindowSelectDetailedList } from "../../src/utility/process/processUtility";
import { BlindType } from "../../src/type/process/productType";
import { isVenetianSpec } from "../../src/type/sharePoint/project/spec/venetianSpec";

export function getWindowSelectDetailedListWithProjectFile(
  filterFor: BlindType,
) {
  const projectFile = JSON.parse(
    JSON.stringify(sharePointProjectFile),
  ) as SharePointProjectFile;

  const windowSelectList = getWindowSelectList(projectFile);

  const windowSelectDetailList = getWindowSelectDetailedList(
    windowSelectList,
    projectFile,
  );

  const filterForVenetians = windowSelectDetailList.filter((w) => {
    const spec = w.treatment.spec;
    if (isVenetianSpec(spec)) {
      if (spec.baseType === filterFor) return true;
      return false;
    }
    if (spec.blindType === filterFor) return true;
    return false;
  });

  return {
    projectFile: projectFile,
    windowSelectDetailedList: filterForVenetians,
  };
}
