'use client';

import Cal, { getCalApi } from '@calcom/embed-react';
import { useEffect } from 'react';

export function EventTypeBooker() {
  useEffect(() => {
    let active = true;

    void getCalApi().then((cal) => {
      if (!active) return;

      cal('on', {
        action: 'bookingSuccessfulV2',
        callback: () => {
          console.log('Booking created successfully.');
        },
      });
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <Cal
      calLink="krasovska/test-20-min"
      calOrigin="https://cal.com"
      config={{ layout: 'month_view' }}
      className="min-h-[720px] w-full"
      style={{ width: '100%', height: '100%', overflow: 'auto' }}
    />
  );
}
