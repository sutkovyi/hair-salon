'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { Info, SectionHeading } from './SectionHeading';

const LocationMap = dynamic(() => import('./LocationMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[396px] w-full items-center justify-center rounded-xl border border-[#e0e0e0] bg-[#f8f9fa] text-sm text-[#6c757d]">
      Loading map...
    </div>
  ),
});

export function ContactSection() {
  const t = useTranslations();

  return (
    <section id="contact" className="bg-white px-5 py-24 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <SectionHeading title={t('visitTitle')} intro={t('visitIntro')} />
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-7">
            <Info
              label={t('addressLabel')}
              value={t('address')}
              href="https://maps.app.goo.gl/2KfmLhomx1Bf9xo97"
            />
            <Info label={t('phoneLabel')} value="+34 665 499 177" href="tel:+34665499177" />
            <Info label="WhatsApp" value="+380 73 181 92 04" href="https://wa.me/380731819204" />
            <Info label={t('hoursLabel')} value={t('hours')} />
            <Info
              label="Instagram"
              value="@care.of.your.hair8"
              href="https://www.instagram.com/care.of.your.hair8"
            />
          </div>
          <div>
            <LocationMap />
          </div>
        </div>
      </div>
    </section>
  );
}
