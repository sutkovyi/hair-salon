import { getFormattedSalonAddress } from '@/config/site';
import { legalContentUk } from './legal-content-uk';
import { legalContentEn } from './legal-content-en';
import { legalContentRu } from './legal-content-ru';
import { privacyUk } from './legal-privacy-uk';
import { privacyEn } from './legal-privacy-en';
import { privacyRu } from './legal-privacy-ru';
import { cookiesUk } from './legal-cookies-uk';
import { cookiesEn } from './legal-cookies-en';
import { cookiesRu } from './legal-cookies-ru';

function applyLocation(content: string) {
  return content
    .replaceAll(
      '{{formattedAddress}}',
      getFormattedSalonAddress().replaceAll('&', '&amp;'),
    );
}

export const legalContent = {
  uk: { terms: applyLocation(legalContentUk.terms), privacy: applyLocation(privacyUk), cookies: cookiesUk },
  en: { terms: applyLocation(legalContentEn.terms), privacy: applyLocation(privacyEn), cookies: cookiesEn },
  ru: { terms: applyLocation(legalContentRu.terms), privacy: applyLocation(privacyRu), cookies: cookiesRu },
};
