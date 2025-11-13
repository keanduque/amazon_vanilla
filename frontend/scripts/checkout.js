import { formatDate, formatPrice } from "./utils/helpers.js";
import {
  cart,
  deleteCartItem,
  updateCartQty,
  updateDeliveryOption,
  updateQty,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { deliveryOptions } from "../data/deliveryOptions.js";

RenderCartOrder();

export function RenderCartOrder() {
  const orderSummaryEl = document.querySelector(".js-order-summary");
  let cartSummaryHTML = "";
  let matchingProduct;
  let matchingDeliveryOption;

  cart.forEach((cartItem) => {
    products.map((product) => {
      if (product.id === cartItem.productId) {
        matchingProduct = product;
      }
    });

    const { id, name, priceCents, image } = matchingProduct;

    deliveryOptions.forEach((deliveryOption) => {
      if (cartItem.deliveryOptionId === deliveryOption.id) {
        matchingDeliveryOption = deliveryOption;
      }
    });

    const deliveryDate = formatDate(matchingDeliveryOption.deliveryDays);

    cartSummaryHTML += `
    <div class="cart-item-container" data-cart-item-id='${id}' >
      <div class="delivery-date js-delivery-date-option">Delivery date: ${deliveryDate}</div>

      <div class="cart-item-details-grid">
        <img class="product-image" src="../${image}" />

        <div class="cart-item-details">
          <div class="product-name">${name}</div>
          <div class="product-price">$${formatPrice(priceCents)}</div>
          <div class="product-quantity js-quantity-container" data-product-id='${id}' data-testid='quantity-container'>
            <span>
                Quantity: <span class="quantity-label js-qty-label" data-testid="quantity-label">${
                  cartItem.quantity
                }</span>
            </span>
            <span class="update-quantity-link link-primary js-btn-update" data-product-id="${id}" data-testid="update-quantity-link">
                Update
            </span>
            <input type="number" class="quantity-input" value="${
              cartItem.quantity
            }" data-product-id="${id}" data-testid="save-quantity-link" />
            <span class="save-quantity-link link-primary js-btn-save" data-product-id="${id}">Save</span>
            <span class="delete-quantity-link link-primary js-btn-delete" data-product-id="${id}" data-testid="delete-quantity-link">
                Delete
            </span>
          </div>
        </div>

        <div class="delivery-options js-delivery-options-display">
          <div class="delivery-options-title">Choose a delivery option:</div>
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>`;
  });

  orderSummaryEl.innerHTML = cartSummaryHTML;
  const checkoutQtyEl = document.querySelector(".js-checkout-qty");

  updateCartQty(checkoutQtyEl);

  const btnDeleteEl = document.querySelectorAll(".js-btn-delete");

  btnDeleteEl.forEach((btn) => {
    btn.addEventListener("click", () => {
      const { productId } = btn.dataset;
      const { cartItemContainerEl } = cartItemContainer(productId);
      deleteCartItem(productId);
      updateCartQty(checkoutQtyEl);
      cartItemContainerEl.remove();
    });
  });

  const btnUpdateEl = document.querySelectorAll(".js-btn-update");
  btnUpdateEl.forEach((btn) => {
    btn.addEventListener("click", () => {
      const { productId } = btn.dataset;
      const quantityContainerEl = quantityContainer(productId);
      quantityContainerEl.classList.add("is-editing-quantity");
    });
  });

  const btnSaveEl = document.querySelectorAll(".js-btn-save");
  btnSaveEl.forEach((btn) => {
    btn.addEventListener("click", () => {
      const { productId } = btn.dataset;
      const { quantityInput, quantityLabel } = cartItemContainer(productId);

      saveQty(checkoutQtyEl, productId, quantityLabel, quantityInput);
    });
  });
  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.addEventListener("keydown", (e) => {
      const input = e.currentTarget;
      const { productId } = input.dataset;
      const { quantityInput, quantityLabel } = cartItemContainer(productId);

      if (e.key === "Enter") {
        saveQty(checkoutQtyEl, productId, quantityLabel, quantityInput, input);
      }
    });
  });
}

function saveQty(checkoutQtyEl, productId, quantityLabel, quantityInput) {
  const quantityContainerEl = quantityContainer(productId);
  quantityContainerEl.classList.remove("is-editing-quantity");
  const qtyValue = Number(quantityInput.value);

  if (qtyValue >= 1 && qtyValue <= 1000) {
    updateQty(productId, qtyValue);
    updateCartQty(checkoutQtyEl);

    quantityLabel.innerHTML = qtyValue;
  } else {
    alert("Not a valid Quantity!");
  }
}
function cartItemContainer(productId) {
  const cartItemContainerEl = document.querySelector(
    `.cart-item-container[data-cart-item-id="${productId}"]`
  );
  const quantityInput = cartItemContainerEl.querySelector(".quantity-input");
  const quantityLabel = cartItemContainerEl.querySelector(".quantity-label");
  return { cartItemContainerEl, quantityInput, quantityLabel };
}

function quantityContainer(productId) {
  const quantityContainer = document.querySelector(
    `.cart-item-container[data-cart-item-id="${productId}"] .product-quantity`
  );
  return quantityContainer;
}

function deliveryOptionsHTML(matchingProduct, cartItem) {
  let deliveryHTML = "";

  deliveryOptions.forEach((delivery) => {
    const { id, deliveryDays, priceCents } = delivery;
    const deliveryDate = formatDate(deliveryDays);
    const deliveryPrice = priceCents ? `$${formatPrice(priceCents)}` : `FREE`;
    const isChecked = id === cartItem.deliveryOptionId;

    deliveryHTML += ` 
        <div class="delivery-option js-delivery-option" data-delivery-option-id="${id}" data-product-id="${
      matchingProduct.id
    }">
            <input
                type="radio"
                ${isChecked ? "checked" : ""}
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}"
                data-option-input="${matchingProduct.id}"
               
            />
            <div>
                <div class="delivery-option-date">${deliveryDate}</div>
                <div class="delivery-option-price">${deliveryPrice} Shipping</div>
            </div>
        </div>`;
  });

  return deliveryHTML;
}
document.querySelectorAll(".js-delivery-option").forEach((option) => {
  option.addEventListener("click", (e) => {
    const option = e.currentTarget;
    const { productId, deliveryOptionId } = option.dataset;

    updateDeliveryOption(productId, deliveryOptionId);
  });
});
