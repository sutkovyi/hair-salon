'use client';

import { siteConfig } from '@/config/site';

const MAP_URL = `https://www.google.com/maps?q=${siteConfig.location.coordinates.latitude},${siteConfig.location.coordinates.longitude}&t=k&z=17&output=embed`;

export default function LocationMap() {
  return (
    <div className="h-[400px] w-full overflow-hidden lg:h-[480px]">
      <iframe
        title={`${siteConfig.location.salonName} location on Google Maps`}
        src={MAP_URL}
        className="h-full w-full border-0"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
