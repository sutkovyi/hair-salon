import { getLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';

export default async function BookingPage() {
  const locale = await getLocale();
  redirect(`/${locale}/booking`);
}
