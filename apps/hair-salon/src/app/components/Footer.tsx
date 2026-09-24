'use client';

import { useTranslations } from 'next-intl';
import { siteConfig } from '@/config/site';

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-[#2b2d42] px-5 py-5 text-center text-sm text-white/80">
      {/* Legal links are temporarily hidden until the documents are finalized. */}
      {/*
      <div className="mx-auto flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4">
        <a href="/privacy">{t('nav.privacy')}</a>
        <a href="/terms">{t('nav.terms')}</a>
      </div>
      */}
      <a
        href={siteConfig.location.googleMapsUrl}
        target="_blank"
        rel="noreferrer"
        className="mx-auto block max-w-xl text-xs leading-5 text-white/70 transition hover:text-white"
      >
        {t('address')}
      </a>
      <p className="mt-3">© 2026. {t('copyright')}</p>
    </footer>
  );
}
