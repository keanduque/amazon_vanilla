export const cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  },
];

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
    //localStorage.setcartItem("amazon-cart", JSON.stringify(cart));
  }
}

export function deleteCartItem(id) {
  const deleteItem = cart.filter((item) => item.productId !== id);

  cart.splice(deleteItem, 1);
}
