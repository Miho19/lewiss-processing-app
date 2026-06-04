import type {
  Column,
  Content,
  ContentColumns,
  ContentImage,
  ContentStack,
} from "pdfmake/interfaces";
import getImageAsBase64 from "../getBase64Image";
import windowWareLogo from "../../asset/Windoware-Logo-1.png";
import type { TableEntry } from "../pdfmake/commonFunction";

export function createCustomerInformation(
  name: string,
  reference: string,
  consultant: string,
): ContentColumns {
  const leftStack1: ContentStack = {
    stack: [{ text: "Client", marginBottom: 4 }, { text: "Reference" }],
  };

  const leftStack2: ContentStack = {
    stack: [{ text: name, marginBottom: 4 }, { text: reference }],
  };

  const leftColumn: Column[] = [
    { width: "auto", ...leftStack1 },
    { width: "auto", ...leftStack2 },
  ];

  const rightStack1: ContentStack = {
    stack: [{ text: "Date", marginBottom: 4 }, { text: "Consultant" }],
  };

  const rightStack2: ContentStack = {
    stack: [
      {
        text: new Date().toLocaleDateString(),
        marginBottom: 4,
        alignment: "right",
      },
      { text: consultant, alignment: "right" },
    ],
  };

  const rightColumn: Column[] = [
    { width: "auto", ...rightStack1 },
    { width: "auto", ...rightStack2 },
  ];

  const customerInformationColumn: Column[] = [
    { width: "auto", columns: [...leftColumn], columnGap: 24 },
    { width: "*", text: " " },
    { width: "auto", columns: [...rightColumn], columnGap: 24 },
  ];

  const content: Content = {
    columns: customerInformationColumn,
    marginBottom: 14,
  };

  return content;
}

export async function createWindowWareHeader() {
  const windowWareLogoAsBase64: string = await getImageAsBase64(windowWareLogo);

  const image: ContentImage = {
    image: windowWareLogoAsBase64,
    width: 100,
  };

  const content: Content[] = [
    {
      columns: [{ width: "*", text: " " }, image],
    },
  ];

  return content;
}

type RemoteChannelObjectType = {
  remote: number;
  channel: number;
};

function getMaxRemote(entries: TableEntry[]) {
  return entries.reduce(
    (max, curr) => (curr.remote > max ? curr.remote : max),
    0,
  );
}

function getMaxChannel(entries: TableEntry[]) {
  return entries.reduce(
    (max, curr) =>
      curr["remote channel"] > max ? curr["remote channel"] : max,
    0,
  );
}

export function getRemoteAndChannel(
  location: string,
  operation: string,
  entries: TableEntry[],
): RemoteChannelObjectType {
  if (operation !== "Lithium-ion") return { remote: 0, channel: 0 };

  const roomName = location.split("-")[0].trim();

  const filtered = entries.filter(
    (e) =>
      e.location.split("-")[0].trim() === roomName &&
      e.control === "Lithium-ion",
  );

  if (filtered.length === 0)
    return { remote: getMaxRemote(entries) + 1, channel: 1 };

  const maxChannel = getMaxChannel(filtered);

  return { remote: filtered[0].remote, channel: maxChannel + 1 };
}

export function getBlindIndex(entries: TableEntry[]): number {
  if (entries.length === 0) return 1;
  const currentMax = entries.reduce(
    (max, entry) => (entry["blind index"] > max ? entry["blind index"] : max),
    -1,
  );
  return currentMax + 1;
}
