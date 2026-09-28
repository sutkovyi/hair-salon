'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { siteConfig } from '@/config/site';
import type {
  BookingServices as BookingServicesData,
  ServiceCategory,
} from '@/app/lib/booking-services';
import { trackEvent } from '../../lib/gtag';

const categoryOrder: { key: ServiceCategory; translationKey: string }[] = [
  { key: 'childrens_haircuts', translationKey: 'childrens_haircuts' },
  { key: 'childrens_styling', translationKey: 'childrens_styling' },
  { key: 'haircuts', translationKey: 'haircuts' },
  { key: 'styling', translationKey: 'styling' },
];

type BookingServicesProps = {
  compact?: boolean;
  active?: boolean;
  initialServices?: BookingServicesData;
};

export function BookingServices({
  compact = false,
  active = true,
  initialServices,
}: BookingServicesProps) {
  const t = useTranslations('bookingCatalog');
  const locale = useLocale();
  const [services, setServices] = useState<BookingServicesData | undefined>(initialServices);
  const [loading, setLoading] = useState(initialServices === undefined);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!active || initialServices !== undefined) return;

    let cancelled = false;
    setLoading(true);
    fetch(`/${locale}${siteConfig.booking.servicesApiUrl}`)
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load services');
        return response.json() as Promise<BookingServicesData>;
      })
      .then((data) => {
        if (!cancelled) setServices(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [active, initialServices]);

  return (
    <section
      className={
        compact
          ? 'min-h-0 flex-1 overflow-y-auto px-0.5 pt-1'
          : 'mx-auto max-w-5xl'
      }
    >
      {!compact && (
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-[#bc8a5f]">
            {t('eyebrow')}
          </p>
          <h1 className="font-serif text-5xl leading-none text-[#2b2d42] sm:text-7xl">
            {t('title')}
          </h1>
          <p className="mt-5 text-lg leading-8 text-[#6c757d]">{t('intro')}</p>
        </div>
      )}

      {loading && <p className="py-10 text-center text-[#6c757d]">{t('loading')}</p>}
      {error && <p className="py-10 text-center text-[#bc8a5f]">{t('error')}</p>}
      {!loading && !error && (
        <div className="space-y-8 pb-4">
          {categoryOrder.map(({ key: category, translationKey }) => {
            const categoryServices = services?.[category] ?? [];

            if (categoryServices.length === 0) return null;

            return (
              <section key={category}>
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#bc8a5f]">
                  {t(`categories.${translationKey}`)}
                </h2>
                <div className={compact ? 'grid gap-3' : 'grid gap-4 sm:grid-cols-2'}>
                  {categoryServices.map((service) => (
                    <a
                      key={service.id}
                      href={service.bookingUrl}
                      onClick={() => {
                        trackEvent('booking_service_click', {
                          event_category: 'booking',
                          event_label: service.title,
                          booking_service_id: service.id,
                          booking_service_category: category,
                          transport_type: 'beacon',
                        });
                      }}
                      className="group flex items-center justify-between gap-4 rounded-xl border border-[#eadfd2] bg-white px-5 py-4 text-[#2b2d42] transition hover:-translate-y-0.5 hover:border-[#d4a373] hover:shadow-md"
                    >
                      <span className="min-w-0">
                        <span className="block font-medium leading-6">{service.title}</span>
                        <span className="mt-1 block text-xs uppercase tracking-[0.12em] text-[#8b929a]">
                          {service.lengthInMinutes} {t('minutes')}
                        </span>
                      </span>
                      <span className="shrink-0 text-lg text-[#bc8a5f] transition-transform group-hover:translate-x-1">
                        ↗
                      </span>
                    </a>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </section>
  );
}