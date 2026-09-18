'use client';

import { useTranslations } from 'next-intl';
import heroImage from '../images/workspace.jpg';

export function Hero({ onBook }: { onBook: () => void }) {
  const t = useTranslations();
  return (
    <section
      id="top"
      className="relative flex min-h-[720px] items-center bg-cover bg-center pt-[72px] text-center text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.38),rgba(0,0,0,.38)), url(${heroImage.src})`,
      }}
    >
      <div className="mx-auto max-w-3xl px-6">
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
          onClick={onBook}
          className="mt-9 rounded-full bg-[#d4a373] px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] transition hover:-translate-y-1 hover:bg-[#bc8a5f]"
        >
          {t('book')} <span className="ml-2">↗</span>
        </button>
      </div>
    </section>
  );
}
