'use client';

import { useEffect } from 'react';
import { siteConfig } from '@/config/site';

type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  sent?: boolean;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
};

export function BookingModal({ isOpen }: BookingModalProps) {
  useEffect(() => {
    if (isOpen) window.location.assign(siteConfig.booking.url);
  }, [isOpen]);

  return null;
}

