'use client';

import { BookingServices } from './BookingServices';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
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
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader className="mb-4 min-h-12 justify-center pr-10">
          <DialogTitle>{t('bookingCatalog.title')}</DialogTitle>
        </DialogHeader>
        <BookingServices compact active={isOpen} />
      </DialogContent>
    </Dialog>
  );
}

