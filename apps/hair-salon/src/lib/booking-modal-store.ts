import { create } from 'zustand';

type BookingModalStore = {
  isOpen: boolean;
  initialized: boolean;
  setOpen: (isOpen: boolean) => void;
};

export const useBookingModalStore = create<BookingModalStore>((set) => ({
  isOpen: false,
  initialized: false,
  setOpen: (isOpen) => set({ isOpen, initialized: true }),
}));