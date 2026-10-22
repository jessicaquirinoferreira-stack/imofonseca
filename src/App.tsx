import React, { useState, useEffect, useCallback } from 'react';
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';
import {
  db,
  isFirebaseConfigured,
} from './lib/firebase';
import {
  SEED_PROPERTIES,
  INITIAL_SITE_CONFIG,
  Property,
  SiteConfig,
  normalizePropertyImages,
} from './data/seedProperties';
import { warmupAllSiteImages } from './utils/imagePreloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SkillsSection } from './components/SkillsSection';
import { PropertiesGrid } from './components/PropertiesGrid';
import { FinancingSimulator } from './components/FinancingSimulator';
import { PropertyLandingPage } from './components/PropertyLandingPage';
import { AdminDashboard } from './components/AdminDashboard';
import { WhatsAppButton } from './components/WhatsAppButton';
import { VirtualAssistant } from './components/VirtualAssistant';
import { Footer } from './components/Footer';

const LOCAL_STORAGE_PROPERTIES_KEY = 'fc_imoveis_properties_v5';
const LOCAL_STORAGE_CONFIG_KEY = 'fc_imoveis_config_v5';

function mergePropertiesWithSeeds(stored: Property[]): Property[] {
  const map = new Map<string, Property>();
  SEED_PROPERTIES.forEach((p) => map.set(p.id, p));
  if (Array.isArray(stored)) {
    stored.forEach((p) => {
      const existing = map.get(p.id);
      map.set(p.id, {
        ...existing,
        ...p,
        specs: p.specs || existing?.specs,
      });
    });
  }
  return Array.from(map.values()).map((p: Property) => normalizePropertyImages(p));
}

