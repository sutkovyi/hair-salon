'use client';

import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations();
  return (
    <footer className="bg-[#2b2d42] px-5 py-4 text-center text-sm text-white/80">
      <p>© 2026. {t('copyright')}</p>
    </footer>
  );
}
