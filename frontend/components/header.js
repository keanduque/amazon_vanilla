class Header extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
        <div class="amazon-header">
            <div class="amazon-header-left-section">
                <a href="/" class="header-link">
                <img
                    class="amazon-logo"
                    src="frontend/images/amazon-logo-white.png"
                />
                <img
                    class="amazon-mobile-logo"
                    src="frontend/images/amazon-mobile-logo-white.png"
                />
                </a>
            </div>

            <div class="amazon-header-middle-section">
                <input class="search-bar" type="text" placeholder="Search" />

                <button class="search-button">
                <img
                    class="search-icon"
                    src="frontend/images/icons/search-icon.png"
                />
                </button>
            </div>

            <div class="amazon-header-right-section">
                <a class="orders-link header-link" href="frontend/pages/orders.html">
                <span class="returns-text">Returns</span>
                <span class="orders-text">& Orders</span>
                </a>

                <a class="cart-link header-link" href="frontend/pages/checkout.html">
                <img class="cart-icon" src="frontend/images/icons/cart-icon.png" />
                <div class="cart-quantity js-cart-qty"></div>
                <div class="cart-text">Cart</div>
                </a>
            </div>
        </div>`;
    console.log("Reusable HTML Components for Header added to page...");
  }
}
customElements.define("header-component", Header);

export default Header;
