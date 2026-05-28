import type { SharePointSpecType } from "../../zod/sharePointProjectFile";

function getKineticsCellularOperationString(spec: SharePointSpecType) {
  return typeof spec.motorisation === "undefined" ? "Cord" : "Lithium-ion";
}

function getKineticsCellularSideChannelColour(spec: SharePointSpecType) {
  let sideChannelColour = "None";

  if (spec.sideChannels) {
    sideChannelColour = "White";
    if (spec.customColour) sideChannelColour = "Custom";
  }

  return sideChannelColour;
}

export {
  getKineticsCellularOperationString,
  getKineticsCellularSideChannelColour,
};
