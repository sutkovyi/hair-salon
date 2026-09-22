'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import {
  COOKIE_CONSENT_CHANGE,
  getCookieConsent,
} from '../../lib/cookie-consent';

const GA_ID = 'G-B1VNF6F0DW';

export function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const sync = () => setEnabled(getCookieConsent() === 'accepted');
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
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
