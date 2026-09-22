export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#faf7f2] px-5 py-16 text-[#2b2d42]">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[min(72vw,34rem)] w-[min(72vw,34rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d4a373]/35" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[min(56vw,26rem)] w-[min(56vw,26rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d4a373]/20" />
      <div className="relative w-full max-w-2xl text-center">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-[#bc8a5f]">
          Nataliia Krasovska.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <span className="h-px w-12 bg-[#d4a373]" />
          <span className="font-serif text-7xl leading-none text-[#d4a373] sm:text-9xl">404</span>
          <span className="h-px w-12 bg-[#d4a373]" />
        </div>
        <h1 className="mt-8 font-serif text-4xl sm:text-5xl">This page took a wrong turn.</h1>
        <p className="mx-auto mt-5 max-w-md leading-7 text-[#6c757d]">
          The page you are looking for does not exist or has moved. Let&apos;s get you back to the salon.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="/uk"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#2b2d42] px-7 text-sm font-semibold text-white transition-colors hover:bg-[#bc8a5f]"
          >
            Back to home
          </a>
          <a
            href="/sitemap.xml"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#2b2d42]/20 px-7 text-sm font-semibold transition-colors hover:border-[#bc8a5f] hover:text-[#bc8a5f]"
          >
            Browse sitemap
          </a>
        </div>
        <p className="mt-12 text-xs uppercase tracking-[0.18em] text-[#6c757d]">
          Hair stylist · Valencia
        </p>
      </div>
    </main>
  );
}