import { validDeliveryOption } from "./deliveryOptions.js";

function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,
    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
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
    },
    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
    addToCart({ productName, productId }) {
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
    },
    deleteCartItem(id) {
      const index = this.cartItems.findIndex((item) => item.productId === id);

      if (index !== -1) {
        this.cartItems.splice(index, 1);
      }

      this.saveToStorage();
    },
    updateCartQty(el) {
      if (!el) return;

      let cartQty = 0;

      this.cartItems.map((cartItem) => {
        cartQty += cartItem.quantity;
      });
      el.innerHTML = cartQty;
    },
    updateQty(productId, newQty) {
      this.cartItems.map((cartItem) => {
        if (cartItem.productId === productId) {
          cartItem.quantity = newQty;
          this.saveToStorage();
        }
      });

      return newQty;
    },
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
    },
  };

  return cart;
}

const cart = Cart("amazon-cart-oop");
console.log("cart", cart);
cart.loadFromStorage();

const businessCart = Cart("business-cart");
businessCart.loadFromStorage();
console.log("cart", businessCart);
