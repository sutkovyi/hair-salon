'use client';

import { useTranslations } from 'next-intl';
import { siteConfig } from '@/config/site';
import { button } from '../ui-variants';

export function Hero({ onBook }: { onBook: (location?: string) => void }) {
  const t = useTranslations();

  return (
    <section
      id="top"
      className="relative flex min-h-[720px] items-center overflow-hidden bg-[#211f1c] pt-[104px] text-white sm:min-h-[780px]"
    >
      <picture className="absolute inset-0 block h-full w-full">
        <source srcSet={siteConfig.media.heroImage.avif} type="image/avif" />
        <source srcSet={siteConfig.media.heroImage.webp} type="image/webp" />
        <img
          src={siteConfig.media.heroImage.fallback}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-[50%_34%]"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/15" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-14 lg:px-10">
        <p className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/25 bg-black/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm sm:text-sm">
          <span className="h-2 w-2 rounded-full bg-[#edbd58]" aria-hidden="true" />
          {t('eyebrow')}
        </p>
        <h1 className="max-w-5xl font-sans text-5xl font-semibold leading-[1.02] sm:text-7xl lg:text-8xl">
          {t('title')}
        </h1>
        <p className="mt-7 max-w-2xl text-lg font-light leading-8 text-white/90 sm:text-xl">
          {t('intro')}
        </p>
        {siteConfig.booking.enabled && (
          <button
            onClick={() => onBook('hero')}
            className={`${button({ size: 'hero' })} mt-9 !bg-[#edbd58] !text-[#211f1c] hover:!bg-[#f4cc78]`}
          >
            {t('book')} <span className="ml-2" aria-hidden="true">↗</span>
          </button>
        )}
      </div>
    </section>
  );
}
