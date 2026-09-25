'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
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
  const [isMobile, setIsMobile] = useState(false);
  const [openCategories, setOpenCategories] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;

    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const updateViewport = () => setIsMobile(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener('change', updateViewport);
    return () => mediaQuery.removeEventListener('change', updateViewport);
  }, []);

  const toggleCategory = (index: number) => {
    setOpenCategories((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <section id="prices" className="bg-[#211f1c] px-5 pt-24 pb-8 text-white lg:px-10 lg:pt-28 lg:pb-12">
      <div className="mx-auto max-w-4xl">
        <SectionHeading title={t('pricesTitle')} intro={t('pricesIntro')} inverse />
        <div className="mt-12 divide-y divide-white/15">
          {priceCategories.map((group, index) => {
            const isOpen = !isMobile || openCategories.has(index);
            const panelId = `price-category-${index}`;

            return (
              <section key={group.category} className="py-2 first:pt-0 last:pb-0">
                <h3 className="m-0">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => isMobile && toggleCategory(index)}
                    className="flex min-h-14 w-full items-center justify-between gap-4 py-3 text-left font-sans text-lg font-semibold text-[#edbd58] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#edbd58] md:cursor-default"
                  >
                    <span>{group.category}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-white/70 transition-transform duration-300 md:hidden ${isOpen ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  aria-hidden={!isOpen}
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out md:grid-rows-[1fr] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="divide-y divide-white/10 border-t border-white/20">
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
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
