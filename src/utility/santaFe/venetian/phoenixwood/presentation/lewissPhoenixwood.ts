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
  if (valanceCatenary != null) return `63 Catenary`;

  if (valanceModern != null) return `89mm Contempo`;

  if (valanceRamp != null) return `63 Ramp`;

  return undefined;
}

/**
 * valance options
 * 63.5mm Catenary
 * 63.5mm Ramp
 * 89mm Contempo
 * 76mm Ramp
 * 76mm Chamfer
 * need to update the proposal side of things
 */
