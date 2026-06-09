export type RemoteChannel = {
  remote: number;
  channel: number;
};

export type KineticsCellularTableEntry = {
  "blind index": number;
  location: string;
  width: number;
  height: number;
  fit: string;
  "comb size": string;
  fabric: string;
  control: string;
  "control side": string;
  "headrail colour": string;
  "side channel colour": string;
  butting: string;
  remote: number;
  "remote channel": number;
  price: string;
};

export type KineticsRollerTableEntry = {
  "blind index": number;
  location: string;
  width: number;
  height: number;
  fit: string;
  roll: string;
  fabric: string;
  control: string;
  "control side": string;
  "bottom rail": string;
  bracket: string;
  pelmet: string;
  butting: string;
  remote: number;
  "remote channel": number;
  price: string;
};
