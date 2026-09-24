export type ServiceCategory = 'childHaircuts' | 'childStyling' | 'haircuts' | 'styling';

export type BookingService = {
  id: number;
  title: string;
  lengthInMinutes: number;
  bookingUrl: string;
  category: ServiceCategory;
};

type CalEventType = {
  id: number;
  title: string;
  lengthInMinutes: number;
  bookingUrl: string;
  description: string;
};

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

export async function getBookingServices(): Promise<BookingService[]> {
  const apiKey = process.env.CAL_API_KEY;
  if (!apiKey) return [];

  try {
    const response = await fetch('https://api.cal.com/v2/event-types', {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'cal-api-version': '2024-06-14',
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) return [];

    const payload = (await response.json()) as { data?: CalEventType[] };

    return (payload.data ?? [])
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
  } catch {
    return [];
  }
}
