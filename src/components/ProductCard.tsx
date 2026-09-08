import { Link } from 'react-router-dom'
import type { Product } from '../types/product'
import { formatPrice } from '../lib/format'
import ProductImage from './ProductImage'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to={`/producto/${product.id}`}
      className="group block overflow-hidden rounded-apple bg-apple-gray shadow-apple transition duration-300 ease-apple hover:shadow-apple-lg"
    >
      <div className="aspect-square overflow-hidden bg-white">
        <ProductImage
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-300 ease-apple group-hover:scale-[1.02]"
        />
      </div>
      <div className="px-5 py-4">
        <h3 className="text-base font-medium text-apple-text">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-apple-subtext">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  )
}
