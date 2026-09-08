export default function Hero() {
  return (
    <section className="bg-apple-white px-6 pb-16 pt-24 text-center sm:pb-20 sm:pt-32">
      <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight text-apple-text sm:text-6xl">
        La tecnología que buscas, al mejor precio.
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-lg font-normal text-apple-subtext sm:text-xl">
        Celulares, tablets, watches y accesorios nuevos y seminuevos,
        verificados y listos para ti.
      </p>
      <div className="mt-8 flex items-center justify-center gap-4 text-base">
        <a
          href="#coleccion"
          className="rounded-full bg-apple-blue px-6 py-3 font-medium text-white transition hover:bg-apple-bluedark"
        >
          Explorar la colección
        </a>
      </div>
    </section>
  )
}
