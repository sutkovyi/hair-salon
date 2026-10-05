export const COOKIE_CONSENT_KEY = 'cookie-consent';
export const COOKIE_CONSENT_CHANGE = 'cookie-consent-change';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export type CookieConsent = 'accepted' | 'rejected';

function parseConsent(value: string | null): CookieConsent | null {
  return value === 'accepted' || value === 'rejected' ? value : null;
}

function readConsentCookie(): string | null {
  const match = document.cookie
    .split('; ')
    .find((part) => part.startsWith(`${COOKIE_CONSENT_KEY}=`));
  return match ? match.split('=')[1] ?? null : null;
}

export function getCookieConsent(): CookieConsent | null {
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    parseConsent(readConsentCookie()) ??
    parseConsent(window.localStorage.getItem(COOKIE_CONSENT_KEY))
  );
}

export function setCookieConsent(value: CookieConsent) {
  window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
  document.cookie = `${COOKIE_CONSENT_KEY}=${value}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  window.dispatchEvent(new Event(COOKIE_CONSENT_CHANGE));
}
