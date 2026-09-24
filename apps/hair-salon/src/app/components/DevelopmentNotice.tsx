'use client';

import { useTranslations } from 'next-intl';

export function DevelopmentNotice() {
  const t = useTranslations();

  return (
    <div className="flex min-h-8 items-center justify-center bg-[#2b2d42] px-4 py-1.5 text-center text-[11px] font-medium leading-4 text-white">
      {t('developmentNotice')}
    </div>
  );
}
