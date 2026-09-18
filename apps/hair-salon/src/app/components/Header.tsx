'use client';

import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { trackEvent } from '../../lib/gtag';

type HeaderProps = {
  onBook: (location?: string) => void;
};

export function Header({ onBook }: HeaderProps) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: 'uk' | 'en') => {
    trackEvent('change_language', {
      event_category: 'engagement',
      language: newLocale,
    });
    router.replace(pathname, { locale: newLocale });
  };

  const navItems = [
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.prices'), href: '#prices' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-20 border-b border-black/5 bg-white/90 backdrop-blur-md">
      <div className="mx-auto grid min-h-[72px] max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 py-2 sm:px-5 lg:px-10">
        <a
          href="#top"
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
              key={item.href}
              className="transition-colors hover:text-[#bc8a5f]"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="col-start-3 flex shrink-0 items-center justify-self-end gap-1.5 sm:gap-3">
          <div className="flex rounded-full border border-[#e0e0e0] p-0.5 text-[10px] sm:p-1 sm:text-xs">
            <button
              onClick={() => handleLanguageChange('uk')}
              className={`rounded-full px-2.5 py-1 ${
                locale === 'uk' ? 'bg-[#2b2d42] text-white' : ''
              }`}
            >
              UA
            </button>
            <button
              onClick={() => handleLanguageChange('en')}
              className={`rounded-full px-2 py-1 sm:px-2.5 ${
                locale === 'en' ? 'bg-[#2b2d42] text-white' : ''
              }`}
            >
              EN
            </button>
          </div>
          <button
            onClick={() => onBook('header')}
            className="rounded-full bg-[#d4a373] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.05em] text-white transition hover:bg-[#bc8a5f] sm:px-4 sm:py-2.5 sm:text-xs sm:tracking-[0.08em]"
          >
            {t('book')}
          </button>
        </div>
      </div>
    </header>
  );
}
