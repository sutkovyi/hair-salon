'use client';

import { useTranslations } from 'next-intl';
export function AboutSection() {
  const t = useTranslations();
  const services = t.raw('aboutServices') as string[];

  return (
    <section
      id="about"
      className="mx-auto grid max-w-7xl gap-10 px-5 py-24 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10 lg:py-28"
    >
      <div
        className="aspect-[4/3] bg-cover bg-center grayscale-[0.15] lg:aspect-[5/6]"
        style={{ backgroundImage: "url('/workspace.avif')" }}
      />
      <div>
        <h2 className="font-sans text-4xl font-semibold leading-tight text-[#211f1c] sm:text-5xl">
          {t('aboutTitle')}
        </h2>
        <p className="mt-5 leading-7 text-[#66645e]">
          {t('about')}
        </p>
        <div className="mt-3 leading-7 text-[#66645e]">
          <p>{t('aboutServicesIntro')}</p>
          <ul className="mt-3 list-disc space-y-1 pl-5 marker:text-[#c08d32]">
            {services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>
        <p className="mt-3 leading-7 text-[#66645e]">
          {t('aboutClosing')}
        </p>
      </div>
    </section>
  );
}
