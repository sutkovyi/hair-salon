'use client';

import { FormEvent, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { BookingModal } from './components/BookingModal';
import { ContactSection } from './components/ContactSection';
import { copy, Language } from './components/content';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PricesSection } from './components/PricesSection';
import { ServicesSection } from './components/ServicesSection';

export default function Home() {
  const [language, setLanguage] = useState<Language>('uk');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const text = copy[language];
  const openBooking = () => { setSent(false); setBookingOpen(true); };
  const closeBooking = () => setBookingOpen(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); };

  return <main className="min-h-screen bg-[#faf7f2] text-[#2b2d42]"><Header language={language} text={text} onLanguageChange={setLanguage} onBook={openBooking} /><Hero text={text} onBook={openBooking} /><ServicesSection language={language} text={text} /><PricesSection language={language} text={text} /><AboutSection text={text} /><ContactSection language={language} text={text} sent={sent} onSubmit={handleSubmit} /><Footer language={language} />{bookingOpen && <BookingModal text={text} sent={sent} onClose={closeBooking} onSubmit={handleSubmit} />}</main>;
}
