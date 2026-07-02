import { afterAll, describe, expect, it, vi } from "vitest";
import kineticsRollerPricingExample from "./kinetics-blockout-roller-pricing-schedule.json";
import kineticsAccessoryPricingExample from "../kinetics-accessories.json";
import type { KineticsRollerTableEntry } from "../../../../src/type/process/tableEntry/kineticsTableEntryType";
import { getKineticsRollerAdditionalProductListAsync } from "../../../../src/utility/kinetics/roller/pricing";

import { getKineticsAccessoryProductListAsync } from "../../../../src/utility/kinetics/general/getAccessoryProductListAsync";

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
    it("should return an array containing lithium ion with a cost and quantity", async () => {
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
        "Kinetics Blockout Roller Blind",
      );

      expect(result.length).toBeGreaterThan(0);

      const lithiumIonFound = result.find((x) => x.name === "Lithium-ion");
      expect(lithiumIonFound).toBeDefined();
      if (typeof lithiumIonFound === "undefined") return;

      expect(lithiumIonFound.quantity).toBeGreaterThan(0);
      expect(lithiumIonFound.cost).toBeDefined();
      expect(lithiumIonFound.cost).toBeGreaterThan(0);
    });

    it("should return an array containing remote and usb charger", async () => {
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
        "Kinetics Blockout Roller Blind",
      );

      expect(result.length).toBeGreaterThan(0);

      const remote = result.find((x) => x.name === "15 Channel Remote");
      expect(remote).toBeDefined();
      if (typeof remote === "undefined") return;

      expect(remote.cost).toBeDefined();
      expect(remote.cost).toBeGreaterThan(0);
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
        "Kinetics Blockout Roller Blind",
      );

      expect(result.length).toBe(0);
    });
  });

  describe("getKineticsAccessoryProductListAsync", () => {
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
        remote: 1,
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
        remote: 1,
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
        remote: 2,
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
        remote: 2,
        "remote channel": 0,
        price: "",
      },
    ];

    it("should return a list of accessories... name in progress", async () => {
      const result = await getKineticsAccessoryProductListAsync(
        exampleRollerEntryList,
        "Kinetics Blockout Roller Blind",
      );

      expect(result.length).toBe(2);
      expect(result[0].quantity).toBe(2);
      expect(result[1].quantity).toBe(1);
    });
  });
});
