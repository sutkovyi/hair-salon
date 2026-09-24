'use client';

import { BookingServices } from './BookingServices';
import { bookingModal } from '../ui-variants';
import { useTranslations } from 'next-intl';

type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  sent?: boolean;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
};

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const t = useTranslations();

  return (
    <div
      className={bookingModal({ open: isOpen }).backdrop()}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={bookingModal().panel()}>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-serif text-xl text-[#2b2d42] sm:text-2xl">
            {t('bookingCatalog.title')}
          </h2>
          <button
            aria-label={t('close')}
            onClick={onClose}
            className={bookingModal().close()}
          >
            ×
          </button>
        </div>
        <BookingServices compact active={isOpen} />
      </div>
    </div>
  );
}

