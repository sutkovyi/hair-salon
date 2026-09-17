'use client';

import { FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Info, SectionHeading } from './SectionHeading';

type ServiceItem = {
  title: string;
};

type ContactSectionProps = {
  sent: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function ContactSection({ sent, onSubmit }: ContactSectionProps) {
  const t = useTranslations();
  const services = t.raw('services') as ServiceItem[];

  return (
    <section id="contact" className="bg-white px-5 py-24 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <SectionHeading title={t('visitTitle')} intro={t('visitIntro')} />
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-7">
            <Info label={t('addressLabel')} value={t('address')} />
            <Info label={t('phoneLabel')} value="+38 (099) 123-45-67" />
            <Info label={t('hoursLabel')} value={t('hours')} />
            <Info label="Instagram" value="@lelegance_beauty" />
          </div>
          <form className="space-y-4" onSubmit={onSubmit}>
            <input
              required
              placeholder={t('name')}
              className="w-full border border-[#e0e0e0] px-4 py-3 outline-none focus:border-[#d4a373]"
            />
            <input
              required
              type="tel"
              placeholder={t('phone')}
              className="w-full border border-[#e0e0e0] px-4 py-3 outline-none focus:border-[#d4a373]"
            />
            <select
              required
              defaultValue=""
              className="w-full border border-[#e0e0e0] bg-white px-4 py-3 outline-none focus:border-[#d4a373]"
            >
              <option value="" disabled>
                {t('service')}
              </option>
              {services.map((item) => (
                <option key={item.title}>{item.title}</option>
              ))}
            </select>
            <textarea
              rows={4}
              placeholder={t('comment')}
              className="w-full resize-none border border-[#e0e0e0] px-4 py-3 outline-none focus:border-[#d4a373]"
            />
            <button className="w-full rounded-full bg-[#d4a373] px-5 py-4 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-[#bc8a5f]">
              {t('submit')}
            </button>
            {sent && (
              <p className="bg-[#faf1e5] p-4 text-sm text-[#6c757d]">
                {t('sent')}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
