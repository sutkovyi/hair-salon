'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { getUserPreferences } from 'vanilla-cookieconsent';
import { COOKIE_CONSENT_CHANGE } from './CookieBanner';
import { siteConfig } from '@/config/site';

export function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const sync = () => {
      const preferences = getUserPreferences();
      setEnabled(preferences.acceptedCategories.includes('analytics'));
    };
    sync();
    window.addEventListener(COOKIE_CONSENT_CHANGE, sync);
    return () => window.removeEventListener(COOKIE_CONSENT_CHANGE, sync);
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.analytics.googleMeasurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${siteConfig.analytics.googleMeasurementId}');
        `}
      </Script>
    </>
  );
}
