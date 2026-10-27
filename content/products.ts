import type { FamilyRole } from './family';
import type { SolutionSlug } from './solutions';

export type SkuSlug = 'home-box' | 'community-kit' | 'enterprise-stack';

export type Sku = {
  slug: SkuSlug;
  i18nKey: 'homeBox' | 'communityKit' | 'enterpriseStack';
  deploymentWeeks: string;
  users: string;
  family: FamilyRole[];
  recommendedFor: SolutionSlug[];
};

export const skus: Sku[] = [
  {
    slug: 'home-box',
    i18nKey: 'homeBox',
    deploymentWeeks: '0.5',
    users: '1 household',
    family: ['gateway', 'sense', 'control', 'connect'],
    recommendedFor: ['smart-home'],
  },
  {
    slug: 'community-kit',
    i18nKey: 'communityKit',
    deploymentWeeks: '2-4',
    users: '20-200 units',
    family: ['gateway', 'sense', 'control', 'connect'],
    recommendedFor: ['elderly-care', 'community-care', 'smart-room'],
  },
  {
    slug: 'enterprise-stack',
    i18nKey: 'enterpriseStack',
    deploymentWeeks: '6-12',
    users: 'Floor / ward / campus',
    family: ['gateway', 'sense', 'control', 'connect'],
    recommendedFor: ['clinical-assist'],
  },
];

export function getSku(slug: SkuSlug) {
  return skus.find((s) => s.slug === slug);
}
