import type { SharePointSpec2Type } from "../../../zod/sharePointProjectFile";

function getKineticsRollerControlString(spec: SharePointSpec2Type) {
  const chainColour = spec.chainColour;
  const chainOutputString = `Chain - ${chainColour}`;

  if (typeof spec.motorisation === "undefined" || spec.motorisation === null)
    return chainOutputString;

  const motorisation = spec.motorisation.trim().toLowerCase();

  if (motorisation.includes("lithium")) return "Lithium-ion";

  return spec.motorisation;
}

export { getKineticsRollerControlString };
