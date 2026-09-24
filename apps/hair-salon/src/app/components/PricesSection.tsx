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
    <section id="prices" className="relative overflow-hidden bg-white px-5 py-24 lg:px-10">
      {/* Background leaf texture/watermark */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] bg-repeat bg-center"
        style={{ backgroundImage: "url('/leaf-bg.png')", backgroundSize: '400px auto' }}
      />

      {/* Decorative leaf motifs */}

      <div className="relative z-10 mx-auto max-w-4xl">
        <SectionHeading title={t('pricesTitle')} intro={t('pricesIntro')} />
        <div className="mt-12 space-y-12">
          {priceCategories.map((group) => (
            <div key={group.category}>
              <h3 className="mb-4 font-serif text-2xl font-semibold text-[#bc8a5f] border-b border-[#bc8a5f]/30 pb-2">
                {group.category}
              </h3>
              <div className="divide-y divide-dashed divide-[#e0e0e0]">
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
                    <span className="font-medium text-[#2b2d42]">{item.title}</span>
                    <span className="flex-1 border-b border-dotted border-[#d7d7d7]" />
                    <span className="whitespace-nowrap font-serif text-lg font-bold text-[#bc8a5f]">
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
