import { afterAll, describe, expect, it, vi } from "vitest";
import kineticsRollerPricingExample from "./kinetics-roller-pricing-schedule.json";
import kineticsAccessoryPricingExample from "../kinetics-accessories.json";
import type { KineticsRollerTableEntry } from "../../../../src/type/process/tableEntry/kineticsTableEntryType";
import {
  getKineticsRollerAdditionalProductListAsync,
  getAccessoryProductListAsync,
} from "../../../../src/utility/kinetics/roller/pricing";

import { GETSharePointAccessoryPricingSchedule } from "../../../../src/http/sharePoint/";

vi.mock("../../../../src/http/sharePoint/", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("../../../../src/http/sharePoint/")>();

  return {
    ...actual,
    GETSharePointPricingSchedule: vi
      .fn()
      .mockResolvedValue(kineticsRollerPricingExample),
    GETSharePointAccessoryPricingSchedule: vi
      .fn()
      .mockResolvedValue(kineticsAccessoryPricingExample),
  };
});

describe("Kinetics Roller Worksheet Cost", () => {
  afterAll(() => vi.resetAllMocks());

  describe("getKineticsRollerAdditionalProductListAsync", () => {
    it("should return an array containing lithium-ion as one of the products", async () => {
      const exampleRollerEntryList: KineticsRollerTableEntry[] = [
        {
          "blind index": 0,
          location: "",
          width: 0,
          height: 0,
          fit: "",
          roll: "",
          fabric: "",
          control: "Lithium-ion",
          "control side": "",
          "bottom rail": "",
          bracket: "",
          pelmet: "",
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
          roll: "",
          fabric: "",
          control: "Hardwired Smart Home",
          "control side": "",
          "bottom rail": "",
          bracket: "",
          pelmet: "",
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
          roll: "",
          fabric: "",
          control: "Hardwired WiFi Remote Control",
          "control side": "",
          "bottom rail": "",
          bracket: "",
          pelmet: "",
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
          roll: "",
          fabric: "",
          control: "Chain - White",
          "control side": "",
          "bottom rail": "",
          bracket: "",
          pelmet: "",
          butting: "",
          remote: 0,
          "remote channel": 0,
          price: "",
        },
      ];

      const result = await getKineticsRollerAdditionalProductListAsync(
        exampleRollerEntryList,
        "blockout-roller",
      );

      expect(result.length).toBe(3);
      expect(result[0].name).toBe("Lithium-ion");
      expect(result[0].quantity).toBe(1);
    });

    it("should return an empty array", async () => {
      const exampleRollerEntry: KineticsRollerTableEntry = {
        "blind index": 0,
        location: "",
        width: 0,
        height: 0,
        fit: "",
        roll: "",
        fabric: "",
        control: "Chain FastRise - White",
        "control side": "",
        "bottom rail": "",
        bracket: "",
        pelmet: "",
        butting: "",
        remote: 0,
        "remote channel": 0,
        price: "",
      };

      const result = await getKineticsRollerAdditionalProductListAsync(
        [exampleRollerEntry],
        "blockout-roller",
      );

      expect(result.length).toBe(0);
    });
  });

  describe("getAccessoryProductListAsync", () => {
    const exampleRollerEntryList: KineticsRollerTableEntry[] = [
      {
        "blind index": 0,
        location: "",
        width: 0,
        height: 0,
        fit: "",
        roll: "",
        fabric: "",
        control: "Lithium-ion",
        "control side": "",
        "bottom rail": "",
        bracket: "",
        pelmet: "",
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
        roll: "",
        fabric: "",
        control: "Hardwired Smart Home",
        "control side": "",
        "bottom rail": "",
        bracket: "",
        pelmet: "",
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
        roll: "",
        fabric: "",
        control: "Hardwired WiFi Remote Control",
        "control side": "",
        "bottom rail": "",
        bracket: "",
        pelmet: "",
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
        roll: "",
        fabric: "",
        control: "Chain - White",
        "control side": "",
        "bottom rail": "",
        bracket: "",
        pelmet: "",
        butting: "",
        remote: 0,
        "remote channel": 0,
        price: "",
      },
    ];

    it("should return a list of accessories... name in progress", async () => {
      const result = await getAccessoryProductListAsync(
        exampleRollerEntryList,
        "Kinetics Blockout Roller Blind",
      );
      console.log(result);
    });
  });
});

// describe("HTTP Requests", () => {
//   it("should make the request", async () => {
//     const result = await GETSharePointAccessoryPricingSchedule(
//       "Kinetics 10mm Cellular Blind",
//     );
//     console.log(result);
//   });
// });
