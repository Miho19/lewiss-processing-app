import type { SharePointSpec2Type } from "../../zod/sharePointProjectFile";

function getKineticsRollerOperationString(spec: SharePointSpec2Type) {
  const chainColour = spec.chainColour;
  const chainOperationString = `Chain - ${chainColour}`;

  if (typeof spec.motorisation === "undefined" || spec.motorisation === null)
    return chainOperationString;

  const motorisation = spec.motorisation.trim().toLowerCase();

  if (motorisation.includes("lithium")) return "Lithium-ion";

  return spec.motorisation;
}

export { getKineticsRollerOperationString };
