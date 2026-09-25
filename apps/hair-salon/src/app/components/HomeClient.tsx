'use client';

import { FormEvent, useEffect, useState } from 'react';
import { trackEvent } from '../../lib/gtag';
import { AboutSection } from './AboutSection';
import { BookingModal } from './BookingModal';
import { ContactSection } from './ContactSection';
import { Footer } from './Footer';
import { Header } from './Header';
import { Hero } from './Hero';
import { PricesSection } from './PricesSection';
import { ServicesSection } from './ServicesSection';
import type { BookingService } from '../lib/booking-services';
import type { SupportedLocale } from '../lib/schema';
import { siteConfig } from '@/config/site';

type HomeClientProps = {
  initialServices: BookingService[];
  locale: SupportedLocale;
};

const BOOKING_MODAL_PARAM = 'booking-modal';

function hasBookingModalParam() {
  return (
    new URLSearchParams(window.location.search).get(BOOKING_MODAL_PARAM) ===
    'true'
  );
}

function updateBookingModalParam(isOpen: boolean) {
  const url = new URL(window.location.href);

  if (isOpen) {
    url.searchParams.set(BOOKING_MODAL_PARAM, 'true');
  } else {
    url.searchParams.delete(BOOKING_MODAL_PARAM);
  }

  window.history.replaceState({}, '', url);
}

export function HomeClient({ initialServices, locale }: HomeClientProps) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const syncBookingModal = () => setBookingOpen(hasBookingModalParam());

    syncBookingModal();
    window.addEventListener('popstate', syncBookingModal);

    return () => window.removeEventListener('popstate', syncBookingModal);
  }, []);

  const openBooking = (location = 'general') => {
    trackEvent('book_online_click', {
      event_category: 'engagement',
      event_label: location,
      language: locale,
    });
    setSent(false);
    updateBookingModalParam(true);
    setBookingOpen(true);
  };
  const closeBooking = () => {
    updateBookingModalParam(false);
    setBookingOpen(false);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <main className="min-h-screen bg-[#faf7f2] text-[#2b2d42]">
      <Header onBook={openBooking} overlay />
      <Hero onBook={openBooking} />
      <ServicesSection />
      <PricesSection />
      <AboutSection />
      <ContactSection />
      <Footer />
      {siteConfig.booking.enabled && (
        <BookingModal
          isOpen={bookingOpen}
          sent={sent}
          onClose={closeBooking}
          onSubmit={handleSubmit}
          initialServices={initialServices}
        />
      )}
    </main>
  );
}
