(function () {
  const CART_KEY = 'aura-cart';

  function getCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
    window.dispatchEvent(new CustomEvent('cart:updated', { detail: cart }));
  }

  function addItem(item) {
    const cart = getCart();
    const existing = cart.find((i) => i.id === item.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...item, qty: 1 });
    }
    saveCart(cart);
  }

  function removeItem(id) {
    const cart = getCart().filter((i) => i.id !== id);
    saveCart(cart);
  }

  function updateQty(id, qty) {
    let cart = getCart();
    if (qty <= 0) {
      cart = cart.filter((i) => i.id !== id);
    } else {
      const item = cart.find((i) => i.id === id);
      if (item) item.qty = qty;
    }
    saveCart(cart);
  }

  function getTotal() {
    return getCart().reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  function getCount() {
    return getCart().reduce((sum, i) => sum + i.qty, 0);
  }

  function updateCartCount() {
    document.querySelectorAll('[data-cart-count]').forEach((el) => {
      el.textContent = getCount();
    });
  }

  function clearCart() {
    saveCart([]);
  }

  window.AuraCart = { getCart, addItem, removeItem, updateQty, getTotal, getCount, clearCart };

  document.addEventListener('DOMContentLoaded', updateCartCount);
  updateCartCount();
})();