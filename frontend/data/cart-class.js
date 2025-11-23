import { validDeliveryOption } from "./deliveryOptions.js";

class Cart {
  cartItems; // public property
  #localStorageKey; // private property

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
    if (!this.cartItems) {
      this.cartItems = [
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          productName: "Black and Gray Athletic Cotton Socks - 6 Pairs",
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          productName: "Intermediate Size Basketball",
          quantity: 1,
          deliveryOptionId: "2",
        },
      ];
    }
  }
  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }
  addToCart({ productId, productName = "" }) {
    const qtySelectorEl = document.querySelector(
      `.js-qty-selector-${productId}`
    );
    const selectedVal = qtySelectorEl ? Number(qtySelectorEl.value) : 1;
    let matchCartItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchCartItem = cartItem;
      }
    });

    if (matchCartItem) {
      matchCartItem.quantity += selectedVal;
    } else {
      this.cartItems.push({
        productId,
        productName,
        quantity: selectedVal || 1,
        deliveryOptionId: "1",
      });
    }
    this.saveToStorage();
  }
  deleteCartItem(id) {
    const index = this.cartItems.findIndex((item) => item.productId === id);

    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }

    this.saveToStorage();
  }
  updateCartQty(el) {
    if (!el) return;

    let cartQty = 0;

    this.cartItems.map((cartItem) => {
      cartQty += cartItem.quantity;
    });
    el.innerHTML = cartQty;
  }
  updateQty(productId, newQty) {
    this.cartItems.map((cartItem) => {
      if (cartItem.productId === productId) {
        cartItem.quantity = newQty;
        this.saveToStorage();
      }
    });

    return newQty;
  }
  updateDeliveryOption(productId, deliveryOptionId) {
    let matchCartItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchCartItem = cartItem;
      }
    });

    if (!matchCartItem) return;

    if (!validDeliveryOption(deliveryOptionId)) return;

    matchCartItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }
}

const cart = new Cart("amazon-cart-class");
cart.addToCart({
  productId: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
  productName: "6-Piece Nonstick, Carbon Steel Oven Bakeware Baking Set",
});
cart.addToCart({
  productId: "77919bbe-0e56-475b-adde-4f24dfed3a04",
  productName: "Luxury Towel Set - Graphite Gray",
});

// cart.#localStorageKey = "kean"; //Uncaught SyntaxError: Private field '#localStorageKey' must be declared in an enclosing class
// cart.#localStorage(); // Uncaught SyntaxError: Private field '#localStorage' must be declared in an enclosing class
console.log("cart", cart);

const businessCart = new Cart("business-cart-class");
console.log("businessCart", businessCart);
