'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { run, setLanguage } from 'vanilla-cookieconsent';

export const COOKIE_CONSENT_CHANGE = 'cookie-consent-change';

const translations = {
  en: {
    consentModal: {
      title: 'Our use of cookies',
      description:
        'We use necessary cookies to make our site work. We would also like to set analytics cookies that help us make improvements by measuring how you use the site. These will be set only if you accept. For more detailed information about the cookies we use, see our Privacy Policy.',
      acceptAllBtn: 'Accept all',
      acceptNecessaryBtn: 'Necessary only',
      showPreferencesBtn: 'Preferences',
    },
    preferencesModal: {
      title: 'Cookie preferences',
      acceptAllBtn: 'Accept all',
      acceptNecessaryBtn: 'Necessary only',
      savePreferencesBtn: 'Save preferences',
      closeIconLabel: 'Close',
      sections: [
        {
          title: 'Necessary cookies',
          description: 'These cookies are required for the site to work.',
          linkedCategory: 'necessary',
        },
        {
          title: 'Analytics cookies',
          description: 'These cookies help us understand how the site is used.',
          linkedCategory: 'analytics',
        },
      ],
    },
  },
  uk: {
    consentModal: {
      title: 'Як ми використовуємо cookie',
      description:
        'Ми використовуємо необхідні cookie, щоб сайт працював. Ми також хотіли б використовувати аналітичні cookie, які допомагають нам покращувати сайт, вимірюючи, як ви ним користуєтеся. Вони встановлюються лише після вашої згоди. Докладнішу інформацію про cookie дивіться в нашій Політиці конфіденційності.',
      acceptAllBtn: 'Прийняти все',
      acceptNecessaryBtn: 'Лише необхідні',
      showPreferencesBtn: 'Налаштування',
    },
    preferencesModal: {
      title: 'Налаштування cookie',
      acceptAllBtn: 'Прийняти все',
      acceptNecessaryBtn: 'Лише необхідні',
      savePreferencesBtn: 'Зберегти налаштування',
      closeIconLabel: 'Закрити',
      sections: [
        {
          title: 'Необхідні cookie',
          description: 'Ці cookie потрібні для роботи сайту.',
          linkedCategory: 'necessary',
        },
        {
          title: 'Аналітичні cookie',
          description: 'Ці cookie допомагають зрозуміти, як використовується сайт.',
          linkedCategory: 'analytics',
        },
      ],
    },
  },
};

export function CookieBanner() {
  const locale = useLocale() as 'en' | 'uk';

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
