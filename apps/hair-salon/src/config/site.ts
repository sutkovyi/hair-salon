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
    aboutVideo: {
      src: 'https://hair-salon-static.vercel.app/intro.mp4',
      poster: 'https://hair-salon-static.vercel.app/intro-poster.avif',
    },
  },
  analytics: {
    googleMeasurementId: 'G-B1VNF6F0DW',
  },
} as const;
