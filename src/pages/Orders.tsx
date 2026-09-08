import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getOrders } from '../lib/orders'
import { formatPrice } from '../lib/format'
import type { Order } from '../types/order'

function downloadOrders(orders: Order[]) {
  const blob = new Blob([JSON.stringify(orders, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `pedidos-${new Date().toISOString().slice(0, 10)}.json`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>(() => getOrders())

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight text-apple-text">
          Pedidos
        </h1>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setOrders(getOrders())}
            className="rounded-full bg-apple-gray px-5 py-2.5 text-sm font-medium text-apple-text transition hover:bg-black/10"
          >
            Actualizar
          </button>
          <button
            type="button"
            onClick={() => downloadOrders(orders)}
            disabled={orders.length === 0}
            className="rounded-full bg-apple-blue px-5 py-2.5 text-sm font-medium text-white transition hover:bg-apple-bluedark disabled:cursor-not-allowed disabled:opacity-40"
          >
            Exportar JSON
          </button>
        </div>
      </div>

      <p className="mt-2 text-sm text-apple-subtext">
        Estos pedidos se guardan en el navegador actual (localStorage) — cada
        cliente ve solo los suyos. Usa "Exportar JSON" para descargarlos y
        revisarlos o compartirlos.
      </p>

      {orders.length === 0 ? (
        <p className="mt-16 text-center text-apple-subtext">
          Todavía no hay pedidos guardados en este navegador. Completa una
          compra de prueba desde el carrito para ver cómo se ve aquí.
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-apple border border-black/10">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-apple-gray text-apple-subtext">
              <tr>
                <th className="px-4 py-3 font-medium">Fecha</th>
                <th className="px-4 py-3 font-medium">Nombre</th>
                <th className="px-4 py-3 font-medium">Celular</th>
                <th className="px-4 py-3 font-medium">Productos</th>
                <th className="px-4 py-3 text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {[...orders].reverse().map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-3 align-top whitespace-nowrap text-apple-subtext">
                    {new Date(order.createdAt).toLocaleString('es-CO')}
                  </td>
                  <td className="px-4 py-3 align-top font-medium text-apple-text">
                    {order.customerName}
                  </td>
                  <td className="px-4 py-3 align-top whitespace-nowrap text-apple-text">
                    {order.customerPhone}
                  </td>
                  <td className="px-4 py-3 align-top text-apple-subtext">
                    <ul className="space-y-0.5">
                      {order.items.map((item) => (
                        <li key={item.productId}>
                          {item.name} × {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-3 align-top whitespace-nowrap text-right font-medium text-apple-text">
                    {formatPrice(order.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Link
        to="/"
        className="mt-8 inline-block text-sm text-apple-subtext underline-offset-2 transition hover:text-apple-text hover:underline"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
