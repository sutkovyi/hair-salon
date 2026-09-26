'use client';

import { useTranslations } from 'next-intl';
import { Scissors } from 'lucide-react';
import { AboutVideo } from './AboutVideo';

export function AboutSection() {
  const t = useTranslations();
  const services = t.raw('aboutServices') as string[];

  return (
    <section id="about" className="px-5 pt-8 pb-8 lg:px-10 lg:pt-12 lg:pb-12">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-[20px] bg-white p-5 shadow-[0_12px_36px_rgba(33,31,28,0.06)] sm:p-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12 lg:p-8">
        <figure className="relative m-0 aspect-[1768/2552] overflow-hidden rounded-[20px] bg-[#ede9df]">
          <AboutVideo
            title={t('aboutImageAlt')}
            playLabel={t('videoPlay')}
            pauseLabel={t('videoPause')}
          />
          <figcaption className="absolute bottom-4 left-4 rounded-full bg-[#faf7f2]/95 px-4 py-2 text-xs font-semibold text-[#211f1c] backdrop-blur-sm">
            {t('stylistName')}
          </figcaption>
        </figure>
        <div className="min-w-0">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#211f1c]/15 px-4 py-2 text-xs font-semibold uppercase text-[#211f1c]">
            <span
              className="h-2 w-2 rounded-full bg-[#e7b961]"
              aria-hidden="true"
            />
            {t('aboutTitle')}
          </p>
          <h2 className="font-sans text-4xl font-semibold leading-tight text-[#211f1c] sm:text-5xl">
            {t('stylistName')}
          </h2>
          <p className="mt-5 leading-7 text-[#66645e]">{t('about')}</p>
          <div className="mt-4 leading-7 text-[#66645e]">
            <p>{t('aboutServicesIntro')}</p>
            <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5">
              {services.map((service) => (
                <li key={service} className="flex items-center gap-2 text-sm">
                  <Scissors
                    className="h-4 w-4 shrink-0 text-[#9b6c23]"
                    aria-hidden="true"
                  />
                  {service}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 text-sm leading-6 text-[#66645e]">
            {t('aboutClosing')}
          </p>
        </div>
      </div>
    </section>
  );
}
