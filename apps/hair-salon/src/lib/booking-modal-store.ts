import { create } from 'zustand';

type BookingModalStore = {
  isOpen: boolean;
  initialized: boolean;
  requestedLocation: string | null;
  setOpen: (isOpen: boolean) => void;
  requestOpen: (location: string) => void;
  clearRequest: () => void;
};

export const useBookingModalStore = create<BookingModalStore>((set) => ({
  isOpen: false,
  initialized: false,
  requestedLocation: null,
  setOpen: (isOpen) =>
    set({ isOpen, initialized: true, requestedLocation: null }),
  requestOpen: (requestedLocation) =>
    set({ isOpen: true, initialized: true, requestedLocation }),
  clearRequest: () => set({ requestedLocation: null }),
}));