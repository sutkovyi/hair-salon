import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { ServicesSection } from '../src/app/components/ServicesSection';
import messages from '../messages/uk.json';

describe('ServicesSection', () => {
  it('renders unframed icons with a bottom-up gold fill hover and no booking CTA', () => {
    const { container } = render(
      <NextIntlClientProvider locale="uk" messages={messages}>
        <ServicesSection />
      </NextIntlClientProvider>,
    );

    const cards = container.querySelectorAll('#services article');
    expect(cards).toHaveLength(4);
    expect(container.querySelectorAll('#services article svg')).toHaveLength(4);
    const grid = container.querySelector('#services .grid');
    expect(grid?.className).toContain('md:grid-cols-2');
    expect(grid?.className).toContain('lg:grid-cols-4');
    const firstCard = container.querySelector('#services article');
    expect(firstCard?.className).toContain('min-h-[260px]');
    expect(firstCard?.className).toContain('p-6');
    const firstIcon = firstCard?.querySelector('span');
    expect(firstIcon?.className).toContain('w-full');
    expect(firstIcon?.className).toContain('justify-center');
    expect(firstCard?.querySelector('svg')?.classList.contains('h-12')).toBe(true);
    expect(firstCard?.querySelector('svg')?.classList.contains('w-12')).toBe(true);
    expect(firstCard?.className).toContain('service-card');
    expect(firstCard?.querySelector('h3')?.className).toContain(
      'service-card__title',
    );
    expect(firstCard?.querySelector('h3')?.className).not.toContain('min-h-14');
    expect(firstCard?.querySelector('p')?.className).toContain(
      'service-card__description',
    );
    expect(firstCard?.querySelector('p')?.className).toContain('mt-5');
    expect(firstCard?.className).not.toContain('hover:-translate-y');
    expect(firstCard?.querySelector('h3')?.className).toContain(
      'service-card__title',
    );
    expect(firstCard?.querySelector('p')?.className).toContain(
      'service-card__description',
    );
    expect(firstIcon?.className).not.toContain('bg-');
    expect(firstIcon?.className).not.toContain('group-hover:rotate');
    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.getByText(messages.services[0].text)).toBeTruthy();
  });
});