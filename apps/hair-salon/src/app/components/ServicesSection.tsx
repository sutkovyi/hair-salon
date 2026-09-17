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
    <section id="services" className="px-5 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title={t('servicesTitle')}
          intro={t('servicesIntro')}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((item) => (
            <article
              key={item.title}
              className="group bg-white p-8 text-center shadow-[0_5px_20px_rgba(0,0,0,.04)] transition hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,.08)]"
            >
              <span className="mb-5 block font-serif text-4xl text-[#d4a373]">
                {item.icon}
              </span>
              <h3 className="font-serif text-2xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#6c757d]">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
