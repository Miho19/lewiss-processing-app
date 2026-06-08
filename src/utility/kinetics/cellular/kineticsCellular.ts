import type { SharePointSpecType } from "../../../type/sharePointProjectFile";

function getKineticsCellularControlString(spec: SharePointSpecType) {
  return typeof spec.motorisation === "undefined" || spec.motorisation === null
    ? "Cord"
    : "Lithium-ion";
}

function getKineticsCellularSideChannelColour(spec: SharePointSpecType) {
  let sideChannelColour = "None";

  if (spec.sideChannels) {
    sideChannelColour = "White";
    if (spec.customColour) sideChannelColour = "Custom";
  }

  return sideChannelColour;
}

function getKineticsCellularFabricOpacity(spec: SharePointSpecType): string {
  const fabricStringArray = spec.fabric.name.split(" ");

  const translucentFound = fabricStringArray.find(
    (str) =>
      str.localeCompare("translucent", undefined, { sensitivity: "base" }) ===
      0,
  );

  return typeof translucentFound === "undefined" ? "Blockout" : "Translucent";
}

export {
  getKineticsCellularControlString,
  getKineticsCellularSideChannelColour,
  getKineticsCellularFabricOpacity,
};
