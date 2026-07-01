import { vi, describe, it, expect, afterAll } from "vitest";
import pricingSchedule from "./kinetics-mikronwood-pricing-schedule.json";
import kineticsAccessoryPricingExample from "../kinetics-accessories.json";
import { getKineticsMikronwoodAdditionalProductListAsync } from "../../../../src/utility/kinetics/mikronwood/pricing";
import { KineticsMikronwoodTableEntry } from "../../../../src/type/process/tableEntry/kineticsTableEntryType";

vi.mock("../../../../src/http/sharePoint/", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("../../../../src/http/sharePoint/")>();

  return {
    ...actual,
    GETSharePointPricingSchedule: vi.fn().mockResolvedValue(pricingSchedule),
    GETSharePointAccessoryPricingSchedule: vi
      .fn()
      .mockResolvedValue(kineticsAccessoryPricingExample),
  };
});

describe("Kinetics Mikronwood Worksheet", () => {
  afterAll(() => vi.resetAllMocks());

  describe("getKineticsMikronwoodAdditionalProductListAsync", () => {
    const entryList: KineticsMikronwoodTableEntry[] = [
      {
        "blind index": 0,
        location: "",
        width: 0,
        height: 0,
        fit: "",
        colour: "",
        control: "Lithium-ion",
        "control side": "",
        "tilt side": "",
        fascia: "",
        "hold down bracket": "",
        butting: "",
        remote: 1,
        "remote channel": 1,
        price: "",
      },
      {
        "blind index": 1,
        location: "",
        width: 0,
        height: 0,
        fit: "",
        colour: "",
        control: "Lithium-ion",
        "control side": "",
        "tilt side": "",
        fascia: "",
        "hold down bracket": "",
        butting: "",
        remote: 1,
        "remote channel": 2,
        price: "",
      },

      {
        "blind index": 2,
        location: "",
        width: 0,
        height: 0,
        fit: "",
        colour: "",
        control: "Cord",
        "control side": "",
        "tilt side": "",
        fascia: "",
        "hold down bracket": "",
        butting: "",
        remote: 0,
        "remote channel": 0,
        price: "",
      },
    ];

    it("should return an array containing lithium ion with a cost and quantity", async () => {
      const result = await getKineticsMikronwoodAdditionalProductListAsync(
        entryList,
        "venetian-blind",
      );

      expect(result.length).toBeGreaterThan(0);

      const lithiumIonFound = result.find((x) => x.name === "Lithium-ion");
      expect(lithiumIonFound).toBeDefined();
      if (typeof lithiumIonFound === "undefined") return;

      expect(lithiumIonFound.quantity).toBeGreaterThan(0);
      expect(lithiumIonFound.cost).toBeDefined();
      expect(lithiumIonFound.cost).toBeGreaterThan(0);
    });
  });
});
