'use client';

import { useTranslations } from 'next-intl';

export function AboutSection() {
  const t = useTranslations();
  return (
    <section
      id="about"
      className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-2 lg:items-center lg:px-10"
    >
      <div className="min-h-[420px] bg-[url('https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1000&q=85')] bg-cover bg-center" />
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#bc8a5f]">
          L’Élégance
        </p>
        <h2 className="font-serif text-5xl leading-none sm:text-6xl">
          {t('aboutTitle')}
        </h2>
        <p className="mt-7 leading-7 text-[#6c757d]">{t('about')}</p>
        <p className="mt-4 leading-7 text-[#6c757d]">{t('aboutSecond')}</p>
      </div>
    </section>
  );
}
