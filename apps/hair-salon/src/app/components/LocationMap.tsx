'use client';

const POSITION = { latitude: 39.4577097, longitude: -0.3725653 };

const MAP_URL = `https://www.google.com/maps?q=${POSITION.latitude},${POSITION.longitude}&t=k&z=17&output=embed`;

export default function LocationMap() {
  return (
    <div className="h-[400px] w-full overflow-hidden lg:h-[480px]">
      <iframe
        title="TALULA Head & SPA location on Google Maps"
        src={MAP_URL}
        className="h-full w-full border-0"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
