import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import Logo from './Logo'

export default function Navbar() {
  const { totalItems } = useCart()

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur-xl backdrop-saturate-150">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          aria-label="puntocubico.com"
          className="flex items-center transition-opacity hover:opacity-70"
        >
          <Logo />
        </Link>

        <Link
          to="/carrito"
          aria-label="Ver carrito"
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-apple-text transition hover:bg-black/5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M6 6h15l-1.5 9h-12z" />
            <path d="M6 6 5 2H2" />
            <circle cx="9.5" cy="20" r="1.4" fill="currentColor" stroke="none" />
            <circle cx="17.5" cy="20" r="1.4" fill="currentColor" stroke="none" />
          </svg>

          {totalItems > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-apple-blue px-1 text-[10px] font-semibold leading-none text-white">
              {totalItems}
            </span>
          )}
        </Link>
      </nav>
    </header>
  )
}
