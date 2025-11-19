import { formatPrice } from "../../scripts/utils/helpers.js";

describe("Test suite: formatPrice", () => {
  it("Converts Cents into Dollars", () => {
    expect(formatPrice(2095)).toEqual("20.95");
  });

  it("Works with 0", () => {
    expect(formatPrice(0)).toEqual("0.00");
  });

  it("Rounds up to the nearest cent", () => {
    expect(formatPrice(2000.5)).toEqual("20.01");
  });
});
