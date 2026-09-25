export function SectionHeading({
  title,
  intro,
  inverse = false,
}: {
  title: string;
  intro: string;
  inverse?: boolean;
}) {
  return (
    <div className="mb-12 text-center">
      <h2 className={`font-sans text-4xl font-semibold leading-tight sm:text-5xl ${inverse ? 'text-white' : 'text-[#211f1c]'}`}>
        {title}
      </h2>
      <p className={`mt-3 ${inverse ? 'text-white/65' : 'text-[#6c757d]'}`}>
        {intro}
      </p>
    </div>
  );
}

export function Info({
  label,
  value,
  href,
  showExternalIcon = true,
}: {
  label: string;
  value: React.ReactNode;
  href?: string;
  showExternalIcon?: boolean;
}) {
  return (
    <div>
      <h3 className="font-semibold text-[#9b6c23]">{label}</h3>
      <p className="mt-1">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[#9b6c23] hover:underline"
          >
            {value}
            {showExternalIcon && (
              <svg
                className="inline-block ml-1.5 h-4 w-4 align-middle relative -top-[2px] opacity-70"
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
            )}
          </a>
        ) : (
          value
        )}
      </p>
    </div>
  );
}
