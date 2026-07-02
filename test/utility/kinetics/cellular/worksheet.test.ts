import { afterAll, describe, it, vi, expect } from "vitest";
import kineticsCellularPricingSchedule from "./kinetics-cellular-pricing-example.json";
import kineticsAccessoryPricingExample from "../kinetics-accessories.json";
import { getKineticsCellularAdditionalProductListAsync } from "../../../../src/utility/kinetics/cellular/pricing";
import { KineticsCellularTableEntry } from "../../../../src/type/process/tableEntry/kineticsTableEntryType";
import { getMotorAdditionalProductListAsync } from "../../../../src/utility/kinetics/general/getMotorAdditionalProductListAsync";

vi.mock("../../../../src/http/sharePoint/", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("../../../../src/http/sharePoint/")>();

  return {
    ...actual,
    GETSharePointPricingSchedule: vi
      .fn()
      .mockResolvedValue(kineticsCellularPricingSchedule),
    GETSharePointAccessoryPricingSchedule: vi
      .fn()
      .mockResolvedValue(kineticsAccessoryPricingExample),
  };
});

describe("Kinetics Cellular Worksheet Test", () => {
  afterAll(() => vi.resetAllMocks());

  describe("getKineticsCellularAdditionalProductListAsync", () => {
    it("should return a list", async () => {
      const exampleCellularEntryList: KineticsCellularTableEntry[] = [
        {
          "blind index": 0,
          location: "",
          width: 0,
          height: 0,
          fit: "",
          "comb size": "",
          fabric: "",
          control: "Lithium-ion",
          "control side": "",
          "headrail colour": "",
          "side channel colour": "",
          butting: "",
          remote: 1,
          "remote channel": 1,
          price: "",
        },
        {
          "blind index": 0,
          location: "",
          width: 0,
          height: 0,
          fit: "",
          "comb size": "",
          fabric: "",
          control: "Lithium-ion",
          "control side": "",
          "headrail colour": "",
          "side channel colour": "",
          butting: "",
          remote: 1,
          "remote channel": 2,
          price: "",
        },
        {
          "blind index": 0,
          location: "",
          width: 0,
          height: 0,
          fit: "",
          "comb size": "",
          fabric: "",
          control: "Cord",
          "control side": "",
          "headrail colour": "",
          "side channel colour": "",
          butting: "",
          remote: 0,
          "remote channel": 0,
          price: "",
        },
      ];
      const result = await getKineticsCellularAdditionalProductListAsync(
        exampleCellularEntryList,
        "Kinetics 10mm Cellular Blind",
      );
      expect(result.length).toBe(3);

      const lithiumIon = result.find(
        (m) => m.name.toLowerCase() === "lithium-ion",
      );
      expect(lithiumIon).toBeDefined();
      if (typeof lithiumIon === "undefined") return;

      expect(lithiumIon.cost).toBeDefined();
      expect(lithiumIon.cost).toBeGreaterThan(0);
      expect(lithiumIon.quantity).toBeGreaterThan(0);
    });
  });

  describe("getMotorAdditionalProductListAsync", () => {
    it("should return ..", async () => {
      const exampleCellularEntryList: KineticsCellularTableEntry[] = [
        {
          "blind index": 0,
          location: "",
          width: 0,
          height: 0,
          fit: "",
          "comb size": "",
          fabric: "",
          control: "Lithium-ion",
          "control side": "",
          "headrail colour": "",
          "side channel colour": "",
          butting: "",
          remote: 0,
          "remote channel": 0,
          price: "",
        },
        {
          "blind index": 0,
          location: "",
          width: 0,
          height: 0,
          fit: "",
          "comb size": "",
          fabric: "",
          control: "Lithium-ion",
          "control side": "",
          "headrail colour": "",
          "side channel colour": "",
          butting: "",
          remote: 0,
          "remote channel": 0,
          price: "",
        },
        {
          "blind index": 0,
          location: "",
          width: 0,
          height: 0,
          fit: "",
          "comb size": "",
          fabric: "",
          control: "Cord",
          "control side": "",
          "headrail colour": "",
          "side channel colour": "",
          butting: "",
          remote: 0,
          "remote channel": 0,
          price: "",
        },
      ];
      const result = await getMotorAdditionalProductListAsync(
        exampleCellularEntryList,
        "Kinetics 10mm Cellular Blind",
      );

      expect(result.length).toBe(1);
    });
  });
});
