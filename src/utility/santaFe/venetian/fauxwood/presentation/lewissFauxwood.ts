import type { VenetianSpec } from "../../../../../type/sharePoint/project/spec/venetianSpec";

export function getLewissFauxwoodSlatSize(spec: VenetianSpec) {
  const split = spec.subtypeId.split("-");
  return split[1].trim();
}

export function getLewissFauxwoodControlString(spec: VenetianSpec) {
  return spec.operation;
}

export function getLewissFauxwoodValanceString(spec: VenetianSpec) {
  const { valanceCatenary, valanceModern, valanceRamp } = spec;
  if (valanceCatenary != null) return `83 Designer Crown`;

  if (valanceModern != null) return `63 Modern Curve`;

  if (valanceRamp != null) return `63 Ramp`;

  return undefined;
}
