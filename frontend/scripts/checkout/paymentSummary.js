import { cart } from "../../data/cart.js";
import { getDeliveryOptions } from "../../data/deliveryOptions.js";
import { getProducts } from "../../data/products.js";
import { formatPrice } from "../utils/helpers.js";

export default function RenderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  cart.forEach((cartItem) => {
    const { productId, deliveryOptionId } = cartItem;
    const product = getProducts(productId);
    const matchingDeliveryOption = getDeliveryOptions(deliveryOptionId);
    const { priceCents: productPrice } = product;
    const { priceCents: deliveryPrice } = matchingDeliveryOption;

    productPriceCents += productPrice * cartItem.quantity;
    shippingPriceCents += deliveryPrice;
  });
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  const paymentSummaryHTML = `
    <div class="payment-summary-title">Order Summary</div>
    <div class="payment-summary-row">
      <div>Items (3):</div>
      <div class="payment-summary-money">$${formatPrice(
        productPriceCents
      )}</div>
    </div>
    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatPrice(
        shippingPriceCents
      )}</div>
    </div>
    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatPrice(
        totalBeforeTaxCents
      )}</div>
    </div>
    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatPrice(taxCents)}</div>
    </div>
    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatPrice(totalCents)}</div>
    </div>
    <button class="place-order-button button-primary">
      Place your order
    </button>`;

  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
}
