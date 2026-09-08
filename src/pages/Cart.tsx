import { Link } from 'react-router-dom'
import { useState, type FormEvent } from 'react'
import { useCart } from '../hooks/useCart'
import { formatPrice } from '../lib/format'
import { saveOrder } from '../lib/orders'
import ProductImage from '../components/ProductImage'

export default function Cart() {
  const { items, totalPrice, updateQuantity, removeItem, clearCart } =
    useCart()
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <h1 className="text-2xl font-semibold text-apple-text">
          ¡Pedido recibido!
        </h1>
        <p className="mt-3 text-apple-subtext">
          Pronto estaremos en contacto contigo para confirmar los detalles de
          tu compra.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-full bg-apple-blue px-6 py-3 font-medium text-white transition hover:bg-apple-bluedark"
        >
          Volver al inicio
        </Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <h1 className="text-2xl font-semibold text-apple-text">
          Tu carrito está vacío
        </h1>
        <p className="mt-3 text-apple-subtext">
          Explora el catálogo y encuentra tu próximo equipo.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-full bg-apple-blue px-6 py-3 font-medium text-white transition hover:bg-apple-bluedark"
        >
          Ver colección
        </Link>
      </div>
    )
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) return

    saveOrder(name, phone, items, totalPrice)
    clearCart()
    setSubmitted(true)
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-apple-text">
        Tu carrito
      </h1>

      <ul className="mt-8 divide-y divide-black/5">
        {items.map(({ product, quantity }) => (
          <li key={product.id} className="flex items-center gap-4 py-6">
            <Link
              to={`/producto/${product.id}`}
              className="h-20 w-20 shrink-0 overflow-hidden rounded-apple bg-apple-gray"
            >
              <ProductImage
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </Link>

            <div className="min-w-0 flex-1">
              <Link
                to={`/producto/${product.id}`}
                className="block truncate text-base font-medium text-apple-text transition hover:opacity-70"
              >
                {product.name}
              </Link>
              <p className="mt-1 text-sm text-apple-subtext">
                {formatPrice(product.price)}
              </p>

              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center rounded-full border border-black/10">
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(product.id, quantity - 1)
                    }
                    className="flex h-8 w-8 items-center justify-center text-base text-apple-text transition hover:bg-black/5"
                    aria-label="Disminuir cantidad"
                  >
                    –
                  </button>
                  <span className="w-7 text-center text-sm font-medium text-apple-text">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(product.id, quantity + 1)
                    }
                    className="flex h-8 w-8 items-center justify-center text-base text-apple-text transition hover:bg-black/5"
                    aria-label="Aumentar cantidad"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(product.id)}
                  className="text-sm text-apple-subtext underline-offset-2 transition hover:text-apple-text hover:underline"
                >
                  Eliminar
                </button>
              </div>
            </div>

            <p className="shrink-0 text-base font-medium text-apple-text">
              {formatPrice(product.price * quantity)}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center justify-between border-t border-black/10 pt-6">
        <span className="text-lg font-medium text-apple-text">Total</span>
        <span className="text-lg font-semibold text-apple-text">
          {formatPrice(totalPrice)}
        </span>
      </div>

      {!showForm ? (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="mt-6 w-full rounded-full bg-apple-blue py-3 text-center font-medium text-white transition duration-300 ease-apple hover:bg-apple-bluedark"
        >
          Finaliza tu pedido con nosotros
        </button>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-6 rounded-apple bg-apple-gray p-6"
        >
          <p className="text-sm text-apple-subtext">
            Completa tus datos y muy pronto nos pondremos en contacto
            contigo para confirmar los detalles de tu pedido.
          </p>

          <div className="mt-5">
            <label
              htmlFor="checkout-name"
              className="block text-sm font-medium text-apple-text"
            >
              Nombre completo <span className="text-red-500">*</span>
            </label>
            <input
              id="checkout-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              className="mt-1.5 w-full rounded-apple border border-black/10 bg-white px-4 py-2.5 text-sm text-apple-text outline-none transition focus:border-apple-blue"
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="checkout-phone"
              className="block text-sm font-medium text-apple-text"
            >
              Número de celular <span className="text-red-500">*</span>
            </label>
            <input
              id="checkout-phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ej: 300 123 4567"
              className="mt-1.5 w-full rounded-apple border border-black/10 bg-white px-4 py-2.5 text-sm text-apple-text outline-none transition focus:border-apple-blue"
            />
          </div>

          <div className="mt-5">
            <p className="text-sm font-medium text-apple-text">
              Producto{items.length > 1 ? 's' : ''} seleccionado
              {items.length > 1 ? 's' : ''}
            </p>
            <ul className="mt-1.5 space-y-1 text-sm text-apple-subtext">
              {items.map(({ product, quantity }) => (
                <li key={product.id}>
                  {product.name} × {quantity}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              className="rounded-full bg-apple-blue px-8 py-3 font-medium text-white transition duration-300 ease-apple hover:bg-apple-bluedark"
            >
              Enviar pedido
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-full bg-black/5 px-8 py-3 font-medium text-apple-text transition hover:bg-black/10"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
