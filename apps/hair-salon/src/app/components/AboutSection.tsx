'use client';

import { useTranslations } from 'next-intl';
import workImage from '../images/work.jpg';

export function AboutSection() {
  const t = useTranslations();
  const services = t.raw('aboutServices') as string[];

  return (
    <section
      id="about"
      className="mx-auto grid max-w-7xl gap-8 px-5 py-24 lg:grid-cols-2 lg:items-center lg:gap-10 lg:px-10"
    >
      <div
        className="aspect-[1365/1475] bg-cover bg-center"
        style={{ backgroundImage: `url(${workImage.src})` }}
      />
      <div>
        <h2 className="font-serif text-5xl leading-none sm:text-6xl">
          {t('aboutTitle')}
        </h2>
        <p className="mt-5 leading-7 text-[#6c757d]">
          {t('about')}
        </p>
        <div className="mt-3 leading-7 text-[#6c757d]">
          <p>{t('aboutServicesIntro')}</p>
          <ul className="mt-1 list-disc space-y-0.5 pl-5">
            {services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>
        <p className="mt-3 leading-7 text-[#6c757d]">
          {t('aboutClosing')}
        </p>
      </div>
    </section>
  );
}
