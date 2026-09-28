export type ServiceCategory =
  | 'childrens_haircuts'
  | 'childrens_styling'
  | 'haircuts'
  | 'styling';

export type BookingService = {
  id: number;
  title: string;
  lengthInMinutes: number;
  bookingUrl: string;
};

export type BookingServices = Record<ServiceCategory, BookingService[]>;

type CalEventType = {
  id: number;
  slug: string;
  title: string;
  length?: number;
  lengthInMinutes?: number;
  description: string;
  hidden: boolean;
  users?: { username: string }[];
  bookingFields?: { name: string; placeholder?: ServiceCategory }[];
};

type CalEventTypeGroup = {
  profile: { slug: string };
  eventTypes: CalEventType[];
};

type CalEventTypesResponse = {
  data?: CalEventType[] | { eventTypeGroups?: CalEventTypeGroup[] };
};

export const BOOKING_SERVICES_CACHE_KEY = 'booking-services:v7';
export const BOOKING_SERVICES_CACHE_TTL_SECONDS = 30 * 24 * 60 * 60;

export function getBookingServicesCacheKey(locale: string) {
  return `${BOOKING_SERVICES_CACHE_KEY}:${locale}`;
}

type CacheBinding = {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
};

function getCache(): CacheBinding | undefined {
  return (process.env as unknown as { BOOKING_CACHE?: CacheBinding }).BOOKING_CACHE;
}

function getCategory(
  bookingFields: CalEventType['bookingFields'],
): ServiceCategory | undefined {
  return bookingFields?.find((field) => field.name === 'category')?.placeholder;
}

export function createEmptyBookingServices(): BookingServices {
  return {
    childrens_haircuts: [],
    childrens_styling: [],
    haircuts: [],
    styling: [],
  };
}

export function mapBookingServices(
  payload: CalEventTypesResponse,
  locale: string,
): BookingServices {
  const services = createEmptyBookingServices();
  const slugLocale = locale === 'uk' ? 'ua' : locale;
  const eventTypes: { eventType: CalEventType; profileSlug?: string }[] = Array.isArray(payload.data)
    ? payload.data.map((eventType) => ({
        eventType,
        profileSlug: eventType.users?.[0]?.username,
      }))
    : (payload.data?.eventTypeGroups ?? []).flatMap((group) =>
        group.eventTypes.map((eventType) => ({
          eventType,
          profileSlug: group.profile.slug,
        })),
      );

  for (const { eventType, profileSlug } of eventTypes) {
    const lengthInMinutes = eventType.lengthInMinutes ?? eventType.length;

    if (
      eventType.hidden !== false ||
      !eventType.slug.startsWith(`${slugLocale}-`) ||
      !profileSlug ||
      lengthInMinutes === undefined
    ) {
      continue;
    }

    const category = getCategory(eventType.bookingFields);
    if (!category) continue;

    services[category].push({
      id: eventType.id,
      title: eventType.title,
      lengthInMinutes,
      bookingUrl: `https://cal.com/${profileSlug}/${eventType.slug}`,
    });
  }

  return services;
}

export async function getBookingServices(locale: string): Promise<BookingServices> {
  const apiKey = process.env.CAL_API_KEY;
  if (!apiKey) return createEmptyBookingServices();

  const cache = getCache();
  const cacheKey = getBookingServicesCacheKey(locale);

  try {
    const cached = await cache?.get(cacheKey);
    if (cached) return JSON.parse(cached) as BookingServices;
  } catch {
    // KV is an optimization; Cal.com remains the source of truth.
  }

  try {
    const response = await fetch('https://api.cal.com/v2/event-types', {
      headers: {
        Authorization: `Bearer ${apiKey}`
      },
      cache: 'no-store',
    });

    if (!response.ok) return createEmptyBookingServices();

    const payload = (await response.json()) as CalEventTypesResponse;
    const services = mapBookingServices(payload, locale);

    try {
      await cache?.put(cacheKey, JSON.stringify(services), {
        expirationTtl: BOOKING_SERVICES_CACHE_TTL_SECONDS,
      });
    } catch {
      // A KV write failure must not prevent the catalog from loading.
    }

    return services;
  } catch {
    return createEmptyBookingServices();
  }
}
