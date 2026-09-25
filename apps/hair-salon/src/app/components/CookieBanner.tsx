'use client';

import { useEffect } from 'react';
import { useLocale, useMessages } from 'next-intl';
import { run, setLanguage } from 'vanilla-cookieconsent';

export const COOKIE_CONSENT_CHANGE = 'cookie-consent-change';

export function CookieBanner() {
  const locale = useLocale() as 'en' | 'ru' | 'uk';
  const messages = useMessages();
  const translations = { [locale]: messages.cookies };

  useEffect(() => {
    run({
      guiOptions: {
        consentModal: {
          layout: 'box inline',
          position: 'bottom left',
          equalWeightButtons: true,
          flipButtons: false,
        },
        preferencesModal: {
          layout: 'box',
          equalWeightButtons: true,
          flipButtons: false,
        },
      },
      categories: {
        necessary: { enabled: true, readOnly: true },
        analytics: {
          autoClear: {
            cookies: [{ name: /^_ga/ }, { name: '_gid' }],
          },
        },
      },
      language: {
        default: locale,
        translations,
      },
      onConsent: () => window.dispatchEvent(new Event(COOKIE_CONSENT_CHANGE)),
      onChange: () => window.dispatchEvent(new Event(COOKIE_CONSENT_CHANGE)),
    });
  }, [locale]);

  useEffect(() => {
    setLanguage(locale);
  }, [locale]);

  return null;
}
