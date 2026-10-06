import { create } from 'zustand';

type CookieConsentStore = {
  analyticsEnabled: boolean;
  setAnalyticsEnabled: (enabled: boolean) => void;
};

export const useCookieConsentStore = create<CookieConsentStore>((set) => ({
  analyticsEnabled: false,
  setAnalyticsEnabled: (analyticsEnabled) => set({ analyticsEnabled }),
}));