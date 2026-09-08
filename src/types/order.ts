export interface OrderItem {
  productId: number
  name: string
  price: number
  quantity: number
}

export interface Order {
  id: string
  customerName: string
  customerPhone: string
  items: OrderItem[]
  total: number
  createdAt: string
}
