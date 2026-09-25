import { getBookingServices } from '../lib/booking-services';
import { HomeClient } from '../components/HomeClient';
import type { SupportedLocale } from '../lib/schema';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: SupportedLocale }>;
}) {
  const services = await getBookingServices();
  const { locale } = await params;

  return <HomeClient initialServices={services} locale={locale} />;
}