export default function App() {
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PROPERTIES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return mergePropertiesWithSeeds(parsed);
        }
      }
    } catch {
      // ignore
    }
    return SEED_PROPERTIES.map((p: Property) => normalizePropertyImages(p));
  });

  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CONFIG_KEY);
      if (saved) {
        return { ...INITIAL_SITE_CONFIG, ...JSON.parse(saved) };
      }
    } catch {
      // ignore
    }
    return INITIAL_SITE_CONFIG;
  });

  const [selectedCategory, setSelectedCategory] = useState<
    'Todos' | 'Minha Casa Minha Vida' | 'Alto Padrão'
  >('Todos');
  const [activeSlug, setActiveSlug] = useState<string | null>(() => {
    const path = window.location.pathname;
    if (path.startsWith('/imovel/')) {
      return decodeURIComponent(path.replace('/imovel/', '').replace(/\/$/, ''));
    }
    return null;
  });
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Sync URL navigation for /imovel/[slug]
  useEffect(() => {
    const onPopState = () => {
      const path = window.location.pathname;
      if (path.startsWith('/imovel/')) {
        setActiveSlug(
          decodeURIComponent(path.replace('/imovel/', '').replace(/\/$/, ''))
        );
      } else {
        setActiveSlug(null);
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Preload all property facade covers immediately and warm up galleries in background
  useEffect(() => {
    warmupAllSiteImages(properties);
  }, [properties]);

  const navigateToLandingPage = useCallback((slug: string) => {
    window.history.pushState({}, '', `/imovel/${slug}`);
    setActiveSlug(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigateHome = useCallback(() => {
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
    }
    setActiveSlug(null);
  }, []);

  // 1. Cross-tab & multi-window instant reactive synchronization
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === LOCAL_STORAGE_PROPERTIES_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            setProperties(mergePropertiesWithSeeds(parsed));
          }
        } catch {}
      } else if (e.key === LOCAL_STORAGE_CONFIG_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setSiteConfig({ ...INITIAL_SITE_CONFIG, ...parsed });
        } catch {}
      }
    };

    const handlePropsUpdated = (e: Event) => {
      const custom = e as CustomEvent<Property[]>;
      if (custom.detail) {
        setProperties(custom.detail);
      }
    };

    const handleConfigUpdated = (e: Event) => {
      const custom = e as CustomEvent<SiteConfig>;
      if (custom.detail) {
        setSiteConfig(custom.detail);
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('properties-updated', handlePropsUpdated);
    window.addEventListener('config-updated', handleConfigUpdated);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('properties-updated', handlePropsUpdated);
      window.removeEventListener('config-updated', handleConfigUpdated);
    };
  }, []);

  // 2. Real-time live Firestore synchronization via onSnapshot
  useEffect(() => {
    if (!isFirebaseConfigured) return;

    const unsubscribeProperties = onSnapshot(
      collection(db, 'properties'),
      (snapshot) => {
        if (!snapshot.empty) {
          const remoteProps: Property[] = [];
          snapshot.forEach((docSnap) => {
            remoteProps.push(normalizePropertyImages(docSnap.data() as Property));
          });
          setProperties((prev) => {
            const map = new Map<string, Property>();
            SEED_PROPERTIES.forEach((p) => map.set(p.id, p));
            prev.forEach((p) => map.set(p.id, p));
            remoteProps.forEach((p) => map.set(p.id, p));
            const merged = Array.from(map.values()).map(normalizePropertyImages);
            localStorage.setItem(LOCAL_STORAGE_PROPERTIES_KEY, JSON.stringify(merged));
            return merged;
          });
        }
      },
      (error) => {
        console.warn('Realtime properties snapshot listener warning:', error);
      }
    );

    const unsubscribeSettings = onSnapshot(
      doc(db, 'settings', 'global'),
      (snapshot) => {
        if (snapshot.exists()) {
          const remoteConfig = snapshot.data() as SiteConfig;
          setSiteConfig((prev) => {
            const merged = { ...prev, ...remoteConfig };
            localStorage.setItem(LOCAL_STORAGE_CONFIG_KEY, JSON.stringify(merged));
            return merged;
          });
        }
      },
      (error) => {
        console.warn('Realtime settings snapshot listener warning:', error);
      }
    );

    return () => {
      unsubscribeProperties();
      unsubscribeSettings();
    };
  }, []);

  const handleSaveProperty = async (property: Property, _isNew: boolean) => {
    const sanitized: Property = {
      id: property.id.slice(0, 128),
      slug: property.slug.slice(0, 128),
      title: property.title.slice(0, 160),
      builder: (property.builder || 'Imobiliária Fonseca e Cândido').slice(0, 100),
      category: property.category,
      priceLabel: (property.priceLabel || 'Sob Consulta').slice(0, 100),
      priceValue: Math.max(0, Number(property.priceValue) || 0),
      location: property.location.slice(0, 160),
      highlight: property.highlight.slice(0, 300),
      description: property.description.slice(0, 3000),
      bedrooms: property.bedrooms.slice(0, 40),
      parking: property.parking.slice(0, 40),
      area: property.area.slice(0, 40),
      status: property.status,
      images: property.images.slice(0, 60),
      watermarked: Boolean(property.watermarked),
      featured: Boolean(property.featured),
      specs: property.specs,
    };

    // Instant local state update across all components
    setProperties((prev) => {
      const exists = prev.some((p) => p.id === sanitized.id || p.slug === sanitized.slug);
      const next = exists
        ? prev.map((p) => (p.id === sanitized.id || p.slug === sanitized.slug ? sanitized : p))
        : [sanitized, ...prev];
      localStorage.setItem(LOCAL_STORAGE_PROPERTIES_KEY, JSON.stringify(next));
      window.dispatchEvent(new CustomEvent('properties-updated', { detail: next }));
      return next;
    });

    // If currently viewing this property and slug changed, keep viewing seamlessly
    if (activeSlug && (activeSlug === property.slug || activeSlug === property.id)) {
      setActiveSlug(sanitized.slug);
      window.history.replaceState({}, '', `/imovel/${sanitized.slug}`);
    }

    // Persist to Firestore in background
    if (isFirebaseConfigured) {
      try {
        await setDoc(doc(db, 'properties', sanitized.id), sanitized);
      } catch (error) {
        console.warn('Firestore property write warning:', error);
      }
    }
  };

  const handleDeleteProperty = async (id: string) => {
    setProperties((prev) => {
      const next = prev.filter((p) => p.id !== id);
      localStorage.setItem(LOCAL_STORAGE_PROPERTIES_KEY, JSON.stringify(next));
      window.dispatchEvent(new CustomEvent('properties-updated', { detail: next }));
      return next;
    });

    if (activeSlug && (activeSlug === id || properties.find((p) => p.id === id)?.slug === activeSlug)) {
      navigateHome();
    }

    if (isFirebaseConfigured) {
      try {
        await deleteDoc(doc(db, 'properties', id));
      } catch (error) {
        console.warn('Firestore property delete warning:', error);
      }
    }
  };

  const handleSaveSiteConfig = async (newConfig: SiteConfig) => {
    const sanitizedConfig: SiteConfig = {
      whatsapp: newConfig.whatsapp.slice(0, 30),
      instagram: (newConfig.instagram || '').slice(0, 250),
      facebook: (newConfig.facebook || '').slice(0, 250),
      youtube: (newConfig.youtube || '').slice(0, 250),
      tiktok: (newConfig.tiktok || '').slice(0, 250),
      address: newConfig.address.slice(0, 300),
      creci: (newConfig.creci || '').slice(0, 60),
      email: (newConfig.email || '').slice(0, 120),
    };

    setSiteConfig(sanitizedConfig);
    localStorage.setItem(
      LOCAL_STORAGE_CONFIG_KEY,
      JSON.stringify(sanitizedConfig)
    );
    window.dispatchEvent(new CustomEvent('config-updated', { detail: sanitizedConfig }));

    if (isFirebaseConfigured) {
      try {
        await setDoc(doc(db, 'settings', 'global'), sanitizedConfig);
      } catch (error) {
        console.warn('Firestore settings write warning:', error);
      }
    }
  };

  const activeProperty = activeSlug
    ? properties.find((p) => p.slug === activeSlug || p.id === activeSlug) || null
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F14] text-[#F8FAFC]">
      {activeProperty ? (
        <PropertyLandingPage
          property={activeProperty}
          allProperties={properties}
          siteConfig={siteConfig}
          onBack={navigateHome}
        />
      ) : (
        <>
          <Navbar
            siteConfig={siteConfig}
            onNavigateHome={navigateHome}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              const el = document.getElementById('vitrine-imoveis');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onOpenSimulador={() => {
              const el = document.getElementById('simulador-caixa');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          <main className="flex-1">
            <Hero
              properties={properties}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              siteConfig={siteConfig}
              onOpenProperty={navigateToLandingPage}
            />

            <SkillsSection whatsappNumber={siteConfig.whatsapp} />

            <PropertiesGrid
              properties={properties}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              whatsappNumber={siteConfig.whatsapp}
              onOpenLandingPage={navigateToLandingPage}
            />

            <FinancingSimulator
              whatsappNumber={siteConfig.whatsapp}
              properties={properties}
            />
          </main>
        </>
      )}

      <Footer
        siteConfig={siteConfig}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onSelectCategory={(cat) => {
          navigateHome();
          setSelectedCategory(cat);
          setTimeout(() => {
            const el = document.getElementById('vitrine-imoveis');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
      />

      <VirtualAssistant
        whatsappNumber={siteConfig.whatsapp}
        properties={properties}
        onOpenLandingPage={navigateToLandingPage}
      />

      <WhatsAppButton whatsappNumber={siteConfig.whatsapp} />

      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        properties={properties}
        onSaveProperty={handleSaveProperty}
        onDeleteProperty={handleDeleteProperty}
        siteConfig={siteConfig}
        onSaveSiteConfig={handleSaveSiteConfig}
        onOpenLandingPage={navigateToLandingPage}
      />
    </div>
  );
}
