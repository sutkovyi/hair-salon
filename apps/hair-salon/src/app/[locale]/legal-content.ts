import { legalContentUk } from './legal-content-uk';
import { legalContentEn } from './legal-content-en';
import { legalContentRu } from './legal-content-ru';
import { privacyUk } from './legal-privacy-uk';
import { privacyEn } from './legal-privacy-en';
import { privacyRu } from './legal-privacy-ru';
import { cookiesUk } from './legal-cookies-uk';
import { cookiesEn } from './legal-cookies-en';
import { cookiesRu } from './legal-cookies-ru';

export const legalContent = {
  uk: { terms: legalContentUk.terms, privacy: privacyUk, cookies: cookiesUk },
  en: { terms: legalContentEn.terms, privacy: privacyEn, cookies: cookiesEn },
  ru: { terms: legalContentRu.terms, privacy: privacyRu, cookies: cookiesRu },
};
