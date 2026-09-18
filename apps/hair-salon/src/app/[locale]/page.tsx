'use client';

import { FormEvent, useState } from 'react';
import { useLocale } from 'next-intl';
import { trackEvent } from '../../lib/gtag';
import { AboutSection } from '../components/AboutSection';
import { BookingModal } from '../components/BookingModal';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { PricesSection } from '../components/PricesSection';
import { ServicesSection } from '../components/ServicesSection';

export default function Home() {
  const locale = useLocale();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const openBooking = (location = 'general') => {
    trackEvent('book_online_click', {
      event_category: 'engagement',
      event_label: location,
      language: locale,
    });
    setSent(false);
    setBookingOpen(true);
  };
  const closeBooking = () => setBookingOpen(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <main className="min-h-screen bg-[#faf7f2] text-[#2b2d42]">
      <Header onBook={openBooking} />
      <Hero onBook={openBooking} />
      <ServicesSection />
      <PricesSection />
      <AboutSection />
      <ContactSection />
      <Footer />
      <BookingModal
        isOpen={bookingOpen}
        sent={sent}
        onClose={closeBooking}
        onSubmit={handleSubmit}
      />
    </main>
  );
}
