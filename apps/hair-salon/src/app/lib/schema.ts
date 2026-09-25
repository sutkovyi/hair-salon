export type SupportedLocale = 'en' | 'es' | 'uk';

export interface LocalizedSchema {
  personName: string;
  websiteName: string;
  pageName: string;
  description: string;
  jobTitle: string;
  telephone: string;
  whatsappTelephone: string;
  whatsappContactType: string;
  instagramUrl: string;
  knowsAbout: string[];
  salonName: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
  areaServed: string;
  priceCurrency: string;
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

const PERSON_ID = `${SITE_URL}/#nataliia-krasovska`;
const SALON_ID = `${SITE_URL}/#talula-head-spa`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const LOCALE_PATHS: Record<SupportedLocale, string> = {
  en: '/en',
  es: '/es',
  uk: '/uk',
};
const LANGUAGE_CODES: Record<SupportedLocale, string> = {
  en: 'en',
  es: 'es-ES',
  uk: 'uk-UA',
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
        name: content.personName,
        jobTitle: content.jobTitle,
        description: content.description,
        url,
        telephone: content.telephone,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: content.whatsappTelephone,
          contactType: content.whatsappContactType,
          availableLanguage: ['uk-UA', 'en', 'es-ES'],
        },
        knowsAbout: content.knowsAbout,
        workLocation: { '@id': SALON_ID },
        sameAs: [content.instagramUrl],
      },
      {
        '@type': 'HairSalon',
        '@id': SALON_ID,
        name: content.salonName,
        address: {
          '@type': 'PostalAddress',
          streetAddress: content.streetAddress,
          addressLocality: content.addressLocality,
          addressRegion: content.addressRegion,
          postalCode: content.postalCode,
          addressCountry: content.addressCountry,
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
              areaServed: { '@type': 'City', name: content.areaServed },
            },
          };

          if (service.price) {
            offer.price = Number(service.price);
            offer.priceCurrency = content.priceCurrency;
          } else {
            offer.priceSpecification = {
              '@type': 'PriceSpecification',
              minPrice: Number(service.minPrice),
              maxPrice: Number(service.maxPrice),
              priceCurrency: content.priceCurrency,
            };
          }

          return offer;
        }),
      },
    ],
  };
}
