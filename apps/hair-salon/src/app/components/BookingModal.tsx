'use client';

import { useTranslations } from 'next-intl';

type BookingModalProps = {
  sent: boolean;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export function BookingModal({ sent, onClose, onSubmit }: BookingModalProps) {
  const t = useTranslations();

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-[#2b2d42]/60 px-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md bg-[#faf7f2] p-7 sm:p-10">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#bc8a5f]">
              L’Élégance
            </p>
            <h2 className="mt-2 font-serif text-4xl">{t('book')}</h2>
          </div>
          <button
            aria-label={t('close')}
            onClick={onClose}
            className="text-2xl text-[#6c757d]"
          >
            ×
          </button>
        </div>
        <form className="mt-7 space-y-4" onSubmit={onSubmit}>
          <input
            required
            placeholder={t('name')}
            className="w-full border-b border-[#d8d0c7] bg-transparent px-0 py-3 outline-none"
          />
          <input
            required
            placeholder={t('phone')}
            className="w-full border-b border-[#d8d0c7] bg-transparent px-0 py-3 outline-none"
          />
          <button className="mt-4 w-full rounded-full bg-[#d4a373] px-5 py-4 text-sm font-semibold uppercase tracking-[0.08em] text-white">
            {t('submit')}
          </button>
          {sent && <p className="bg-[#f2e4d4] p-4 text-sm">{t('sent')}</p>}
        </form>
      </div>
    </div>
  );
}
