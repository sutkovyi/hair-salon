'use client';

import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

type HeaderProps = {
  onBook: () => void;
};

export function Header({ onBook }: HeaderProps) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: 'uk' | 'en') => {
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
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-10">
        <a href="#top" className="font-serif text-2xl tracking-[0.08em]">
          L’ÉLÉGANCE<span className="text-[#d4a373]">.</span>
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
        <div className="flex items-center gap-3">
          <div className="flex rounded-full border border-[#e0e0e0] p-1 text-xs">
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
              className={`rounded-full px-2.5 py-1 ${
                locale === 'en' ? 'bg-[#2b2d42] text-white' : ''
              }`}
            >
              EN
            </button>
          </div>
          <button
            onClick={onBook}
            className="rounded-full bg-[#d4a373] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#bc8a5f]"
          >
            {t('book')}
          </button>
        </div>
      </div>
    </header>
  );
}
