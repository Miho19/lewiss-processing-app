// playground requires you to assign document definition to a variable called dd

const image =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=";

const header = {
  columns: [
    {
      width: "*",
      style: "headerLeft",
      stack: ["address line one", "address line two"],
    },
    { width: "*", image: image, style: "headerRight", fit: [25, 25] },
  ],
};

const blindNumber = {
  text: "Lewis's order for customer made kinetics blinds".toUpperCase(),
  marginTop: 14,
  marginBottom: 14,
};

const customerInformation = {
  columns: [
    {
      width: "auto",
      stack: [
        {
          columns: [
            { width: "*", text: "client" },
            { width: "*", text: "April" },
          ],
        },
        {
          columns: [
            { width: "*", text: "order" },
            { width: "*", text: "12345-67891" },
          ],
        },
      ],
    },
    {
      width: "*",
      text: "",
    },
    {
      width: "auto",
      stack: [
        {
          columns: [
            { width: "*", text: "Date" },
            { width: "*", text: "28/08/10", style: "headerRight" },
          ],
        },
        {
          columns: [
            { width: "*", text: "Consultant" },
            { width: "*", text: "a really long name", style: "headerRight" },
          ],
        },
      ],
    },
  ],
  marginBottom: 14,
};

// location, width, height, fit, comb size, fabric, operation, operation side, headrail colour, size channel colour, butting, remote, remote channel, pricing

const columnString =
  "#, location, width, height, fit, comb size, fabric, operation, operation side, headrail colour, side Channel colour, butting, remote, remote channel, pricing";
const columns = columnString.split(",");

const x = columns.map((w) => {
  const column = w.trim();
  return {
    text: column.charAt(0).toUpperCase() + column.slice(1),
    alignment: "center",
    verticalAlignment: "middle",
  };
});

const tableBody = [[...x]];

let dummy1 = [
  "Kitchen",
  "1200",
  "900",
  "Inside",
  "10mm",
  "Translucent Cotton",
  "Cord",
  "Left",
  "White",
  "None",
  "No",
  "",
  "",
  "478.75",
].map((v) => {
  return {
    text: v,
    alignment: "center",
    verticalAlignment: "middle",
  };
});

let dummy2 = [
  "Kitchen",
  "1200",
  "900",
  "Inside",
  "10mm",
  "Translucent Cotton",
  "Cord",
  "Left",
  "White",
  "None",
  "No",
  "",
  "",
  "478.75",
].map((v) => {
  return {
    text: v,
    alignment: "center",
    verticalAlignment: "middle",
  };
});

dummy1.unshift({ text: "1", alignment: "center", verticalAlignment: "middle" });
dummy2.unshift({ text: "2", alignment: "center", verticalAlignment: "middle" });
tableBody.push(dummy1);
tableBody.push(dummy2);

const table = {
  marginBottom: 14,
  table: {
    headerRows: 1,
    widths: Array(columns.length).fill("auto"),
    body: tableBody,
  },

  layout: {
    paddingBottom: function (rowIndex, node) {
      if (rowIndex === 0) return 5;
      return 5;
    },
    paddingTop: function (rowIndex, node) {
      if (rowIndex === 1) return 15;
      return 5;
    },

    hLineWidth: function (rowIndex, node) {
      return 1;
    },

    vLineWidth: function (rowIndex, node) {
      return 1;
    },
  },
};

const priceTotal = {
  columns: [
    {
      stack: [
        {
          text: "Special Instructions: Please use Kinetics stickers on all blinds",
          bold: true,
        },
      ],
      width: "*",
    },
    {
      width: "auto",
      stack: [
        {
          columns: [
            {
              text: "4 x Lithium-ion",
              width: "auto",
              alignment: "left",
              noWrap: true,
            },
            { text: "", width: "*" },
            { text: "196.00", width: "*", alignment: "right" },
          ],
        },
        {
          columns: [
            {
              text: "1 x SmartLinkHub",
              width: "auto",
              alignment: "left",
              noWrap: true,
            },
            { text: "", width: "*" },
            { text: "152.00", width: "*", alignment: "right" },
          ],
        },
        {
          columns: [
            { text: "", width: "auto", alignment: "left", noWrap: true },
            { text: "", width: "*" },
            { text: "", width: "*", alignment: "right" },
          ],
        },
        {
          columns: [
            {
              text: "Blind Total",
              width: "auto",
              alignment: "left",
              noWrap: true,
            },
            { text: "", width: "*" },
            { text: "152.00", width: "*", alignment: "right" },
          ],
        },
        {
          columns: [
            { text: "GST", width: "auto", alignment: "left", noWrap: true },
            { text: "", width: "*" },
            { text: "152.00", width: "*", alignment: "right" },
          ],
        },
        {
          columns: [
            {
              text: "Total (GST Inc.)",
              width: "auto",
              alignment: "left",
              noWrap: true,
              bold: true,
            },
            { text: "", width: "*" },
            { text: "152.00", width: "*", alignment: "right", bold: true },
          ],
        },
      ],
    },
  ],
};

const deliverTo = {
  text: "Please deliver to Lewis's Home Fabrics Ltd, Warehouse 2, 25 Centennial Highway, Ngauranga, Wellington 6035",
};

var dd = {
  pageSize: "A4",
  pageOrientation: "landscape",
  content: [],
  styles: {
    headerLeft: { alignment: "left" },
    headerRight: { alignment: "right" },
  },

  footer: function (currentPage, pageCount) {
    return {
      text: currentPage.toString() + " of " + pageCount,
      alignment: "center",
    };
  },
};

dd.content.push(header);
dd.content.push(blindNumber);
dd.content.push(customerInformation);
dd.content.push(table);
dd.content.push(priceTotal);
dd.content.push(deliverTo);
