import { BookingServices } from '../../components/BookingServices';
import { getBookingServices } from '../../lib/booking-services';
import type { SupportedLocale } from '../../lib/schema';

export default async function BookingPage({
  params,
}: {
  params: Promise<{ locale: SupportedLocale }>;
}) {
  const { locale } = await params;
  const services = await getBookingServices(locale);

  return (
    <main className="min-h-screen bg-[#faf7f2] px-6 py-20 text-[#2b2d42] sm:px-10">
      <BookingServices initialServices={services} />
    </main>
  );
}
