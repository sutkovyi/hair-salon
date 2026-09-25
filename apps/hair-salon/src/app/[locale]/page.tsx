import { getBookingServices } from '../lib/booking-services';
import { HomeClient } from '../components/HomeClient';
import { createSchema, type LocalizedSchema, type SupportedLocale } from '../lib/schema';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: SupportedLocale }>;
}) {
  const services = await getBookingServices();
  const { locale } = await params;
  const messages = (
    await import(`../../../messages/${locale}.json`)
  ).default;
  const structuredData = createSchema(
    locale,
    messages.schema as unknown as LocalizedSchema,
  );

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <HomeClient initialServices={services} locale={locale} />
    </>
  );
}
