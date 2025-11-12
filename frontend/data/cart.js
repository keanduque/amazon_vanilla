export const cart = JSON.parse(localStorage.getItem("amazon-cart")) || [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  },
];

export function saveToStorage() {
  localStorage.setItem("amazon-cart", JSON.stringify(cart));
}

export function addToCart(data) {
  const { productName, productId } = data;
  const qtySelectorEl = document.querySelector(`.js-qty-selector-${productId}`);
  const selectedVal = Number(qtySelectorEl.value);
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
    });
    saveToStorage();
  }
}

export function deleteCartItem(id) {
  const deleteItem = cart.filter((item) => item.productId !== id);

  cart.splice(deleteItem, 1);

  saveToStorage();
}

export function updateCartQty(el) {
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
