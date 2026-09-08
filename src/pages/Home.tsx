import { useMemo, useState } from 'react'
import Hero from '../components/Hero'
import ProductGrid from '../components/ProductGrid'
import CategoryFilter, { ALL_CATEGORY } from '../components/CategoryFilter'
import { useProducts } from '../hooks/useProducts'

const CATEGORY_ORDER = [
  'Celulares',
  'Tablets y Computadores',
  'Watch',
  'Audifonos',
  'Parlantes',
  'Consolas',
  'Combos',
  'Accesorios',
]

export default function Home() {
  const products = useProducts()
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORY)

  const categories = useMemo(() => {
    const present = new Set(products.map((p) => p.category))
    const ordered = CATEGORY_ORDER.filter((c) => present.has(c))
    const extra = [...present]
      .filter((c) => !CATEGORY_ORDER.includes(c))
      .sort()
    return [...ordered, ...extra]
  }, [products])

  const filteredProducts = useMemo(() => {
    if (selectedCategory === ALL_CATEGORY) return products
    return products.filter((p) => p.category === selectedCategory)
  }, [products, selectedCategory])

  return (
    <div>
      <Hero />
      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <ProductGrid products={filteredProducts} />
    </div>
  )
}
