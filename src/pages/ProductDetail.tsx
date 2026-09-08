import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useProduct } from '../hooks/useProducts'
import { useCart } from '../hooks/useCart'
import { formatPrice } from '../lib/format'
import ProductImage from '../components/ProductImage'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const product = useProduct(id ? Number(id) : undefined)
  const { addItem } = useCart()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <h1 className="text-2xl font-semibold text-apple-text">
          Producto no encontrado
        </h1>
        <p className="mt-3 text-apple-subtext">
          El producto que buscas no existe o fue removido del catálogo.
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

  function handleAddToCart() {
    if (!product) return
    addItem(product, quantity)
  }

  function handleBuyNow() {
    if (!product) return
    addItem(product, quantity)
    navigate('/carrito')
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:py-20">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="aspect-square overflow-hidden rounded-apple bg-apple-gray shadow-apple">
          <ProductImage
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-apple-text sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-2xl font-medium text-apple-text">
            {formatPrice(product.price)}
          </p>
          <p className="mt-6 text-base leading-relaxed text-apple-subtext">
            {product.description}
          </p>

          <div className="mt-8 flex items-center gap-4">
            <span className="text-sm font-medium text-apple-text">
              Cantidad
            </span>
            <div className="flex items-center rounded-full border border-black/10">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-9 w-9 items-center justify-center text-lg text-apple-text transition hover:bg-black/5"
                aria-label="Disminuir cantidad"
              >
                –
              </button>
              <span className="w-8 text-center text-sm font-medium text-apple-text">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-9 w-9 items-center justify-center text-lg text-apple-text transition hover:bg-black/5"
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleBuyNow}
              className="rounded-full bg-apple-blue px-8 py-3 font-medium text-white transition duration-300 ease-apple hover:bg-apple-bluedark"
            >
              Comprar ahora
            </button>
            <button
              type="button"
              onClick={handleAddToCart}
              className="rounded-full bg-apple-gray px-8 py-3 font-medium text-apple-text transition duration-300 ease-apple hover:bg-black/10"
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
