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

// Windoware Kinetics Pelmets Pricing 30/10/25
// 	240	1000	1250	1500	1750	2000	2250	2500	2750	3000	3250	3500	3750	4000	4250	4500	4750	5000	5250	5500
// 110 Inside	45.00	45.00	56.25	67.50	78.75	90.00	101.25	112.50	123.75	135.00	146.25	157.50	168.75	180.00	191.25	202.50	213.75	225.00	236.25	247.50
// 110 Outside	74.00	74.00	92.50	111.00	129.50	148.00	166.50	185.00	203.50	222.00	240.50	259.00	277.50	296.00	314.50	333.00	351.50	370.00	388.50	407.00
// 160 Inside	56.25	56.25	70.31	84.38	98.44	112.50	126.56	140.63	154.69	168.75	182.81	196.88	210.94	225.00	239.06	253.13	267.19	281.25	295.31	309.38
// 160 Outside	92.50	92.50	115.63	138.75	161.88	185.00	208.13	231.25	254.38	277.50	300.63	323.75	346.88	370.00	393.13	416.25	439.38	462.50	485.63	508.75
