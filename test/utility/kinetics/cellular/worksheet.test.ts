import { afterAll, describe, it, vi, expect } from "vitest";
import kineticsCellularPricingSchedule from "./kinetics-cellular-pricing-example.json";
import kineticsAccessoryPricingExample from "../kinetics-accessories.json";
import {
  getMotorAdditionalProductListAsync,
  getKineticsCellularAdditionalProductListAsync,
} from "../../../../src/utility/kinetics/cellular/pricing";
import { KineticsCellularTableEntry } from "../../../../src/type/process/tableEntry/kineticsTableEntryType";

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
        "cellular-blind",
      );
      expect(result.length).toBe(3);
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
