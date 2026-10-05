'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { run, setLanguage } from 'vanilla-cookieconsent';
import enMessages from '../../../messages/en.json';
import ruMessages from '../../../messages/ru.json';
import ukMessages from '../../../messages/uk.json';
import { useBookingModalStore } from '../../lib/booking-modal-store';

export const COOKIE_CONSENT_CHANGE = 'cookie-consent-change';

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
      onConsent: () => window.dispatchEvent(new Event(COOKIE_CONSENT_CHANGE)),
      onChange: () => window.dispatchEvent(new Event(COOKIE_CONSENT_CHANGE)),
    });
  }, [bookingModalInitialized, bookingModalOpen, locale]);

  useEffect(() => {
    setLanguage(locale);
  }, [locale]);

  return null;
}
