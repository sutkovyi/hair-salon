import { Copy, Language, prices } from './content';
import { SectionHeading } from './SectionHeading';

export function PricesSection({ language, text }: { language: Language; text: Copy }) {
  return <section id="prices" className="bg-white px-5 py-24 lg:px-10"><div className="mx-auto max-w-4xl"><SectionHeading title={text.pricesTitle} intro={text.pricesIntro} /><div className="divide-y divide-dashed divide-[#e0e0e0] border-y border-[#e0e0e0]">{prices.map((item) => <div key={item.en} className="flex items-baseline gap-3 py-5"><span className="font-medium">{item[language]}</span><span className="flex-1 border-b border-dotted border-[#d7d7d7]" /><span className="whitespace-nowrap font-serif text-xl font-bold text-[#bc8a5f]">{item.price}</span></div>)}</div></div></section>;
}
