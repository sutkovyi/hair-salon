export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#faf7f2] px-5 py-24 text-[#2b2d42]">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-serif text-4xl">Page not found</h1>
        <p className="mt-4 leading-7">
          The requested page does not exist. Visit the <a className="underline" href="/sitemap.xml">sitemap</a>{' '}
          or <a className="underline" href="/llms.txt">agent guidance</a> to find available pages.
        </p>
      </div>
    </main>
  );
}