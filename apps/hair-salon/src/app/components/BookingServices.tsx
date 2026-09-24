'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { siteConfig } from '@/config/site';
import type { BookingService } from '@/app/lib/booking-services';
import { trackEvent } from '../../lib/gtag';

const categoryOrder: BookingService['category'][] = [
  'childHaircuts',
  'childStyling',
  'haircuts',
  'styling',
];

type BookingServicesProps = {
  compact?: boolean;
  active?: boolean;
  initialServices?: BookingService[];
};

export function BookingServices({
  compact = false,
  active = true,
  initialServices,
}: BookingServicesProps) {
  const t = useTranslations('bookingCatalog');
  const [services, setServices] = useState<BookingService[]>(initialServices ?? []);
  const [loading, setLoading] = useState(initialServices === undefined);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!active || initialServices !== undefined) return;

    let cancelled = false;
    setLoading(true);
    fetch(siteConfig.booking.servicesApiUrl)
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load services');
        return response.json() as Promise<BookingService[]>;
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
          {categoryOrder.map((category) => {
            const categoryServices = services.filter((service) => service.category === category);

            if (categoryServices.length === 0) return null;

            return (
              <section key={category}>
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#bc8a5f]">
                  {t(`categories.${category}`)}
                </h2>
                <div className={compact ? 'grid gap-3' : 'grid gap-4 sm:grid-cols-2'}>
                  {categoryServices.map((service) => (
                    <a
                      key={service.id}
                      href={service.bookingUrl}
                      onClick={(event) => {
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