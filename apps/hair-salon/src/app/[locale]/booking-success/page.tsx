import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { siteConfig } from '@/config/site';

export default async function BookingSuccessPage() {
  const t = await getTranslations('bookingSuccess');

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#faf7f2] px-6 py-24 text-center text-[#2b2d42]">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full border border-[#d4a373]/30" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full border border-[#d4a373]/25" />
      <section className="relative w-full max-w-xl">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-[#d4a373] text-3xl text-[#bc8a5f]">
          ✓
        </div>
        <p className="mb-5 text-xs font-medium uppercase tracking-[0.25em] text-[#bc8a5f]">
          {t('eyebrow')}
        </p>
        <h1 className="font-serif text-5xl leading-none sm:text-7xl">{t('title')}</h1>
        <p className="mx-auto mt-7 max-w-md text-lg leading-8 text-[#6c757d]">{t('message')}</p>
        <a
          href={siteConfig.location.googleMapsUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-5 block text-sm font-medium text-[#2b2d42] underline decoration-[#d4a373] underline-offset-4 transition hover:text-[#bc8a5f]"
        >
          {t('location')}
          <span className="mt-2 block text-xs font-normal uppercase tracking-[0.12em] text-[#bc8a5f]">
            {t('viewOnMap')}
          </span>
        </a>
        <Link
          href="/"
          className="mt-10 inline-flex rounded-full bg-[#d4a373] px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:-translate-y-1 hover:bg-[#bc8a5f]"
        >
          {t('backHome')}
        </Link>
      </section>
    </main>
  );
}