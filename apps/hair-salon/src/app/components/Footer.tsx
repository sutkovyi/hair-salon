'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { siteConfig } from '@/config/site';

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-[#2b2d42] px-5 py-5 text-center text-sm text-white/80">
      <div className="mx-auto mb-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        <Link className="transition hover:text-white" href="/privacy">{t('nav.privacy')}</Link>
        <Link className="transition hover:text-white" href="/terms">{t('nav.terms')}</Link>
        <Link className="transition hover:text-white" href="/cookies">{t('nav.cookies')}</Link>
      </div>
      <p className="mt-3">© 2026. {t('copyright')}</p>
    </footer>
  );
}
