'use client';

import Cal, { getCalApi } from '@calcom/embed-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

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
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#2b2d42]/60 px-4 py-2 sm:px-6 sm:py-3 transition-opacity duration-200 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative flex flex-col w-full max-w-4xl h-[90vh] max-h-[780px] bg-[#faf7f2] px-5 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between pb-2 border-b border-[#d8d0c7]/60 mb-2">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl text-[#2b2d42]">
              {t('book')}
            </h2>
          </div>
          <button
            aria-label={t('close')}
            onClick={onClose}
            className="text-2xl text-[#6c757d] hover:text-[#2b2d42] transition-colors p-1 leading-none"
          >
            ×
          </button>
        </div>
        <div className="flex-1 w-full overflow-y-auto rounded-xl">
          <Cal
            namespace="запис-на-стрижку"
            calLink="mykola-sutkovyi-ejevdu/запис-на-стрижку"
            style={{ width: '100%', height: '100%', overflow: 'scroll' }}
            config={{ layout: 'month_view', useSlotsViewOnSmallScreen: 'true' }}
          />
        </div>
      </div>
    </div>
  );
}

