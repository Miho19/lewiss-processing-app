import type { VenetianSpec } from "../../../../../type/sharePoint/project/spec/venetianSpec";

export function getLewissPhoenixwoodSlatSize(spec: VenetianSpec) {
  const split = spec.subtypeId.split("-");
  return split[1].trim();
}

export function getLewissPhoenixwoodControlString(spec: VenetianSpec) {
  return spec.operation;
}

export function getLewissPhoenixwoodValanceString(spec: VenetianSpec) {
  const { valanceCatenary, valanceModern, valanceRamp } = spec;
  if (valanceCatenary != null) return `83 Designer Crown`;

  if (valanceModern != null) return `63 Modern Curve`;

  if (valanceRamp != null) return `63 Ramp`;

  return undefined;
}
