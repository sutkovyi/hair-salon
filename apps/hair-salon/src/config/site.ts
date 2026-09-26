export const siteConfig = {
  developmentNotice: {
    enabled: true,
  },
  booking: {
    enabled: true,
    servicesApiUrl: '/api/booking-services',
  },
  location: {
    googleMapsUrl: 'https://maps.app.goo.gl/8qp6N62xSgMRbpT8A?g_st=ic',
  },
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
    googleMeasurementId: 'G-B1VNF6F0DW',
  },
} as const;
