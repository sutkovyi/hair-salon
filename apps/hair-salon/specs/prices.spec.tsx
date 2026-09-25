import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { PricesSection } from '../src/app/components/PricesSection';
import messages from '../messages/uk.json';

function renderPrices(matches: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockReturnValue({
      matches,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }),
  );

  return render(
    <NextIntlClientProvider locale="uk" messages={messages}>
      <PricesSection />
    </NextIntlClientProvider>,
  );
}

describe('PricesSection', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('starts with categories collapsed on mobile and opens them when selected', async () => {
    const { container } = renderPrices(true);
    const firstToggle = screen.getByRole('button', { name: /Дитячі стрижки/ });
    const firstPanel = container.querySelector('#price-category-0');

    await waitFor(() => expect(firstToggle.getAttribute('aria-expanded')).toBe('false'));
    expect(firstPanel?.className).toContain('grid-rows-[0fr]');

    fireEvent.click(firstToggle);

    expect(firstToggle.getAttribute('aria-expanded')).toBe('true');
    expect(firstPanel?.className).toContain('grid-rows-[1fr]');
  });

  it('keeps all categories expanded on desktop', async () => {
    renderPrices(false);
    const toggles = screen.getAllByRole('button');

    await waitFor(() => {
      expect(toggles).toHaveLength(messages.priceCategories.length);
      toggles.forEach((toggle) =>
        expect(toggle.getAttribute('aria-expanded')).toBe('true'),
      );
    });
    expect(screen.getByText(messages.priceCategories[0].items[0].title)).toBeTruthy();
  });
});