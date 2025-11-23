import {
  addToCart,
  cart,
  deleteCartItem,
  loadFromStorage,
  updateDeliveryOption,
} from "../../data/cart.js";

const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";

describe("Test suite: addToCart", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
  });
  it("adds an existing product to the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });
    loadFromStorage();

    addToCart({
      productId: productId1,
    });
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "amazon-cart",
      JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: "1",
        },
      ])
    );
  });

  it("adds a new product to the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();

    addToCart({
      productId: productId1,
    });
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "amazon-cart",
      JSON.stringify([
        {
          productId: productId1,
          quantity: 1,
          deliveryOptionId: "1",
        },
      ])
    );
  });
});

describe("Test suite: deleteCartItem", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });
    loadFromStorage();
  });
  it("removes a product from the cart", () => {
    deleteCartItem(productId1);
    expect(cart.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "amazon-cart",
      JSON.stringify([])
    );
  });

  it("does nothing if product is not in the cart", () => {
    deleteCartItem("does-not-exist");
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "amazon-cart",
      JSON.stringify([
        {
          productId: productId1,
          quantity: 1,
          deliveryOptionId: "1",
        },
      ])
    );
  });
});

describe("Test suite: updateDeliveryOption", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });
    loadFromStorage();
  });
  it("update the delivery option of a productId in the cart", () => {
    updateDeliveryOption(productId1, "3");
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual("3");
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "amazon-cart",
      JSON.stringify([
        {
          productId: productId1,
          quantity: 1,
          deliveryOptionId: "3",
        },
      ])
    );
  });

  it("does nothing if the product is not in the cart", () => {
    updateDeliveryOption("does-not-exist", 3);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual("1");
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

  it("does nothing if the delivery option does not exist", () => {
    updateDeliveryOption(productId1, "does-not-exist");
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual("1");
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});
