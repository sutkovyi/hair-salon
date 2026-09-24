import { NextResponse } from 'next/server';
import {
  BOOKING_SERVICES_CACHE_KEY,
  BOOKING_SERVICES_CACHE_TTL_SECONDS,
} from '../../lib/booking-services';


type CalEventType = {
  id: number;
  title: string;
  lengthInMinutes: number;
  bookingUrl: string;
  description: string;
};

type ServiceCategory = 'childHaircuts' | 'childStyling' | 'haircuts' | 'styling';

const CATEGORY_ORDER: ServiceCategory[] = [
  'childHaircuts',
  'childStyling',
  'haircuts',
  'styling',
];

function getCategory(description: string): ServiceCategory | undefined {
  const category = description.split('»')[0]?.trim();
  const categories: Record<string, ServiceCategory> = {
    'Дитячі стрижки': 'childHaircuts',
    'Дитячі укладки': 'childStyling',
    'Стрижки': 'haircuts',
    'Укладання': 'styling',
  };

  return categories[category];
}

type CacheBinding = {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
};

function getCache(): CacheBinding | undefined {
  return (process.env as unknown as { BOOKING_CACHE?: CacheBinding }).BOOKING_CACHE;
}

export async function GET() {
  const apiKey = process.env.CAL_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Booking service is not configured.' },
      { status: 503 }
    );
  }

  const cache = getCache();

  try {
    const cached = await cache?.get(BOOKING_SERVICES_CACHE_KEY);
    if (cached) {
      return NextResponse.json(JSON.parse(cached), {
        headers: {
          'Cache-Control': 's-maxage=300, stale-while-revalidate=600',
          'X-Booking-Services-Cache': 'HIT',
        },
      });
    }
  } catch {
    // KV is an optimization; Cal.com remains the source of truth.
  }

  const response = await fetch('https://api.cal.com/v2/event-types', {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'cal-api-version': '2024-06-14',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: 'Unable to load booking services.' },
      { status: 502 }
    );
  }

  const payload = (await response.json()) as { data?: CalEventType[] };
  const services = (payload.data ?? [])
    .map(({ id, title, lengthInMinutes, bookingUrl, description }, index) => ({
      id,
      title,
      lengthInMinutes,
      bookingUrl,
      category: getCategory(description),
      index,
    }))
    .filter((service): service is typeof service & { category: ServiceCategory } =>
      service.category !== undefined
    )
    .sort(
      (first, second) =>
        CATEGORY_ORDER.indexOf(first.category) - CATEGORY_ORDER.indexOf(second.category) ||
        first.index - second.index
    )
    .map(({ index: _index, ...service }) => service);

  try {
    await cache?.put(BOOKING_SERVICES_CACHE_KEY, JSON.stringify(services), {
      expirationTtl: BOOKING_SERVICES_CACHE_TTL_SECONDS,
    });
  } catch {
    // A KV write failure must not prevent the catalog from loading.
  }

  return NextResponse.json(services, {
    headers: {
      'Cache-Control': 's-maxage=300, stale-while-revalidate=600',
      'X-Booking-Services-Cache': 'MISS',
    },
  });
}