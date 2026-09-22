'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { getCookieConsent, setCookieConsent } from '../../lib/cookie-consent';

export function CookieBanner() {
  const t = useTranslations('cookies');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getCookieConsent() === null);
  }, []);

  if (!visible) {
    return null;
  }

  const accept = () => {
    setCookieConsent('accepted');
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-describedby="cookie-banner-text"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] p-3"
    >
      <div className="pointer-events-auto mx-auto flex max-w-lg items-center gap-3 rounded-xl border border-black/5 bg-white/95 px-3 py-2 shadow-lg backdrop-blur-md">
        <p id="cookie-banner-text" className="flex-1 text-xs text-[#6c757d]">
          {t('message')}
        </p>
        <button
          type="button"
          onClick={accept}
          className="shrink-0 rounded-full bg-[#d4a373] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#bc8a5f]"
        >
          {t('accept')}
        </button>
      </div>
    </div>
  );
}
