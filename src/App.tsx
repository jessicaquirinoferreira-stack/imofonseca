import React, { useState, useEffect, useCallback } from 'react';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';
import {
  db,
  auth,
  isFirebaseConfigured,
  handleFirestoreError,
  OperationType,
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

const LOCAL_STORAGE_PROPERTIES_KEY = 'fc_imoveis_properties_v4';
const LOCAL_STORAGE_CONFIG_KEY = 'fc_imoveis_config_v4';

export default function App() {
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PROPERTIES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((p: Property) => normalizePropertyImages(p));
        }
      }
    } catch {
      // ignore localStorage error
    }
    return SEED_PROPERTIES;
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

  // Load initial data from Firestore if configured & available
  useEffect(() => {
    if (!isFirebaseConfigured) return;

    async function syncFromFirestore() {
      try {
        const mcmvQuery = query(
          collection(db, 'properties'),
          where('category', '==', 'Minha Casa Minha Vida')
        );
        const luxuryQuery = query(
          collection(db, 'properties'),
          where('category', '==', 'Alto Padrão')
        );

        const [mcmvSnap, luxurySnap] = await Promise.all([
          getDocs(mcmvQuery),
          getDocs(luxuryQuery),
        ]);

        const fetched: Property[] = [];
        mcmvSnap.forEach((d) =>
          fetched.push(normalizePropertyImages(d.data() as Property))
        );
        luxurySnap.forEach((d) =>
          fetched.push(normalizePropertyImages(d.data() as Property))
        );

        if (fetched.length > 0) {
          setProperties(fetched);
          localStorage.setItem(
            LOCAL_STORAGE_PROPERTIES_KEY,
            JSON.stringify(fetched)
          );
        }

        const configDoc = await getDoc(doc(db, 'settings', 'global'));
        if (configDoc.exists()) {
          const remoteConfig = configDoc.data() as SiteConfig;
          setSiteConfig(remoteConfig);
          localStorage.setItem(
            LOCAL_STORAGE_CONFIG_KEY,
            JSON.stringify(remoteConfig)
          );
        }
      } catch {
        // Hybrid fallback keeps seed data active
      }
    }

    syncFromFirestore();
  }, []);

  const handleSaveProperty = async (property: Property, _isNew: boolean) => {
    const sanitized: Property = {
      id: property.id.slice(0, 128),
      slug: property.slug.slice(0, 128),
      title: property.title.slice(0, 160),
      builder: (property.builder || 'Imobiliária Fonseca e Cândido').slice(0, 100),
      category: property.category,
      priceLabel: property.priceLabel.slice(0, 100),
      priceValue: Math.max(0, Number(property.priceValue) || 0),
      location: property.location.slice(0, 160),
      highlight: property.highlight.slice(0, 300),
      description: property.description.slice(0, 3000),
      bedrooms: property.bedrooms.slice(0, 40),
      parking: property.parking.slice(0, 40),
      area: property.area.slice(0, 40),
      status: property.status,
      images: property.images.slice(0, 50),
      watermarked: Boolean(property.watermarked),
      featured: Boolean(property.featured),
    };

    setProperties((prev) => {
      const exists = prev.some((p) => p.id === sanitized.id);
      const next = exists
        ? prev.map((p) => (p.id === sanitized.id ? sanitized : p))
        : [sanitized, ...prev];
      localStorage.setItem(LOCAL_STORAGE_PROPERTIES_KEY, JSON.stringify(next));
      return next;
    });

    if (isFirebaseConfigured && auth.currentUser) {
      try {
        await setDoc(doc(db, 'properties', sanitized.id), sanitized);
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, `properties/${sanitized.id}`);
      }
    }
  };

  const handleDeleteProperty = async (id: string) => {
    setProperties((prev) => {
      const next = prev.filter((p) => p.id !== id);
      localStorage.setItem(LOCAL_STORAGE_PROPERTIES_KEY, JSON.stringify(next));
      return next;
    });

    if (isFirebaseConfigured && auth.currentUser) {
      try {
        await deleteDoc(doc(db, 'properties', id));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `properties/${id}`);
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

    if (isFirebaseConfigured && auth.currentUser) {
      try {
        await setDoc(doc(db, 'settings', 'global'), sanitizedConfig);
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, 'settings/global');
      }
    }
  };

  const activeProperty = activeSlug
    ? properties.find((p) => p.slug === activeSlug) || null
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
