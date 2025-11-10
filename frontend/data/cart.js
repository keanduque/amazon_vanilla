export const cart = [];

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
