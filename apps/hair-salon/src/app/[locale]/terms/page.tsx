import type { Metadata } from 'next';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { SectionHeading } from '../../components/SectionHeading';

type Props = {
  params: Promise<{ locale: string }>;
};

type Locale = (typeof routing.locales)[number];

export function generateMetadata({ params }: Props): Promise<Metadata> {
  return Promise.resolve(params).then(async ({ locale }) => {
    if (!routing.locales.includes(locale as Locale)) {
      notFound();
    }
    const t = await getTranslations({ locale, namespace: 'terms' });

    return {
      title: t('title'),
      description: t('description'),
    };
  });
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'terms' });
  const messages = await getMessages();
  const content = typeof messages?.terms?.content === 'string' ? messages.terms.content : '';

  return (
    <main className="min-h-screen bg-[#faf7f2] text-[#2b2d42]">
      <Header />
      <section className="mx-auto max-w-4xl px-5 py-24 lg:px-10">
        <SectionHeading title={t('title')} intro={t('intro')} />
        <div className="prose prose-lg max-w-none text-[#2b2d42]">
          <p className="mb-4 leading-7 text-[#6c757d]">{t('lastUpdated')}</p>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </section>
      <Footer />
    </main>
  );
}