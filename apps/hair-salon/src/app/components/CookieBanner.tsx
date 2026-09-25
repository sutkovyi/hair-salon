'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { run, setLanguage } from 'vanilla-cookieconsent';
import enMessages from '../../../messages/en.json';
import ruMessages from '../../../messages/ru.json';
import ukMessages from '../../../messages/uk.json';

export const COOKIE_CONSENT_CHANGE = 'cookie-consent-change';

const translations = {
  en: enMessages.cookies,
  ru: ruMessages.cookies,
  uk: ukMessages.cookies,
};

export function CookieBanner() {
  const locale = useLocale() as 'en' | 'ru' | 'uk';

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
