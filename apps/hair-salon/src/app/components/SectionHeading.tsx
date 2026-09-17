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
            <svg
              className="inline-block ml-1.5 h-4 w-4 align-middle relative -top-[3px] opacity-70"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </a>
        ) : (
          value
        )}
      </p>
    </div>
  );
}
