'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from '@/i18n/routing';
import { siteConfig } from '@/config/site';
import { DevelopmentNotice } from './DevelopmentNotice';
import { button } from '../ui-variants';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Menu, X } from 'lucide-react';

type HeaderProps = {
  onBook?: (location?: string) => void;
  overlay?: boolean;
};

export function Header({ onBook = () => undefined, overlay = false }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const isLegalPage = pathname === '/privacy' || pathname === '/terms';

  const navItems = [
    { label: t('nav.services'), section: '#services' },
    { label: t('nav.prices'), section: '#prices' },
    { label: t('nav.about'), section: '#about' },
    { label: t('nav.contact'), section: '#contact' },
  ];

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  return (
    <header
      className={
        overlay
          ? 'absolute inset-x-0 top-0 z-20 border-b border-white/20 bg-black/15 text-white backdrop-blur-sm'
          : 'fixed inset-x-0 top-0 z-20 border-b border-black/5 bg-white/90 backdrop-blur-md'
      }
    >
      {siteConfig.developmentNotice.enabled && <DevelopmentNotice />}
      <div className="mx-auto grid min-h-[72px] max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 py-2 sm:px-5 lg:px-10">
        <a
          href={isLegalPage ? `/${locale}#top` : '#top'}
          className="flex min-w-0 max-w-[185px] flex-1 flex-col font-sans font-semibold tracking-normal sm:max-w-none"
        >
          <span className="text-xl leading-tight sm:text-2xl">
            {t('stylistName')}
            <span className="text-[#edbd58]">.</span>
          </span>
          <span className={`mt-1 break-words font-sans text-[8px] font-medium uppercase leading-tight tracking-[0.05em] sm:text-[9px] sm:tracking-[0.08em] ${overlay ? 'text-white/75' : 'text-[#6c757d]'}`}>
            {t('headerSpecialties')}
          </span>
        </a>
        <nav className={`hidden gap-7 text-sm font-medium min-[992px]:flex ${overlay ? 'text-white/90' : ''}`}>
          {navItems.map((item) => (
            <a
              key={item.section}
              className="transition-colors hover:text-[#edbd58]"
              href={isLegalPage ? `/${locale}${item.section}` : item.section}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="col-start-3 flex shrink-0 items-center justify-self-end gap-3">
          <div className="hidden items-center gap-3 min-[992px]:flex">
            <LanguageSwitcher />
            {siteConfig.booking.enabled && (
              <button
                onClick={() => onBook('header')}
                className={`${button({ size: 'header' })} !bg-[#edbd58] !text-[#211f1c] hover:!bg-[#f4cc78]`}
              >
                {t('book')}
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-md bg-[#edbd58] text-[#211f1c] transition-colors hover:bg-[#f4cc78] focus:outline-none focus:ring-2 focus:ring-[#edbd58] focus:ring-offset-2 focus:ring-offset-[#211f1c] min-[992px]:hidden"
            aria-label={t('menu')}
            aria-expanded={menuOpen}
            aria-controls="site-navigation-mobile"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div
          id="site-navigation-mobile"
          className={`border-t min-[992px]:hidden ${overlay ? 'border-white/15 bg-[#171614] text-white' : 'border-border bg-white text-[#211f1c]'}`}
        >
          <nav className="mx-auto max-w-7xl px-5">
            {navItems.map((item) => (
              <a
                key={item.section}
                href={isLegalPage ? `/${locale}${item.section}` : item.section}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-14 items-center border-b border-current/10 text-lg font-medium transition-colors hover:text-[#edbd58]"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5">
            <LanguageSwitcher mobile />
            {siteConfig.booking.enabled && (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onBook('mobile-menu');
                }}
                className={`${button({ size: 'hero' })} bg-[#edbd58] px-5 py-3 !text-[#211f1c] hover:bg-[#f4cc78]`}
              >
                {t('book')}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
