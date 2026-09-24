'use client';

import Cal, { getCalApi } from '@calcom/embed-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { bookingModal } from '../ui-variants';

type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  sent?: boolean;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
};

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const t = useTranslations();

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: 'запис-на-стрижку' });
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' });
    })();
  }, []);

  return (
    <div
      className={bookingModal({ open: isOpen }).backdrop()}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={bookingModal().panel()}>
        <div className="flex items-center justify-between pb-2 mb-2">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl text-[#2b2d42]">
              {t('book')}
            </h2>
          </div>
          <button
            aria-label={t('close')}
            onClick={onClose}
            className={bookingModal().close()}
          >
            ×
          </button>
        </div>
        <div className="flex-1 w-full overflow-y-auto rounded-xl bg-white">
          <Cal
            namespace="запис-на-стрижку"
            calLink="mykola-sutkovyi-ejevdu/запис-на-стрижку"
            style={{
              width: '100%',
              height: '100%',
              overflow: 'scroll',
              backgroundColor: '#ffffff',
            }}
            config={{ layout: 'month_view', useSlotsViewOnSmallScreen: 'true' }}
          />
        </div>
      </div>
    </div>
  );
}

