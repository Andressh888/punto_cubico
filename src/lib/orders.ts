import type { CartItem } from '../types/product'
import type { Order } from '../types/order'

// Standalone order log: this file is the only place in the app that reads or
// writes it, so it can be deleted (or swapped for a real backend call) later
// without touching anything else. For now, "the JSON" lives in the browser's
// localStorage as a JSON array — there is no server in this project to write
// a file to disk, so each customer's own browser holds their submitted
// order(s) under this key.
const STORAGE_KEY = 'puntocubico:orders'

function readOrders(): Order[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeOrders(orders: Order[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
  } catch {
    // Storage unavailable (e.g. private browsing) — fail silently.
  }
}

export function saveOrder(
  customerName: string,
  customerPhone: string,
  items: CartItem[],
  total: number,
): Order {
  const order: Order = {
    id: `order_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    customerName: customerName.trim(),
    customerPhone: customerPhone.trim(),
    items: items.map((item) => ({
      productId: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
    })),
    total,
    createdAt: new Date().toISOString(),
  }

  const orders = readOrders()
  orders.push(order)
  writeOrders(orders)
  return order
}

export function getOrders(): Order[] {
  return readOrders()
}
