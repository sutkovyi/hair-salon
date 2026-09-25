import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { ContactSection } from '../src/app/components/ContactSection';
import messages from '../messages/uk.json';

describe('ContactSection', () => {
  it('renders the localized headline, contact links, and Lucide icons', () => {
    const { container } = render(
      <NextIntlClientProvider locale="uk" messages={messages}>
        <ContactSection />
      </NextIntlClientProvider>,
    );

    expect(screen.getByRole('heading', { name: messages.contactHeadline })).toBeTruthy();
    expect(screen.getByRole('link', { name: /Talula Head & SPA/ }).getAttribute('href'))
      .toBe('https://maps.app.goo.gl/8qp6N62xSgMRbpT8A?g_st=ic');
    expect(screen.getByRole('link', { name: /\+34 665 499 177/ }).getAttribute('href'))
      .toBe('tel:+34665499177');
    expect(screen.getByRole('link', { name: /\+380 73 181 92 04/ }).getAttribute('href'))
      .toBe('https://wa.me/380731819204');
    expect(screen.getByRole('link', { name: /@care\.of\.your\.hair8/ }).getAttribute('href'))
      .toBe('https://www.instagram.com/care.of.your.hair8');
    expect(container.querySelectorAll('#contact a svg')).toHaveLength(8);
  }, 15000);
});