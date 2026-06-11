import type { KineticsRollerTableEntry } from "../../../../type/process/tableEntry/kineticsTableEntryType";
import type { WindowSelectDetailed } from "../../../../type/process/windowSelectType";
import type { Room } from "../../../../type/sharePoint/project/projectFileType";
import type { KineticsRollerSpec } from "../../../../type/sharePoint/project/spec/kineticsSpec";
import type { WindowMeasurement } from "../../../../type/sharePoint/project/windowMeasurement/windowMeasurementType";
import { getRemoteAndChannel } from "../../general/motorAccessoryUtility";
import { getKineticsRollerControlString } from "../presentation/kineticsRoller";
import { getKineticsRollerBlindCostAsync } from "../pricing/getKineticsRollerBlindCostAsync";

export const defaultKineticsRollerTableEntry: KineticsRollerTableEntry = {
  "blind index": 0,
  location: "",
  width: 0,
  height: 0,
  fit: "",
  roll: "",
  fabric: "",
  control: "",
  "control side": "",
  "bottom rail": "",
  bracket: "",
  pelmet: "",
  butting: "",
  remote: 0,
  "remote channel": 0,
  price: "",
};

export async function createKineticsRollerTableEntryAsync(
  windowSelectDetailed: WindowSelectDetailed,
  blindIndex: number,
  room: Room,
  windowMeasurement: WindowMeasurement,
  entries: KineticsRollerTableEntry[],
) {
  const location = `${room.name} - ${windowMeasurement.name}`;

  const width = windowSelectDetailed.width[0];
  const height = windowSelectDetailed.height;

  const fit =
    windowSelectDetailed.fit.charAt(0).toUpperCase() +
    windowSelectDetailed.fit.slice(1);

  const spec = windowSelectDetailed.treatment.spec as KineticsRollerSpec;

  const roll = spec.rollDirection.replace("Roll", "");

  const fabric = spec.fabric?.name ?? "";
  const fabricMultiplier = spec.fabric?.multiplier ?? 0;

  const controlString = getKineticsRollerControlString(spec);
  const controlLength = controlString.toLowerCase().includes("chain")
    ? `${windowMeasurement.controlLength}mm`
    : "";

  const controlOutputString = `${controlString} ${controlLength}`.trim();

  const bottomRailType = spec.bottomRailType;
  const bottomRailColour = spec.bottomRailColour;

  const bottomRail = `${bottomRailType} - ${bottomRailColour}`;
  const controlSide = windowMeasurement.controlSide;

  const bracket = `${spec.bracketColour}`;
  //  change the display name to 110mm - Inside for example 11/06/2026
  const pelmet = typeof spec.pelmetType === "undefined" ? "" : spec.pelmetType;

  const { remote, channel } = getRemoteAndChannel(
    location,
    controlString,
    entries,
  );

  const blindType = windowSelectDetailed.treatment.spec.blindType;

  const price = await getKineticsRollerBlindCostAsync(
    width,
    height,
    fabricMultiplier,
    controlString,
    controlLength,
    bottomRailType,
    bottomRailColour,
    pelmet,
    blindType,
    false,
  );

  const newEntry: KineticsRollerTableEntry = {
    "blind index": blindIndex,
    location: location,
    width: width,
    height: height,
    fit: fit,
    roll: roll,
    fabric: fabric,
    control: controlOutputString,
    "control side": controlSide,
    "bottom rail": bottomRail,
    bracket: bracket,
    pelmet: pelmet,
    butting: "No",
    remote: remote,
    "remote channel": channel,
    price: price.toFixed(2),
  };

  return newEntry;
}
