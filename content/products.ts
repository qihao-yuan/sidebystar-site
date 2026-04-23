import type { FamilyRole } from './family';
import type { SolutionSlug } from './solutions';

export type SkuSlug = 'home-box' | 'community-kit' | 'enterprise-stack';

export type Sku = {
  slug: SkuSlug;
  i18nKey: 'homeBox' | 'communityKit' | 'enterpriseStack';
  specs: {
    chip: string;
    memory: string;
    storage: string;
    ai: string;
    protocols: string[];
    ports: string;
    power: string;
    dimensions: string;
  };
  deploymentWeeks: string;
  users: string;
  family: FamilyRole[];
  recommendedFor: SolutionSlug[];
};

export const skus: Sku[] = [
  {
    slug: 'home-box',
    i18nKey: 'homeBox',
    specs: {
      chip: 'RK3588 8-core ARM',
      memory: '16 GB LPDDR5',
      storage: '256 GB eMMC + M.2 slot',
      ai: '6 TOPS NPU on-chip',
      protocols: ['Matter 1.3', 'Zigbee', 'BLE', 'Wi-Fi 6'],
      ports: '2 x GbE, 4 x USB 3.0, HDMI 2.1',
      power: '24 W fanless',
      dimensions: '140 x 140 x 32 mm',
    },
    deploymentWeeks: '0.5',
    users: '1 household',
    family: ['gateway', 'sense', 'control', 'connect'],
    recommendedFor: ['smart-home'],
  },
  {
    slug: 'community-kit',
    i18nKey: 'communityKit',
    specs: {
      chip: 'x86 Intel J4125 / N100',
      memory: '32 GB DDR4',
      storage: '1 TB NVMe SSD',
      ai: 'Optional Hailo-8 26 TOPS M.2',
      protocols: ['Matter 1.3', 'MQTT', 'HA', 'MCP'],
      ports: '4 x 2.5 GbE, 6 x USB 3.0, 2 x HDMI',
      power: '45 W fanless',
      dimensions: '230 x 150 x 44 mm rack / desktop',
    },
    deploymentWeeks: '2-4',
    users: '20-200 units',
    family: ['gateway', 'sense', 'control', 'connect'],
    recommendedFor: ['elderly-care', 'community-care', 'smart-room'],
  },
  {
    slug: 'enterprise-stack',
    i18nKey: 'enterpriseStack',
    specs: {
      chip: 'NVIDIA Jetson Orin NX 16 GB',
      memory: '64 GB LPDDR5',
      storage: '2 TB NVMe + RAID expansion',
      ai: '100 TOPS GPU + NPU',
      protocols: ['All Community Kit', 'HIS / CIS adapters', 'Custom integrators'],
      ports: '2 x 10 GbE, rack-mount 1U',
      power: 'Dual PSU 80 Plus Gold',
      dimensions: '1U rack or custom chassis',
    },
    deploymentWeeks: '6-12',
    users: 'Floor / ward / campus',
    family: ['gateway', 'sense', 'control', 'connect'],
    recommendedFor: ['clinical-assist'],
  },
];

export function getSku(slug: SkuSlug) {
  return skus.find((s) => s.slug === slug);
}
