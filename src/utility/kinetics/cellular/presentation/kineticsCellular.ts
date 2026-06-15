import type { KineticsCellularSpec } from "../../../../type/sharePoint/project/spec/kineticsSpec";

export function getKineticsCellularControlString(spec: KineticsCellularSpec) {
  return typeof spec.motorisation === "undefined" || spec.motorisation === null
    ? "Cord"
    : "Lithium-ion";
}

export function getKineticsCellularSideChannelColour(
  spec: KineticsCellularSpec,
) {
  let sideChannelColour = "None";

  if (spec.sideChannels) {
    sideChannelColour = "White";
    if (spec.customColour) sideChannelColour = "Custom";
  }

  return sideChannelColour;
}

export function getKineticsCellularFabricOpacity(
  spec: KineticsCellularSpec,
): string {
  const fabricStringArray = spec.fabric?.name.split(" ");

  const translucentFound = fabricStringArray?.find(
    (str) =>
      str.localeCompare("translucent", undefined, { sensitivity: "base" }) ===
      0,
  );

  return typeof translucentFound === "undefined" ? "Blockout" : "Translucent";
}
