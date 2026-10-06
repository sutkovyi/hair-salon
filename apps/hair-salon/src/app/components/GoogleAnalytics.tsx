'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { getUserPreferences } from 'vanilla-cookieconsent';
import { useCookieConsentStore } from '../../lib/cookie-consent-store';
import { siteConfig } from '@/config/site';

export function GoogleAnalytics() {
  const enabled = useCookieConsentStore((state) => state.analyticsEnabled);
  const setAnalyticsEnabled = useCookieConsentStore(
    (state) => state.setAnalyticsEnabled,
  );

  useEffect(() => {
    const syncAnalyticsConsent = () => {
      const preferences = getUserPreferences();
      setAnalyticsEnabled(
        preferences.acceptedCategories.includes('analytics'),
      );
    };

    syncAnalyticsConsent();
  }, [setAnalyticsEnabled]);

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
