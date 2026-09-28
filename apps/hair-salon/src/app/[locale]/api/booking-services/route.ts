import { NextResponse } from 'next/server';
import { routing } from '@/i18n/routing';
import {
  BOOKING_SERVICES_CACHE_TTL_SECONDS,
  getBookingServicesCacheKey,
  mapBookingServices,
} from '../../../lib/booking-services';

type CacheBinding = {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
};

function getCache(): CacheBinding | undefined {
  return (process.env as unknown as { BOOKING_CACHE?: CacheBinding }).BOOKING_CACHE;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale: requestedLocale } = await params;
  const locale = routing.locales.find((supportedLocale) => supportedLocale === requestedLocale);

  if (!locale) {
    return NextResponse.json({ error: 'Unsupported locale.' }, { status: 404 });
  }

  const apiKey = process.env.CAL_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Booking service is not configured.' },
      { status: 503 }
    );
  }

  const cacheKey = getBookingServicesCacheKey(locale);
  const cache = getCache();

  try {
    const cached = await cache?.get(cacheKey);
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

  const payload = await response.json();
  const services = mapBookingServices(payload, locale);

  try {
    await cache?.put(cacheKey, JSON.stringify(services), {
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