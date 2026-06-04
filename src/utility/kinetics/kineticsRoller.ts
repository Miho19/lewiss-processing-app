import type { SharePointSpec2Type } from "../../zod/sharePointProjectFile";

function getKineticsRollerOperationString(
  controlLength: number | string,
  spec: SharePointSpec2Type,
) {
  const chainColour = spec.chainColour;
  const chainOperationString = `${chainColour} ${controlLength}mm`;

  return typeof spec.motorisation === "undefined"
    ? chainOperationString
    : "Lithium-ion";
}

export { getKineticsRollerOperationString };
