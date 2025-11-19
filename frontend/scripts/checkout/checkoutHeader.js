export default function RenderCheckoutHeader() {
  const checkoutHeaderEl = document.querySelector(".js-checkout-header");
  const html = `      
    <div class="header-content">
        <div class="checkout-header-left-section">
        <a href="/">
            <img class="amazon-logo" src="../images/amazon-logo.png" />
            <img
            class="amazon-mobile-logo"
            src="../images/amazon-mobile-logo.png"
            />
        </a>
        </div>

        <div class="checkout-header-middle-section">
        Checkout (<a class="return-to-home-link js-checkout-qty" href="/"
            >0</a
        >)
        </div>

        <div class="checkout-header-right-section">
        <img src="../images/icons/checkout-lock-icon.png" />
        </div>
    </div>`;
  checkoutHeaderEl.innerHTML = html;
}
