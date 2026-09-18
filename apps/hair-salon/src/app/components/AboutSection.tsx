'use client';

import { useTranslations } from 'next-intl';
import workImage from '../images/work.jpg';

export function AboutSection() {
  const t = useTranslations();
  return (
    <section
      id="about"
      className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-2 lg:items-center lg:px-10"
    >
      <div
        className="aspect-[1365/1475] bg-cover bg-center"
        style={{ backgroundImage: `url(${workImage.src})` }}
      />
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#bc8a5f]">
          {t('stylistName')}
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
