import React from 'react';
import { PropertyLandingPage } from '../../../src/components/PropertyLandingPage';
import {
  SEED_PROPERTIES,
  INITIAL_SITE_CONFIG,
  Property,
  SiteConfig,
} from '../../../src/data/seedProperties';

export interface ImovelSlugPageProps {
  params?: { slug: string };
  property?: Property;
  allProperties?: Property[];
  siteConfig?: SiteConfig;
  onBack?: () => void;
}

export default function ImovelSlugPage({
  params,
  property,
  allProperties = SEED_PROPERTIES,
  siteConfig = INITIAL_SITE_CONFIG,
  onBack,
}: ImovelSlugPageProps) {
  const targetSlug = property?.slug || params?.slug || '';
  const resolvedProperty =
    property ||
    allProperties.find((item) => item.slug === targetSlug) ||
    SEED_PROPERTIES[0];

  return (
    <PropertyLandingPage
      property={resolvedProperty}
      allProperties={allProperties}
      siteConfig={siteConfig}
      onBack={
        onBack ||
        (() => {
          window.history.pushState({}, '', '/');
          window.dispatchEvent(new PopStateEvent('popstate'));
        })
      }
    />
  );
}
