'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { trackEvent } from '../../lib/gtag';
import { languageOption } from '../ui-variants';

type SupportedLocale = 'uk' | 'en' | 'ru';

type LanguageSwitcherProps = {
  mobile?: boolean;
};

const languages: SupportedLocale[] = ['uk', 'en', 'ru'];

export function LanguageSwitcher({ mobile = false }: LanguageSwitcherProps) {
  const locale = useLocale() as SupportedLocale;
  const t = useTranslations('languageSwitcher');
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: SupportedLocale) => {
    trackEvent('change_language', {
      event_category: 'engagement',
      language: newLocale,
    });
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div
      className={
        mobile
          ? 'flex rounded-full border border-[#e0e0e0] p-1 text-xs'
          : 'flex rounded-full border border-[#e0e0e0] p-0.5 text-[10px] sm:p-1 sm:text-xs'
      }
    >
      {languages.map((language) => (
        <button
          key={language}
          onClick={() => handleLanguageChange(language)}
          className={languageOption({
            size: language === 'uk' ? 'uk' : 'en',
            active: locale === language,
          })}
        >
          {t(`languages.${language}`)}
        </button>
      ))}
    </div>
  );
}
