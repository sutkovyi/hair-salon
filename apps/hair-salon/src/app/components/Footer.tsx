import { Language } from './content';

export function Footer({ language }: { language: Language }) {
  return <footer className="bg-[#2b2d42] px-5 py-9 text-center text-sm text-white/80"><p className="font-serif text-3xl text-white">L’ÉLÉGANCE<span className="text-[#d4a373]">.</span></p><p className="mt-3">© 2026 L’Élégance Beauty Salon. {language === 'uk' ? 'Усі права захищено.' : 'All rights reserved.'}</p></footer>;
}
