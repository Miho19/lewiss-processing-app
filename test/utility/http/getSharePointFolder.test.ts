import { describe, it, expect } from "vitest";
import {
  GETSharePointFolder,
  GETSharePointRootFolder,
} from "../../../src/http/sharePoint";

describe.skip("HTTP Requests", () => {
  it.skip("should return the sharepoint root folder", async () => {
    const result = await GETSharePointRootFolder();
    expect(result.length).toBeGreaterThan(0);
    console.log(result);
  });

  const folder = "01VFVMOABI7QI3JZ3NQZBZF7PVNERWE6G4";

  it("should return print out the folder", async () => {
    const result = await GETSharePointFolder(folder);
    expect(result.length).toBeGreaterThan(0);
    console.log(result);
  });
});

/**
 * SharePoint Folder Id
 * joshua april - 01VFVMOAG77RPCSPXOVVEKVOWOFTM6KWOT
 * joshua april/exampleFileStrucutre/confirmedOrder
 *
 * root/confirmed orders/ - 01VFVMOAEPH2B72PIHJNBYWJDJZL2ZZQIW
 * root/history/ - 01VFVMOAD7L3Y3HRPRY5GJWCS3WT4EMF5Q
 */
