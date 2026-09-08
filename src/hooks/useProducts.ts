import { useMemo } from 'react'
import productsData from '../data/products.json'
import type { Product } from '../types/product'

// Products without a photo are left out of the catalog entirely rather than
// shown with a placeholder image.
const products = (productsData as Product[]).filter((p) => p.image)

export function useProducts(): Product[] {
  return products
}

export function useProduct(id: number | undefined): Product | undefined {
  return useMemo(
    () => (id === undefined ? undefined : products.find((p) => p.id === id)),
    [id],
  )
}
