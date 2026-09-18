'use client';

import { useTranslations } from 'next-intl';

export function Hero({ onBook }: { onBook: (location?: string) => void }) {
  const t = useTranslations();

  return (
    <section
      id="top"
      className="relative flex min-h-[720px] items-center overflow-hidden bg-cover bg-center pt-[72px] text-center text-white"
      style={{
        backgroundImage: "url('/workspace-placeholder.jpg')",
      }}
    >
      <picture className="absolute inset-0 block h-full w-full">
        <source srcSet="/workspace.avif" type="image/avif" />
        <img
          src="/workspace.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />
      </picture>
      <div className="absolute inset-0 bg-black/38" />
      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <p className="mb-5 text-xs font-medium uppercase tracking-[0.25em] text-[#f2d3ae]">
          {t('eyebrow')}
        </p>
        <h1 className="font-serif text-6xl leading-[.95] sm:text-8xl">
          {t('title')}
        </h1>
        <p className="mx-auto mt-7 max-w-xl text-lg font-light leading-8 text-white/90">
          {t('intro')}
        </p>
        <button
          onClick={() => onBook('hero')}
          className="mt-9 rounded-full bg-[#d4a373] px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] transition hover:-translate-y-1 hover:bg-[#bc8a5f]"
        >
          {t('book')} <span className="ml-2">↗</span>
        </button>
      </div>
    </section>
  );
}
