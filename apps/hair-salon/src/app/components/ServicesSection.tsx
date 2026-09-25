'use client';

import { useTranslations } from 'next-intl';
import {
  Baby,
  Scissors,
  Sparkles,
  WandSparkles,
  type LucideIcon,
} from 'lucide-react';
import { SectionHeading } from './SectionHeading';

type ServiceItem = {
  icon: 'baby' | 'wand-sparkles' | 'scissors' | 'sparkles';
  title: string;
  text: string;
};

const serviceIcons: Record<ServiceItem['icon'], LucideIcon> = {
  baby: Baby,
  'wand-sparkles': WandSparkles,
  scissors: Scissors,
  sparkles: Sparkles,
};

export function ServicesSection() {
  const t = useTranslations();
  const services = t.raw('services') as ServiceItem[];

  return (
    <section id="services" className="bg-[#faf7f2] px-5 py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title={t('servicesTitle')}
          intro={t('servicesIntro')}
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map((item) => {
            const Icon = serviceIcons[item.icon];

            return (
              <article
                key={item.title}
                className="service-card relative isolate flex min-h-[260px] flex-col overflow-hidden rounded-[20px] bg-white p-6"
              >
                <div className="service-card__content relative z-10 flex flex-1 flex-col">
                  <h3 className="service-card__title font-sans text-xl font-semibold leading-snug text-[#211f1c]">
                    {item.title}
                  </h3>
                  <span
                    className="service-card__icon mt-5 flex h-20 w-full items-center justify-center text-[#9b6c23]"
                    aria-hidden="true"
                  >
                    <Icon className="h-12 w-12" strokeWidth={1.5} />
                  </span>
                  <p className="service-card__description mt-5 text-sm leading-6 text-[#66645e]">
                    {item.text}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
