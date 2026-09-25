'use client';

import { useTranslations } from 'next-intl';
import { SectionHeading } from './SectionHeading';
import { trackEvent } from '../../lib/gtag';

type PriceItem = {
  title: string;
  price: string;
};

type PriceCategory = {
  category: string;
  items: PriceItem[];
};

export function PricesSection() {
  const t = useTranslations();
  const priceCategories = t.raw('priceCategories') as PriceCategory[];

  return (
    <section id="prices" className="bg-[#211f1c] px-5 pt-24 pb-8 text-white lg:px-10 lg:pt-28 lg:pb-12">
      <div className="mx-auto max-w-4xl">
        <SectionHeading title={t('pricesTitle')} intro={t('pricesIntro')} inverse />
        <div className="mt-12 space-y-12">
          {priceCategories.map((group) => (
            <div key={group.category}>
              <h3 className="mb-4 border-b border-white/20 pb-3 font-sans text-lg font-semibold text-[#edbd58]">
                {group.category}
              </h3>
              <div className="divide-y divide-white/10">
                {group.items.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-baseline gap-3 py-3.5"
                    onClick={() =>
                      trackEvent('price_item_click', {
                        event_category: 'pricing',
                        event_label: item.title,
                        price_category: group.category,
                        price: item.price,
                      })
                    }
                  >
                    <span className="font-medium text-white/90">{item.title}</span>
                    <span className="flex-1 border-b border-dotted border-white/20" />
                    <span className="whitespace-nowrap font-sans text-lg font-semibold text-[#edbd58]">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
