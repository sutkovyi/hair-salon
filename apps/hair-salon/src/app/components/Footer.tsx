'use client';

import { useTranslations } from 'next-intl';

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
      <p className="mt-3">© 2026. {t('copyright')}</p>
    </footer>
  );
}
