// Cart store đơn giản bằng localStorage
const KEY = "cart_items_v1";

export function loadCart() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; }
  catch { return []; }
}

export function saveCart(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function addItem(item) {
  const items = loadCart();
  const idx = items.findIndex(i => i.id === item.id && i.variant === item.variant);
  if (idx !== -1) {
    items[idx].qty += item.qty || 1;
  } else {
    items.push({ ...item, qty: item.qty || 1 });
  }
  saveCart(items);
  return items;
}

export function updateQty(id, variant, qty) {
  const items = loadCart().map(i => (i.id === id && i.variant === variant ? { ...i, qty } : i));
  saveCart(items);
  return items;
}

export function removeItem(id, variant) {
  const items = loadCart().filter(i => !(i.id === id && i.variant === variant));
  saveCart(items);
  return items;
}

export function clearCart() {
  saveCart([]);
  return [];
}

export function cartTotals(items) {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = 0;
  const shipping = subtotal > 1000000 ? 0 : 30000; // miễn phí ship > 1tr
  const tax = 0;
  const total = subtotal - discount + shipping + tax;
  return { subtotal, discount, shipping, tax, total };
}
