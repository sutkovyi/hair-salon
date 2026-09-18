declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export type EventParams = {
  event_category?: string;
  event_label?: string;
  value?: number;
  language?: string;
  [key: string]: any;
};

export const trackEvent = (action: string, params?: EventParams) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, params);
  }
};
