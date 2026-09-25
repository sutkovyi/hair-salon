import React from 'react';
import { render } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import Page from '../src/app/[locale]/page';
import messages from '../messages/uk.json';

vi.mock('next-intl', async () => {
  const actual = await vi.importActual('next-intl');
  return {
    ...actual,
    useLocale: () => 'uk',
  };
});

vi.mock('@/i18n/routing', () => ({
  useRouter: () => ({
    replace: vi.fn(),
  }),
  usePathname: () => '/',
}));

describe('Page', () => {
  it('should render localized JSON-LD successfully', async () => {
    const page = await Page({ params: Promise.resolve({ locale: 'uk' }) });
    const { baseElement } = render(
      <NextIntlClientProvider locale="uk" messages={messages}>
        {page}
      </NextIntlClientProvider>,
    );

    const structuredData = baseElement.querySelector(
      'script[type="application/ld+json"]',
    );

    expect(baseElement).toBeTruthy();
    expect(structuredData?.textContent).toContain('OfferCatalog');
    expect(structuredData?.textContent).toContain('Перукарські послуги');
    expect(structuredData?.textContent).toContain('inLanguage');
    expect(structuredData?.textContent).toContain('PostalAddress');
  });
});
