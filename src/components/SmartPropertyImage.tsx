import React, { useState, useEffect, useRef } from 'react';
import { Building2 } from 'lucide-react';
import { OFFICIAL_WATERMARK_URL } from '../data/seedProperties';
import { isImageCached, markImageCached } from '../utils/imagePreloader';

interface SmartPropertyImageProps {
  src: string;
  alt: string;
  className?: string;
  showWatermark?: boolean;
  watermarkOpacity?: number;
  priority?: boolean;
  fallbackImages?: string[];
}

export const SmartPropertyImage: React.FC<SmartPropertyImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  showWatermark = true,
  watermarkOpacity = 0.35,
  priority = false,
  fallbackImages = [],
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [fallbackIndex, setFallbackIndex] = useState(0);
  const [hasFailedAll, setHasFailedAll] = useState(false);
  const [isLoaded, setIsLoaded] = useState(() => isImageCached(src));
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Sync state whenever parent passes a new src
  useEffect(() => {
    setCurrentSrc(src);
    setFallbackIndex(0);
    setHasFailedAll(false);
    if (isImageCached(src)) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [src]);

  // Also check if the browser already has the image decoded in DOM cache
  useEffect(() => {
    const imgEl = imgRef.current;
    if (imgEl && imgEl.complete && imgEl.naturalWidth > 0) {
      markImageCached(currentSrc);
      setIsLoaded(true);
    }
  }, [currentSrc]);

  const handleLoad = () => {
    markImageCached(currentSrc);
    setIsLoaded(true);
  };

  const handleError = () => {
    const validFallbacks = fallbackImages.filter(
      (item) =>
        item &&
        item !== currentSrc &&
        (item.startsWith('https://i.postimg.cc') || item.startsWith('https://i.ibb.co'))
    );
    if (fallbackIndex < validFallbacks.length) {
      const nextUrl = validFallbacks[fallbackIndex];
      setCurrentSrc(nextUrl);
      setFallbackIndex((prev) => prev + 1);
      setIsLoaded(isImageCached(nextUrl));
    } else {
      setHasFailedAll(true);
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0E141C]">
      {!isLoaded && !hasFailedAll && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#18202B] via-[#121820] to-[#0B0F14] animate-pulse" />
      )}

      {!hasFailedAll ? (
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          referrerPolicy="no-referrer"
          onLoad={handleLoad}
          onError={handleError}
          className={`${className} transition-opacity duration-200 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 text-center bg-gradient-to-br from-[#18202B] via-[#121820] to-[#0B0F14] border border-[#D4AF37]/20">
          <Building2 className="w-9 h-9 text-[#D4AF37]/60 mb-2 shrink-0" />
          <span className="font-serif-luxury text-xs sm:text-sm text-[#F3E5AB] tracking-wider">
            IMOBILIÁRIA FONSECA &amp; CÂNDIDO
          </span>
          <span className="text-xs text-slate-400 mt-1 break-words">{alt}</span>
        </div>
      )}

      {showWatermark && !hasFailedAll && (
        <img
          src={OFFICIAL_WATERMARK_URL}
          alt="Marca d'água Imobiliária Fonseca e Cândido"
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
          style={{ opacity: watermarkOpacity }}
          className="pointer-events-none select-none absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 w-16 sm:w-24 h-auto object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]"
        />
      )}
    </div>
  );
};
