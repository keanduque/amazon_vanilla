import { products } from "../data/products.js";
import { cart } from "../data/cart.js";
import "../components/header.js";

const app = document.getElementById("app");
const headerEl = document.createElement("header-component");
app.prepend(headerEl);
RenderProductList();

// button events
const btnAddToCartEl = document.querySelectorAll(".add-to-cart-button");
btnAddToCartEl.forEach((btn) => {
  btn.addEventListener("click", () => {
    const productName = btn.dataset.productName;
    const productId = btn.dataset.productId;
    let matchItem;
    const qtySelectorEl = document.querySelector(
      `.js-qty-selector-${productId}`
    );
    const selectedVal = Number(qtySelectorEl.value);

    cart.forEach((item) => {
      if (productId === item.productId) {
        matchItem = item;
      }
    });

    if (matchItem) {
      matchItem.quantity += selectedVal;
    } else {
      cart.push({
        productId,
        productName,
        quantity: selectedVal || 1,
      });
    }
    cartDisplay();

    //localStorage.setItem("amazon-cart", JSON.stringify(cart));
    console.log("cart", cart);
  });
});

function cartDisplay() {
  const cartQtyEl = document.querySelector(".js-cart-qty");
  let cartQty = 0;

  cart.map((item) => {
    cartQty += item.quantity;
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

    let formatPrice = priceCents / 100;
    productHTML += `
    <div class="product-container">
      <div class="product-image-container">
          <img class="product-image" src="${image}" />
      </div>
      <div class="product-name limit-text-to-2-lines">${name}</div>
      <div class="product-rating-container">
        <img class="product-rating-stars" src="frontend/images/ratings/rating-45.png" />
        <div class="product-rating-count link-primary">${count}</div>
      </div>
            
      <div class="product-price">$${formatPrice.toFixed(2)}</div>
      <div class="product-quantity-container">
        <select class='qty-selector js-qty-selector-${id}'>
           ${Array.from({ length: 10 })
             .map((_, i) => {
               const index = i + 1;
               return `<option value='${index}'>${index}</option>`;
             })
             .join("")}
          <!--<option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>-->
        </select>
      </div>
      <div class="product-spacer"></div>
      
      <div class="added-to-cart">
        <img src="frontend/images/icons/checkmark.png" />Added
      </div>
      
      <button data-product-id='${id}' data-product-name='${name}' class="add-to-cart-button button-primary btn-add-to-cart">Add to Cart</button>
    </div>`;
  });
  productGridEl.innerHTML = productHTML;
}
