import { test } from "vitest";
import { getKineticsCellularFabricPrice } from "../../../src/utility/pricing/kineticsCellularPricing";
import kineticsCellularPricing from "./kinetics-cellular-pricing-example.json";

test("spreadsheet function", () => {
  const result = getKineticsCellularFabricPrice(
    1801,
    1901,
    "Translucent",
    kineticsCellularPricing,
  );

  console.log(result);
});
