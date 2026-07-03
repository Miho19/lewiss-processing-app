import type { VenetianSpec } from "../../../../../type/sharePoint/project/spec/venetianSpec";

export function getLewissAluminiumSlatSize(spec: VenetianSpec) {
  const split = spec.subtypeId.split("-");
  return split[1].trim();
}

export function getLewissAluminiumControlString(spec: VenetianSpec) {
  return spec.operation;
}

export function getLewissAluminiumSpacerBlockString(spec: VenetianSpec) {
  return spec.spacerBlock ? "Yes" : "No";
}
