import type { VenetianSpec } from "../../../../../type/sharePoint/project/spec/venetianSpec";

export function getLewissAluminiumSlatSize(spec: VenetianSpec) {
  const split = spec.subtypeId.split("-");
  return split[1];
}

export function getLewissAluminiumControlString(spec: VenetianSpec) {
  return spec.operation;
}
