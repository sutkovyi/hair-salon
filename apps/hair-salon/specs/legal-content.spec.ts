import { legalContent } from '../src/app/[locale]/legal-content';

describe('localized legal content', () => {
  it('contains the complete privacy and terms documents in both languages', () => {
    expect(legalContent.uk.privacy).toContain('Політика конфіденційності (Privacy Policy)');
    expect(legalContent.uk.privacy).toContain('Cloudflare Workers');
    expect(legalContent.uk.terms).toContain('Умови використання та правила обслуговування');
    expect(legalContent.en.privacy).toContain('Privacy Policy');
    expect(legalContent.en.privacy).toContain('LOPDGDD');
    expect(legalContent.en.terms).toContain('Terms of Service and Appointment Rules');
    expect(legalContent.en.terms).toContain('15 minutes');
  });
});