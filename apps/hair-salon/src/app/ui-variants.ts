import { tv } from 'tailwind-variants';

export const button = tv({
  base: 'cursor-pointer rounded-full font-semibold uppercase text-white transition',
  variants: {
    intent: {
      primary: 'bg-[#d4a373] hover:bg-[#bc8a5f]',
    },
    size: {
      header:
        'px-2.5 py-1.5 text-[9px] tracking-tight xs:text-[10px] sm:px-3.5 sm:py-2 sm:text-xs sm:tracking-[0.08em]',
      hero: 'px-8 py-4 text-sm tracking-[0.1em] hover:-translate-y-1',
      cookie: 'px-3 py-1.5 text-[10px] tracking-[0.08em]',
    },
  },
  defaultVariants: {
    intent: 'primary',
  },
});
export const languageOption = tv({
  base: 'cursor-pointer rounded-full',
  variants: {
    active: {
      true: 'bg-[#2b2d42] text-white',
      false: '',
    },
    size: {
      uk: 'px-2.5 py-1',
      en: 'px-2 py-1 sm:px-2.5',
    },
  },
});
