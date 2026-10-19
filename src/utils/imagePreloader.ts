import {
  Property,
  OFFICIAL_LOGO_URL,
  OFFICIAL_WATERMARK_URL,
} from '../data/seedProperties';

// Global in-memory set of URLs confirmed loaded in this session
const loadedUrls = new Set<string>();
const inFlightUrls = new Map<string, Promise<void>>();

export function isImageCached(url?: string): boolean {
  if (!url) return false;
  return loadedUrls.has(url);
}

export function markImageCached(url?: string): void {
  if (!url) return;
  loadedUrls.add(url);
}

export function preloadSingleImage(
  url: string,
  highPriority = false
): Promise<void> {
  if (!url || loadedUrls.has(url)) {
    return Promise.resolve();
  }

  const existing = inFlightUrls.get(url);
  if (existing) {
    return existing;
  }

  const promise = new Promise<void>((resolve) => {
    const img = new Image();
    img.referrerPolicy = 'no-referrer';
    if ('decoding' in img) {
      img.decoding = 'async';
    }
    if (highPriority && 'fetchPriority' in img) {
      (img as HTMLImageElement & { fetchPriority?: string }).fetchPriority = 'high';
    }

    img.onload = () => {
      loadedUrls.add(url);
      inFlightUrls.delete(url);
      resolve();
    };

    img.onerror = () => {
      inFlightUrls.delete(url);
      resolve();
    };

    img.src = url;
  });

  inFlightUrls.set(url, promise);
  return promise;
}

/**
 * Preloads all images of a specific property (used on card hover/touch or when opening landing page)
 */
export function preloadPropertyGallery(property: Property, startIdx = 0): void {
  if (!property?.images?.length) return;
  const total = property.images.length;

  // Immediately preload current, next 3, and previous 1 with high priority
  const immediateIndices = [
    startIdx,
    (startIdx + 1) % total,
    (startIdx + 2) % total,
    (startIdx + 3) % total,
    (startIdx - 1 + total) % total,
  ];

  immediateIndices.forEach((idx) => {
    const url = property.images[idx];
    if (url) preloadSingleImage(url, true);
  });

  // Queue the rest of the property's gallery with controlled concurrency
  const remainingUrls = property.images.filter(
    (url, idx) => url && !immediateIndices.includes(idx) && !loadedUrls.has(url)
  );

  let cursor = 0;
  const concurrency = 4;

  const worker = async () => {
    while (cursor < remainingUrls.length) {
      const nextUrl = remainingUrls[cursor++];
      if (nextUrl) {
        await preloadSingleImage(nextUrl, false);
      }
    }
  };

  for (let i = 0; i < concurrency; i++) {
    worker();
  }
}

/**
 * Bootstraps fast image loading across the entire site:
 * 1. Immediately preloads brand assets + all 6 property cover photos (high priority)
 * 2. Progressively warms up the first few gallery images of each property in background
 */
export async function warmupAllSiteImages(properties: Property[]): Promise<void> {
  // 1. Critical assets & primary facade covers
  const criticalUrls = [
    OFFICIAL_LOGO_URL,
    OFFICIAL_WATERMARK_URL,
    ...properties.map((p) => p.images?.[0]).filter(Boolean),
  ];

  await Promise.all(criticalUrls.map((url) => preloadSingleImage(url, true)));

  // 2. Next 4 gallery photos of each property so opening any property feels instant
  const secondaryUrls: string[] = [];
  for (let i = 1; i <= 4; i++) {
    for (const prop of properties) {
      if (prop.images?.[i]) {
        secondaryUrls.push(prop.images[i]);
      }
    }
  }

  // 3. Remaining gallery images in background batches
  const tertiaryUrls: string[] = [];
  for (const prop of properties) {
    if (prop.images?.length > 5) {
      for (let i = 5; i < prop.images.length; i++) {
        tertiaryUrls.push(prop.images[i]);
      }
    }
  }

  const allQueue = [...secondaryUrls, ...tertiaryUrls];
  let idx = 0;
  const maxConcurrent = 5;

  const runBatchWorker = async () => {
    while (idx < allQueue.length) {
      const targetUrl = allQueue[idx++];
      if (targetUrl) {
        await preloadSingleImage(targetUrl, false);
      }
    }
  };

  for (let w = 0; w < maxConcurrent; w++) {
    runBatchWorker();
  }
}
