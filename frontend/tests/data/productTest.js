import { Product, products } from "../../data/products.js";

describe("Test suite: Product", () => {
  it("has correct properties and methods", () => {
    const product = new Product(products);
    console.log("product", product);
    // expect(product.name).toEqual("Intermediate Size Basketball");
    // expect(product.getPrice()).toEqual("$20.95");
  });
});
