/**
 * Cart Drawer - Slide-out shopping cart
 * Handles cart display, quantity updates, and checkout flow
 */

class CartDrawer {
  constructor() {
    this.drawer = document.getElementById('cartDrawer');
    this.overlay = document.getElementById('cartDrawerOverlay');
    this.closeBtn = document.getElementById('closeCartDrawer');
    this.continueShoppingBtn = document.getElementById('continueShopping');
    this.itemsContainer = document.getElementById('cartDrawerItems');
    this.subtotalEl = document.getElementById('cartSubtotal');
    this.totalEl = document.getElementById('cartTotal');
    this.init();
  }

  init() {
    this.closeBtn.addEventListener('click', () => this.close());
    this.overlay.addEventListener('click', () => this.close());
    this.continueShoppingBtn.addEventListener('click', () => this.close());
    window.addEventListener('cart:updated', () => this.open());
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });
  }

  open() {
    this.drawer.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.loadCart();
  }

  close() {
    this.drawer.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  async loadCart() {
    try {
      const response = await fetch('/cart.json');
      const data = await response.json();
      this.renderCart(data);
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }

  renderCart(data) {
    const items = data.items;

    if (items.length === 0) {
      this.itemsContainer.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
      this.subtotalEl.textContent = '$0.00';
      this.totalEl.textContent = '$0.00';
      return;
    }

    let html = '';
    items.forEach((item) => {
      html += `
        <div class="cart-item">
          <img src="${item.featured_image.url}" alt="${item.title}" class="cart-item-image">
          <div class="cart-item-details">
            <h4 class="cart-item-title">${item.title}</h4>
            <p class="cart-item-price">${this.formatMoney(item.price)}</p>
            <div class="cart-item-qty">
              <button data-key="${item.key}" class="qty-btn qty-decrease">−</button>
              <input type="number" value="${item.quantity}" min="1" class="qty-input" readonly>
              <button data-key="${item.key}" class="qty-btn qty-increase">+</button>
            </div>
            <button class="cart-item-remove" data-key="${item.key}">Remove</button>
          </div>
        </div>
      `;
    });

    this.itemsContainer.innerHTML = html;
    this.attachEventListeners();
    this.updateTotals(data);
  }

  attachEventListeners() {
    document.querySelectorAll('.qty-decrease').forEach((btn) => {
      btn.addEventListener('click', (e) => this.updateQuantity(e.target.dataset.key, -1));
    });

    document.querySelectorAll('.qty-increase').forEach((btn) => {
      btn.addEventListener('click', (e) => this.updateQuantity(e.target.dataset.key, 1));
    });

    document.querySelectorAll('.cart-item-remove').forEach((btn) => {
      btn.addEventListener('click', (e) => this.removeItem(e.target.dataset.key));
    });
  }

  async updateQuantity(key, delta) {
    try {
      const response = await fetch('/cart.json');
      const data = await response.json();
      const item = data.items.find((i) => i.key === key);
      const newQuantity = Math.max(0, item.quantity + delta);

      await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, quantity: newQuantity }),
      });

      this.loadCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  }

  async removeItem(key) {
    try {
      await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, quantity: 0 }),
      });
      this.loadCart();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  }

  updateTotals(data) {
    const subtotal = data.total_price / 100;
    this.subtotalEl.textContent = this.formatMoney(data.total_price);
    this.totalEl.textContent = this.formatMoney(data.total_price);
  }

  formatMoney(cents) {
    return '$' + (cents / 100).toFixed(2);
  }
}

// Initialize cart drawer
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new CartDrawer();
  });
} else {
  new CartDrawer();
}
