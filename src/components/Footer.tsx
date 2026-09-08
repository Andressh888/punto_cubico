import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-apple-gray">
      <div className="mx-auto max-w-6xl px-6 py-10 text-center text-sm text-apple-subtext">
        <p className="font-medium text-apple-text">puntocubico.com</p>
        <p className="mt-2">
          Celulares, tablets, watches y accesorios — nuevos y seminuevos,
          con la calidad que esperas.
        </p>
        <p className="mt-6 text-xs">
          © {new Date().getFullYear()} puntocubico.com — Todos los derechos
          reservados.
        </p>
        <p className="mt-2 text-xs">
          <Link
            to="/pedidos"
            className="underline-offset-2 hover:text-apple-text hover:underline"
          >
            Ver pedidos
          </Link>
        </p>
      </div>
    </footer>
  )
}
