'use client';

import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations();
  return (
    <footer className="bg-[#2b2d42] px-5 py-9 text-center text-sm text-white/80">
      <p className="font-serif text-3xl text-white">
        {t('stylistName')}<span className="text-[#d4a373]">.</span>
      </p>
      <p className="mt-3">
        © 2026 {t('stylistName')}. {t('copyright')}
      </p>
    </footer>
  );
}
