import type { Content } from "pdfmake";

export function getDeliverToText(): Content {
  return {
    text: "Please deliver to Lewis's Home Fabrics Ltd, Warehouse 2, 25 Centennial Highway, Ngauranga, Wellington 6035",
    alignment: "center",
    margin: [0, 10, 0, 10],
  };
}
