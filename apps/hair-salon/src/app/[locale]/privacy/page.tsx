import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { legalContent } from '../legal-content';

type Props = {
  params: Promise<{ locale: string }>;
};

type Locale = (typeof routing.locales)[number];

export function generateMetadata({ params }: Props): Promise<Metadata> {
  return Promise.resolve(params).then(async ({ locale }) => {
    if (!routing.locales.includes(locale as Locale)) {
      notFound();
    }
    const t = await getTranslations({ locale, namespace: 'privacy' });

    return {
      title: t('title'),
      description: t('description'),
    };
  });
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const content = legalContent[locale as Locale].privacy;

  return (
    <main className="min-h-screen bg-[#faf7f2] text-[#2b2d42]">
      <Header />
      <section className="mx-auto max-w-4xl px-5 pb-24 pt-32 lg:px-10">
        <article
          className="max-w-none text-[1.0625rem] leading-[1.8] text-[#2b2d42] max-[640px]:text-base max-[640px]:leading-[1.7] [&_h1]:mt-0 [&_h1]:mb-4 [&_h1]:text-[clamp(2rem,5vw,3.25rem)] [&_h1]:font-semibold [&_h1]:leading-[1.1] [&_h1]:text-[#211f1c] [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-[clamp(1.35rem,3vw,1.75rem)] [&_h2]:font-semibold [&_h2]:leading-[1.25] [&_h2]:text-[#211f1c] max-[640px]:[&_h2]:mt-10 [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-[1.15rem] [&_h3]:font-semibold [&_h3]:leading-[1.35] [&_h3]:text-[#211f1c] [&_p]:mb-5 [&_h1+p]:mb-11 [&_h1+p]:text-[0.9375rem] [&_h1+p]:leading-[1.5] [&_h1+p]:text-[#66645e] max-[640px]:[&_h1+p]:mb-9 [&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-[0.4rem] [&_li]:pl-[0.35rem] [&_a]:text-[#9b6c23] [&_a]:underline [&_a]:decoration [&_a]:underline-offset-[0.18em] [&_a:hover]:text-[#6f4b18] [&_strong]:font-semibold [&_strong]:text-[#211f1c]"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </section>
      <Footer />
    </main>
  );
}