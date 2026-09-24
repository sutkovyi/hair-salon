'use client';

import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { siteConfig } from '@/config/site';
import { trackEvent } from '../../lib/gtag';
import { DevelopmentNotice } from './DevelopmentNotice';
import { button, languageOption } from '../ui-variants';
import { Menu } from 'lucide-react';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from './ui/sheet';

type HeaderProps = {
  onBook?: (location?: string) => void;
};

export function Header({ onBook = () => undefined }: HeaderProps) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const isLegalPage = pathname === '/privacy' || pathname === '/terms';

  const handleLanguageChange = (newLocale: 'uk' | 'en') => {
    trackEvent('change_language', {
      event_category: 'engagement',
      language: newLocale,
    });
    router.replace(pathname, { locale: newLocale });
  };

  const navItems = [
    { label: t('nav.services'), section: '#services' },
    { label: t('nav.prices'), section: '#prices' },
    { label: t('nav.about'), section: '#about' },
    { label: t('nav.contact'), section: '#contact' },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-20 border-b border-black/5 bg-white/90 backdrop-blur-md">
      {siteConfig.developmentNotice.enabled && !siteConfig.booking.enabled && (
        <DevelopmentNotice />
      )}
      <div className="mx-auto grid min-h-[72px] max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 py-2 sm:px-5 lg:px-10">
        <a
          href={isLegalPage ? `/${locale}#top` : '#top'}
          className="flex min-w-0 max-w-[185px] flex-1 flex-col font-serif tracking-[0.08em] sm:max-w-none"
        >
          <span className="text-xl leading-tight sm:text-2xl">
            {t('stylistName')}<span className="text-[#d4a373]">.</span>
          </span>
          <span className="mt-1 break-words font-sans text-[8px] font-medium uppercase leading-tight tracking-[0.05em] text-[#6c757d] sm:text-[9px] sm:tracking-[0.08em]">
            {t('headerSpecialties')}
          </span>
        </a>
        <nav className="hidden gap-7 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <a
              key={item.section}
              className="transition-colors hover:text-[#bc8a5f]"
              href={isLegalPage ? `/${locale}${item.section}` : item.section}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="col-start-3 flex shrink-0 items-center justify-self-end gap-4 sm:gap-3">
          <div className="flex rounded-full border border-[#e0e0e0] p-0.5 text-[10px] sm:p-1 sm:text-xs">
            <button
              onClick={() => handleLanguageChange('uk')}
              className={languageOption({ size: 'uk', active: locale === 'uk' })}
            >
              UA
            </button>
            <button
              onClick={() => handleLanguageChange('en')}
              className={languageOption({ size: 'en', active: locale === 'en' })}
            >
              EN
            </button>
          </div>
          {siteConfig.booking.enabled && (
            <button
              onClick={() => onBook('header')}
              className={`hidden md:inline-flex ${button({ size: 'header' })}`}
            >
              {t('book')}
            </button>
          )}
          <Sheet>
            <SheetTrigger
              className="rounded-full p-3 text-[#2b2d42] transition-colors hover:bg-[#f2e7dc] focus:outline-none focus:ring-2 focus:ring-[#bc8a5f] md:hidden"
              aria-label={t('menu')}
            >
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent>
              <div className="mt-10 flex flex-col gap-6 font-serif text-2xl">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.section}>
                    <a href={isLegalPage ? `/${locale}${item.section}` : item.section}>
                      {item.label}
                    </a>
                  </SheetClose>
                ))}
              </div>
              <div className="mt-auto flex items-center gap-3 border-t border-border pt-6">
                <div className="flex rounded-full border border-[#e0e0e0] p-1 text-xs">
                  <button
                    onClick={() => handleLanguageChange('uk')}
                    className={languageOption({ size: 'uk', active: locale === 'uk' })}
                  >
                    UA
                  </button>
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className={languageOption({ size: 'en', active: locale === 'en' })}
                  >
                    EN
                  </button>
                </div>
                {siteConfig.booking.enabled && (
                  <SheetClose asChild>
                    <button
                      onClick={() => onBook('mobile-menu')}
                      className={button({ size: 'header' })}
                    >
                      {t('book')}
                    </button>
                  </SheetClose>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
