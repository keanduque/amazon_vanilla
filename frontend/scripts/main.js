import { formatPrice } from "./utils/helpers.js";
import { products } from "../data/products.js";
import { cart, addToCart } from "../data/cart.js";
import "../components/header.js";

const app = document.getElementById("app");
const headerEl = document.createElement("header-component");
app.prepend(headerEl);
RenderProductList();

const addedMessageTimeouts = {};

// button events
const btnAddToCartEl = document.querySelectorAll(".add-to-cart-button");
btnAddToCartEl.forEach((btn) => {
  btn.addEventListener("click", () => {
    const { productName, productId } = btn.dataset;

    addToCart({ productName, productId });
    updateCartQty();
    addedToCartDisplayMessage(productId);
  });
});

function addedToCartDisplayMessage(id) {
  const addedToCartDisplayMessageEl = document.querySelector(
    `.js-add-to-cart-${id}`
  );
  addedToCartDisplayMessageEl.classList.add("added-visible");

  const previousTimeoutId = addedMessageTimeouts[id];

  if (previousTimeoutId) {
    clearTimeout(previousTimeoutId);
  }

  const timeoutId = setTimeout(() => {
    addedToCartDisplayMessageEl.classList.remove("added-visible");
  }, 2000);

  addedMessageTimeouts[id] = timeoutId;
}

function updateCartQty() {
  const cartQtyEl = document.querySelector(".js-cart-qty");
  let cartQty = 0;

  console.log(cart);

  cart.map((cartItem) => {
    cartQty += cartItem.quantity;
  });
  cartQtyEl.innerHTML = cartQty;
}

function RenderProductList() {
  const productGridEl = document.querySelector(".products-grid");
  let productHTML = "";
  products.forEach((product) => {
    const {
      id,
      name,
      image,
      rating: { count },
      priceCents,
    } = product;

    productHTML += `
    <div class="product-container">
      <div class="product-image-container">
          <img class="product-image" src="frontend/${image}" />
      </div>
      <div class="product-name limit-text-to-2-lines">${name}</div>
      <div class="product-rating-container">
        <img class="product-rating-stars" src="frontend/images/ratings/rating-45.png" />
        <div class="product-rating-count link-primary">${count}</div>
      </div>
            
      <div class="product-price">$${formatPrice(priceCents)}</div>
      <div class="product-quantity-container">
        <select class='qty-selector js-qty-selector-${id}'>
           ${Array.from({ length: 10 })
             .map((_, i) => {
               const index = i + 1;
               return `<option value='${index}'>${index}</option>`;
             })
             .join("")}
        </select>
      </div>
      <div class="product-spacer"></div>
      
      <div class="added-to-cart js-add-to-cart-${id}">
        <img src="frontend/images/icons/checkmark.png" />Added
      </div>
      
      <button data-product-id='${id}' data-product-name='${name}' class="add-to-cart-button button-primary">Add to Cart</button>
    </div>`;
  });
  productGridEl.innerHTML = productHTML;
}
