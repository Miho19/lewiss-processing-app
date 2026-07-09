import { describe, it, expect } from "vitest";
import {
  GETSharePointFolder,
  GETSharePointRootFolder,
} from "../../../src/http/sharePoint";

describe.skip("HTTP Requests", () => {
  it.skip("should return the sharepoint root folder", async () => {
    const result = await GETSharePointRootFolder();
    expect(result.length).toBeGreaterThan(0);
  });

  it("should return joshua april folder", async () => {
    const result = await GETSharePointFolder(
      "01VFVMOAG77RPCSPXOVVEKVOWOFTM6KWOT",
    );
    expect(result.length).toBeGreaterThan(0);
    console.log(result);
  });

  it("should return the confirmed folder", async () => {
    const result = await GETSharePointFolder(
      "01VFVMOAB3N7ANXUDNBJH2YLJ4YKSMJY3I",
    );
    expect(result.length).toBeGreaterThan(0);
    console.log(result);
  });
});
