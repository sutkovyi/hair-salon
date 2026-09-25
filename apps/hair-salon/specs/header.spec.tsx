import { fireEvent, render, screen, within } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { Header } from '../src/app/components/Header';
import messages from '../messages/uk.json';

vi.mock('@/i18n/routing', () => ({
  usePathname: () => '/',
  useRouter: () => ({ replace: vi.fn() }),
}));

describe('Header navigation', () => {
  it('opens and closes the compact navigation and keeps the booking action', () => {
    const onBook = vi.fn();
    const { container } = render(
      <NextIntlClientProvider locale="uk" messages={messages}>
        <Header onBook={onBook} overlay />
      </NextIntlClientProvider>,
    );
    const toggle = screen.getByRole('button', { name: messages.menu });

    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(toggle.className).toContain('min-[992px]:hidden');
    expect(container.querySelector('header nav')?.className).toContain('min-[992px]:flex');

    fireEvent.click(toggle);

    const compactNavigation = document.getElementById('site-navigation-mobile');
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(compactNavigation).not.toBeNull();
    expect(
      within(compactNavigation as HTMLElement)
        .getByRole('link', { name: messages.nav.services })
        .getAttribute('href'),
    ).toBe('#services');
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(document.getElementById('site-navigation-mobile')).toBeNull();

    fireEvent.click(toggle);
    fireEvent.click(
      within(document.getElementById('site-navigation-mobile') as HTMLElement)
        .getByRole('button', { name: messages.book }),
    );
    expect(onBook).toHaveBeenCalledWith('mobile-menu');
    expect(document.getElementById('site-navigation-mobile')).toBeNull();
  });
});