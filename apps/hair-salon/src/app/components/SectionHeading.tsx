export function SectionHeading({ title, intro }: { title: string; intro: string }) {
  return <div className="mb-12 text-center"><h2 className="font-serif text-5xl sm:text-6xl">{title}</h2><p className="mt-3 text-[#6c757d]">{intro}</p></div>;
}

export function Info({ label, value, href }: { label: string; value: React.ReactNode; href?: string }) {
  return (
    <div>
      <h3 className="font-semibold text-[#bc8a5f]">{label}</h3>
      <p className="mt-1">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-[#bc8a5f] transition-colors"
          >
            {value}
          </a>
        ) : (
          value
        )}
      </p>
    </div>
  );
}
