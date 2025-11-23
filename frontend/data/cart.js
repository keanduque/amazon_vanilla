import { validDeliveryOption } from "./deliveryOptions.js";

export let cart = [];

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("amazon-cart")) || [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: "1",
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: "2",
    },
  ];
}

export function saveToStorage() {
  localStorage.setItem("amazon-cart", JSON.stringify(cart));
}

export function addToCart({ productName, productId }) {
  const qtySelectorEl = document.querySelector(`.js-qty-selector-${productId}`);
  const selectedVal = qtySelectorEl ? Number(qtySelectorEl.value) : 1;
  let matchCartItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchCartItem = cartItem;
    }
  });

  if (matchCartItem) {
    matchCartItem.quantity += selectedVal;
  } else {
    cart.push({
      productId,
      productName,
      quantity: selectedVal || 1,
      deliveryOptionId: "1",
    });
  }
  saveToStorage();
}

export function deleteCartItem(id) {
  const index = cart.findIndex((item) => item.productId === id);

  if (index !== -1) {
    cart.splice(index, 1);
  }

  saveToStorage();
}

export function updateCartQty(el) {
  if (!el) return;

  let cartQty = 0;

  cart.map((cartItem) => {
    cartQty += cartItem.quantity;
  });
  el.innerHTML = cartQty;
}

export function updateQty(productId, newQty) {
  cart.map((cartItem) => {
    if (cartItem.productId === productId) {
      cartItem.quantity = newQty;
      saveToStorage();
    }
  });

  return newQty;
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchCartItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchCartItem = cartItem;
    }
  });

  if (!matchCartItem) return;

  if (!validDeliveryOption(deliveryOptionId)) return;

  matchCartItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}
