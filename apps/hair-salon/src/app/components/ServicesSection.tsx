'use client';

import { useTranslations } from 'next-intl';
import { SectionHeading } from './SectionHeading';

type ServiceItem = {
  icon: string;
  title: string;
  text: string;
};

export function ServicesSection() {
  const t = useTranslations();
  const services = t.raw('services') as ServiceItem[];

  return (
    <section id="services" className="bg-[#f5f3ed] px-5 py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title={t('servicesTitle')}
          intro={t('servicesIntro')}
        />
        <div className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((item, index) => (
            <article
              key={item.title}
              className="group border-t border-[#211f1c]/20 py-7 transition-colors hover:border-[#c08d32] sm:py-8"
            >
              <div className="mb-7 flex items-center justify-between">
                <span className="text-xs font-semibold tracking-[0.12em] text-[#9b6c23]">
                  0{index + 1}
                </span>
                <span className="font-serif text-3xl text-[#c08d32]" aria-hidden="true">
                {item.icon}
                </span>
              </div>
              <h3 className="font-sans text-xl font-semibold leading-snug text-[#211f1c]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#66645e]">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
