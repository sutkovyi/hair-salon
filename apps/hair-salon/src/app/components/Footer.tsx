'use client';

import { useLocale, useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  const links = [
    { label: t('nav.privacy'), href: `/${locale}/privacy` },
    { label: t('nav.terms'), href: `/${locale}/terms` },
  ];

  return (
    <footer className="bg-[#2b2d42] px-5 py-5 text-center text-sm text-white/80">
      <div className="mx-auto flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            {link.label}
          </a>
        ))}
      </div>
      <p className="mt-3">© 2026. {t('copyright')}</p>
    </footer>
  );
}
