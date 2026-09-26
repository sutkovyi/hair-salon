'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import {
  ArrowUpRight,
  Camera,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import { trackEvent } from '@/lib/gtag';

const LocationMap = dynamic(() => import('./LocationMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[460px] w-full items-center justify-center rounded-[20px] border border-[#dedacf] bg-[#ede9df] text-sm text-[#66645e]">
      Loading map...
    </div>
  ),
});

export function ContactSection() {
  const t = useTranslations();

  return (
    <section id="contact" className="bg-[#faf7f2] px-5 pt-8 pb-24 lg:px-10 lg:pt-12 lg:pb-28">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 grid gap-5 border-b border-[#211f1c]/15 pb-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#211f1c]/15 px-4 py-2 text-xs font-semibold uppercase text-[#211f1c]">
              <span className="h-2 w-2 rounded-full bg-[#e7b961]" aria-hidden="true" />
              {t('visitTitle')}
            </span>
            <h2 className="max-w-3xl font-sans text-4xl font-semibold leading-tight text-[#211f1c] sm:text-5xl">
              {t('contactHeadline')}
            </h2>
          </div>
          <p className="max-w-sm pb-1 text-base leading-7 text-[#66645e] md:text-right">
            {t('visitIntro')}
          </p>
        </header>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="divide-y divide-[#211f1c]/15">
            <a
              href={siteConfig.location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent('contact_link_click', {
                  event_category: 'contact',
                  event_label: 'Address',
                  link_type: 'google_maps',
                  transport_type: 'beacon',
                })
              }
              className="group flex min-h-24 items-center gap-5 py-5 first:pt-0"
            >
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#e7b961] text-[#211f1c] transition-transform duration-300 group-hover:scale-105">
                <MapPin className="h-7 w-7" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-lg font-semibold text-[#211f1c]">{t('addressLabel')}</span>
                <span className="mt-1 block break-words leading-6 text-[#66645e] transition-colors group-hover:text-[#211f1c]">
                  {t('address')}
                </span>
              </span>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-[#8d6424] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a
              href="tel:+34665499177"
              onClick={() =>
                trackEvent('contact_link_click', {
                  event_category: 'contact',
                  event_label: 'Phone',
                  link_type: 'tel',
                })
              }
              className="group flex min-h-24 items-center gap-5 py-5"
            >
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#e7b961] text-[#211f1c] transition-transform duration-300 group-hover:scale-105">
                <Phone className="h-7 w-7" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-lg font-semibold text-[#211f1c]">{t('phoneLabel')}</span>
                <span className="mt-1 block leading-6 text-[#66645e] transition-colors group-hover:text-[#211f1c]">+34 665 499 177</span>
              </span>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-[#8d6424] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a
              href="https://wa.me/380731819204"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent('contact_link_click', {
                  event_category: 'contact',
                  event_label: 'WhatsApp',
                  link_type: 'whatsapp'
                })
              }
              className="group flex min-h-24 items-center gap-5 py-5"
            >
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#e7b961] text-[#211f1c] transition-transform duration-300 group-hover:scale-105">
                <MessageCircle className="h-7 w-7" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-lg font-semibold text-[#211f1c]">{t('whatsappLabel')}</span>
                <span className="mt-1 block leading-6 text-[#66645e] transition-colors group-hover:text-[#211f1c]">+380 73 181 92 04</span>
              </span>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-[#8d6424] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a
              href="https://www.instagram.com/care.of.your.hair8"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent('contact_link_click', {
                  event_category: 'contact',
                  event_label: 'Instagram',
                  link_type: 'instagram',
                  transport_type: 'beacon',
                })
              }
              className="group flex min-h-24 items-center gap-5 py-5 last:pb-0"
            >
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#e7b961] text-[#211f1c] transition-transform duration-300 group-hover:scale-105">
                <Camera className="h-7 w-7" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-lg font-semibold text-[#211f1c]">Instagram</span>
                <span className="mt-1 block leading-6 text-[#66645e] transition-colors group-hover:text-[#211f1c]">@care.of.your.hair8</span>
              </span>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-[#8d6424] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>
          <div className="min-h-[400px] overflow-hidden rounded-[20px] border border-[#211f1c]/10 bg-[#ede9df] shadow-[0_18px_44px_rgba(33,31,28,0.12)] lg:min-h-[480px]">
            <LocationMap />
          </div>
        </div>
      </div>
    </section>
  );
}
