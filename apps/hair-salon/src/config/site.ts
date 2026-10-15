import location from './site-location.json';

export const siteConfig = {
  developmentNotice: {
    enabled: false,
  },
  booking: {
    enabled: true,
    servicesApiUrl: '/api/booking-services',
  },
  location,
  media: {
    heroImage: {
      avif: '/images/poster/work.avif',
      webp: '/images/poster/work.webp',
      fallback: '/images/poster/work.jpg',
    },
    aboutVideo: {
      src: '/video/intro.mp4',
      poster: '/video/intro-poster.jpg',
    },
  },
  analytics: {
    googleMeasurementId: 'G-PM0003K1R9',
  },
} as const;

export function getFormattedSalonAddress() {
  const {
    salonName,
    streetAddress,
    addressDistrict,
    addressRegion,
    postalCode,
    addressLocality,
    countryName,
  } = siteConfig.location;

  return `${salonName}, ${streetAddress}, ${addressDistrict}, ${postalCode} ${addressLocality}, ${addressRegion}, ${countryName}`;
}
