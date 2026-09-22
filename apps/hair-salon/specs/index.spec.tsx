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
  it('should render successfully', () => {
    const { baseElement } = render(
      <NextIntlClientProvider locale="uk" messages={messages}>
        <Page />
      </NextIntlClientProvider>
    );

    const structuredData = baseElement.querySelector('script[type="application/ld+json"]');

    expect(baseElement).toBeTruthy();
    expect(structuredData?.textContent).toContain('HairSalon');
    expect(structuredData?.textContent).toContain('contactPoint');
    expect(structuredData?.textContent).toContain('PostalAddress');
  });
});
