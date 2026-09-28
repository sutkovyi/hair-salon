'use client';

import { useTranslations } from 'next-intl';
import { Gallery, Item } from 'react-photoswipe-gallery';
import { SectionHeading } from './SectionHeading';

const portfolioPhotos = [
  { src: '064a6870-ecfc-44ee-af30-0ba86aa32c05.JPG', width: 960, height: 1280 },
  { src: '0bd41979-62bc-425c-b7f1-951dea1f7a34.JPG', width: 720, height: 1280 },
  { src: '10f26bc1-753d-46b9-91d6-b841d5892524.JPG', width: 1019, height: 1280 },
  { src: '14e59b20-73fe-4a7a-88fb-2e704e70bf41.JPG', width: 960, height: 1280 },
  { src: '17fd80aa-b9e9-466d-ba35-0a708dc9d879.JPG', width: 1028, height: 1280 },
  { src: '21cbc78c-e941-463a-8754-284a1670c334.JPG', width: 1213, height: 1280 },
  { src: '2820ea89-43e5-4142-8a9b-5474270bfdca.JPG', width: 960, height: 1280 },
  { src: '4d9686f7-9c3d-442b-ada0-85f7a92f0ad7.JPG', width: 1029, height: 1280 },
  { src: '574f8d4c-79e4-4fb7-b7c5-b06f5bf3bd20.JPG', width: 960, height: 1280 },
  { src: '57a9f4a2-7762-4260-8022-bd70222a3fe5.JPG', width: 720, height: 1280 },
  { src: '5e59de78-a0fa-4e2e-9cd4-7e407284d15f.JPG', width: 960, height: 1280 },
  { src: '78e49e35-5ee3-4d31-a48f-7713d0e5f779.JPG', width: 1024, height: 1280 },
  { src: '853fd03b-9da7-48c3-ad8d-a8834224c127.JPG', width: 960, height: 1280 },
  { src: '9073b54a-18ab-440b-a753-a78ba5bbfec8.JPG', width: 960, height: 1280 },
  { src: '96e0a56a-06a9-48be-b8be-3d63fb25e486.JPG', width: 1004, height: 1280 },
  { src: '976c18c8-77f5-4da1-a066-c7c2510749c5.JPG', width: 960, height: 1280 },
  { src: 'bd24aea2-77c2-440e-8ff6-3df86016d145.JPG', width: 1023, height: 1280 },
  { src: 'c0247c9b-92f7-4cc5-b782-b71b5758140e.JPG', width: 802, height: 1280 },
  { src: 'd32c2391-3b6e-44a3-bf41-5a153e78a135.JPG', width: 960, height: 1280 },
  { src: 'db888c16-cb8d-4ded-bb2a-bb5b1091d55f.JPG', width: 960, height: 1280 },
  { src: 'de61e915-4745-4418-96f4-23117fb15e78.JPG', width: 960, height: 1280 },
  { src: 'e133d512-1b54-4613-a3ba-694c803d86e1.JPG', width: 960, height: 1280 },
  { src: 'ea7092b3-c0a1-4f45-a2da-8a8f57a2f5bc.JPG', width: 960, height: 1280 },
  { src: 'f32d38b9-ad76-4173-94ce-3fef35a8a054.JPG', width: 1017, height: 1280 },
  { src: 'fc992a9e-7bfe-494a-8b2c-baeab09925b1.JPG', width: 960, height: 1280 },
];

const portfolioVideos = [
  '0d38a67f-5fe0-4db7-ab95-f9891c769e1a.MP4',
  'd82a3333-a677-4ff2-870a-0ca6844a1cea.MP4',
  'f6232d49-d015-4e9d-a78e-7bbd3b950e7c.MP4',
];

const portfolioPath = '/portfolio/';

export function PortfolioSection() {
  const t = useTranslations();
  const imageAlt = t('portfolioImageAlt');

  return (
    <section id="portfolio" className="bg-[#e9eee8] px-5 py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title={t('portfolioTitle')} intro={t('portfolioIntro')} />
        <Gallery id="hair-portfolio" withCaption>
          <div
            className="portfolio-grid grid gap-3"
            style={{ justifyItems: 'center' }}
          >
            {portfolioPhotos.map((photo) => {
              const src = `${portfolioPath}${photo.src}`;

              return (
                <Item
                  key={photo.src}
                  original={src}
                  thumbnail={src}
                  width={photo.width}
                  height={photo.height}
                  alt={imageAlt}
                >
                  {({ ref, open }) => (
                    <button
                      ref={ref}
                      type="button"
                      onClick={open}
                      className="group aspect-[4/5] overflow-hidden rounded-md bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b6c23]"
                      aria-label={imageAlt}
                      style={{ maxWidth: 'clamp(100px, 14vw, 160px)' }}
                    >
                      <img
                        src={src}
                        alt={imageAlt}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </button>
                  )}
                </Item>
              );
            })}
            {portfolioVideos.map((video) => (
              <video
                key={video}
                src={`${portfolioPath}${video}`}
                controls
                playsInline
                preload="metadata"
                aria-label={t('portfolioVideoAlt')}
                className="aspect-[4/5] w-full rounded-md bg-[#211f1c] object-cover"
                style={{ maxWidth: 'clamp(100px, 14vw, 160px)' }}
              />
            ))}
          </div>
        </Gallery>
      </div>
    </section>
  );
}