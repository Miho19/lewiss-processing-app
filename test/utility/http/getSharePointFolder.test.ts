import { describe, it, expect } from "vitest";
import {
  GETSharePointFolder,
  GETSharePointRootFolder,
} from "../../../src/http/sharePoint";

describe.skip("HTTP Requests", () => {
  it("should return the sharepoint root folder", async () => {
    const result = await GETSharePointRootFolder();
    expect(result.length).toBeGreaterThan(0);
  });

  it("should return joshua april folder", async () => {
    const result = await GETSharePointFolder(
      "01VFVMOAG77RPCSPXOVVEKVOWOFTM6KWOT",
    );
    expect(result.length).toBeGreaterThan(0);
  });

  it("should return the confirmed folder", async () => {
    const result = await GETSharePointFolder(
      "01VFVMOAFUZHOHA46TH5C2266C3ACO23AF",
    );
    expect(result.length).toBeGreaterThan(0);
  });

  it("should return the kinetics confirmed folder", async () => {
    const result = await GETSharePointFolder(
      "01VFVMOACOU2OWM2TEQ5GJ4WTVPHIWJTLT",
    );
    expect(result.length).toBe(0);
  });
});
