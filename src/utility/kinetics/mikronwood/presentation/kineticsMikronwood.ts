import type { VenetianSpec } from "../../../../type/sharePoint/project/spec/venetianSpec";

export function getKineticsMikronwoodControlString(spec: VenetianSpec): string {
  const { motorisation } = spec;

  if (typeof motorisation === "object" && motorisation === null) return "Cord";

  if (typeof motorisation === "string" && motorisation === "Lithium") {
    return "Lithium-ion";
  }

  return "Cord";
}

export function getKineticsMikronwoodHoldDownBracketString(
  spec: VenetianSpec,
): string {
  return spec.holdDownBrackets ? "Yes" : "No";
}

export function getKineticsMikronwoodFasciaString(spec: VenetianSpec): string {
  const { fasciaColonialReturns, fasciaFlatReturns } = spec;

  if (typeof fasciaColonialReturns === "boolean" && fasciaColonialReturns)
    return "Colonial";

  if (typeof fasciaFlatReturns === "boolean" && fasciaFlatReturns)
    return "Flat";

  return "None";
}
