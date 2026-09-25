export type SupportedLocale = 'en' | 'es' | 'uk';

export interface LocalizedSchema {
  websiteName: string;
  pageName: string;
  description: string;
  jobTitle: string;
  servicesName: string;
  services: Array<{
    name: string;
    serviceType: string;
    price?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  'https://care-of-your-hair.n-sutkovoy.workers.dev';

const PERSON_ID = `${SITE_URL}/#person`;
const SALON_ID = `${SITE_URL}/#salon`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const LOCALE_PATHS: Record<SupportedLocale, string> = {
  en: '/en',
  es: '/es',
  uk: '/uk',
};
const LANGUAGE_CODES: Record<SupportedLocale, string> = {
  en: 'en',
  es: 'es',
  uk: 'uk',
};

export function createSchema(
  locale: SupportedLocale,
  content: LocalizedSchema,
) {
  const url = `${SITE_URL}${LOCALE_PATHS[locale]}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: SITE_URL,
        name: content.websiteName,
        inLanguage: LANGUAGE_CODES[locale],
        publisher: { '@id': PERSON_ID },
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: content.pageName,
        description: content.description,
        inLanguage: LANGUAGE_CODES[locale],
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': PERSON_ID },
        mainEntity: { '@id': PERSON_ID },
      },
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: 'Nataliia Krasovska',
        jobTitle: content.jobTitle,
        description: content.description,
        workLocation: { '@id': SALON_ID },
        sameAs: ['https://www.instagram.com/care.of.your.hair8'],
      },
      {
        '@type': 'HairSalon',
        '@id': SALON_ID,
        name: 'Talula Head & SPA',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'C/ de la Font de la Figuera, 7',
          addressLocality: 'València',
          postalCode: '46004',
          addressCountry: 'ES',
        },
      },
      {
        '@type': 'OfferCatalog',
        '@id': `${url}#services`,
        name: content.servicesName,
        itemListElement: content.services.map((service) => {
          const offer: Record<string, unknown> = {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: service.name,
              serviceType: service.serviceType,
              provider: { '@id': PERSON_ID },
              availableAtOrFrom: { '@id': SALON_ID },
              areaServed: { '@type': 'City', name: 'València' },
            },
          };

          if (service.price) {
            offer.price = service.price;
            offer.priceCurrency = 'EUR';
          } else {
            offer.priceSpecification = {
              '@type': 'PriceSpecification',
              minPrice: service.minPrice,
              maxPrice: service.maxPrice,
              priceCurrency: 'EUR',
            };
          }

          return offer;
        }),
      },
    ],
  };
}
