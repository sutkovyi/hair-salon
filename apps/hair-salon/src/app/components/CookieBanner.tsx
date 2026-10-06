'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { run, setLanguage } from 'vanilla-cookieconsent';
import enMessages from '../../../messages/en.json';
import ruMessages from '../../../messages/ru.json';
import ukMessages from '../../../messages/uk.json';
import { useBookingModalStore } from '../../lib/booking-modal-store';
import { useCookieConsentStore } from '../../lib/cookie-consent-store';
import { getUserPreferences } from 'vanilla-cookieconsent';

const translations = {
  en: enMessages.cookies,
  ru: ruMessages.cookies,
  uk: ukMessages.cookies,
};

function isBookingModalRequested() {
  return (
    new URLSearchParams(window.location.search).get('booking-modal') === 'true'
  );
}

export function CookieBanner() {
  const locale = useLocale() as 'en' | 'ru' | 'uk';
  const bookingModalOpen = useBookingModalStore((state) => state.isOpen);
  const bookingModalInitialized = useBookingModalStore(
    (state) => state.initialized,
  );
  const setBookingModalOpen = useBookingModalStore((state) => state.setOpen);
  const setAnalyticsEnabled = useCookieConsentStore(
    (state) => state.setAnalyticsEnabled,
  );

  const syncAnalyticsConsent = () => {
    const preferences = getUserPreferences();
    setAnalyticsEnabled(preferences.acceptedCategories.includes('analytics'));
  };

  useEffect(() => {
    setBookingModalOpen(isBookingModalRequested());
  }, [setBookingModalOpen]);

  useEffect(() => {
    if (!bookingModalInitialized || bookingModalOpen) {
      return;
    }

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
      onConsent: syncAnalyticsConsent,
      onChange: syncAnalyticsConsent,
    });
    syncAnalyticsConsent();
  }, [bookingModalInitialized, bookingModalOpen, locale, setAnalyticsEnabled]);

  useEffect(() => {
    setLanguage(locale);
  }, [locale]);

  return null;
}
