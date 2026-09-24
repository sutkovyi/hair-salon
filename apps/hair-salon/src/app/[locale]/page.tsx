import { getBookingServices } from '../lib/booking-services';
import { HomeClient } from '../components/HomeClient';

export default async function Home() {
  const services = await getBookingServices();

  return <HomeClient initialServices={services} />;
}
