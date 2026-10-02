import type { Metadata } from 'next';
import { EventTypeBooker } from '../../../../components/EventTypeBooker';

export const metadata: Metadata = {
  title: 'Book test_20_min | Nataliia Krasovska',
  description: 'Book an appointment with Nataliia Krasovska.',
};

export default function EventTypeBookingPage() {
  return (
    <main className="min-h-screen bg-[#faf7f2] px-4 py-10 text-[#2b2d42] sm:px-8 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-[#bc8a5f]">
          Online booking
        </p>
        <h1 className="mb-8 font-serif text-4xl leading-tight sm:text-5xl">
          test_20_min
        </h1>
        <EventTypeBooker />
      </div>
    </main>
  );
}
