import { NextResponse } from 'next/server';

const CACHE_KEY = 'booking-services:v1';
const CACHE_TTL_SECONDS = 300;

type CalEventType = {
  id: number;
  title: string;
  lengthInMinutes: number;
  bookingUrl: string;
};

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
    const cached = await cache?.get(CACHE_KEY);
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
  const services = (payload.data ?? []).map(({ id, title, lengthInMinutes, bookingUrl }) => ({
    id,
    title,
    lengthInMinutes,
    bookingUrl,
  }));

  try {
    await cache?.put(CACHE_KEY, JSON.stringify(services), {
      expirationTtl: CACHE_TTL_SECONDS,
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