import { OFFICIAL_WATERMARK_URL } from '../data/seedProperties';

export interface WatermarkOptions {
  opacity?: number;
  position?: 'bottom-right' | 'center';
  scale?: number;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.referrerPolicy = 'no-referrer';
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}

/**
 * Applies the official Imobiliária Fonseca e Cândido golden watermark onto an image
 * using HTML5 Canvas and returns both a Blob and a DataURL ready for preview/storage.
 */
export async function applyCompanyWatermark(
  sourceUrlOrDataUrl: string,
  options: WatermarkOptions = {}
): Promise<{ blob: Blob | null; dataUrl: string }> {
  const { opacity = 0.35, position = 'bottom-right', scale = 0.24 } = options;

  try {
    const baseImg = await loadImage(sourceUrlOrDataUrl);
    const canvas = document.createElement('canvas');
    const width = baseImg.naturalWidth || 1280;
    const height = baseImg.naturalHeight || 720;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return { blob: null, dataUrl: sourceUrlOrDataUrl };
    }

    // Draw original photo
    ctx.drawImage(baseImg, 0, 0, width, height);

    try {
      const watermarkImg = await loadImage(OFFICIAL_WATERMARK_URL);
      const wmWidth = Math.max(140, Math.round(width * scale));
      const aspect =
        watermarkImg.naturalWidth && watermarkImg.naturalHeight
          ? watermarkImg.naturalHeight / watermarkImg.naturalWidth
          : 0.45;
      const wmHeight = Math.round(wmWidth * aspect);

      const padding = Math.round(width * 0.03);
      const x =
        position === 'center'
          ? Math.round((width - wmWidth) / 2)
          : width - wmWidth - padding;
      const y =
        position === 'center'
          ? Math.round((height - wmHeight) / 2)
          : height - wmHeight - padding;

      ctx.save();
      ctx.globalAlpha = Math.min(1, Math.max(0.1, opacity));
      ctx.drawImage(watermarkImg, x, y, wmWidth, wmHeight);
      ctx.restore();
    } catch {
      // Fallback refined typographic gold watermark if CORS blocks external image pixels
      ctx.save();
      ctx.globalAlpha = Math.min(1, Math.max(0.15, opacity));
      const fontSize = Math.max(18, Math.round(width * 0.024));
      ctx.font = `600 ${fontSize}px Cinzel, Georgia, serif`;
      ctx.fillStyle = '#D4AF37';
      ctx.textAlign = position === 'center' ? 'center' : 'right';
      const x = position === 'center' ? width / 2 : width - Math.round(width * 0.035);
      const y = position === 'center' ? height / 2 : height - Math.round(height * 0.045);
      ctx.fillText('FONSECA & CÂNDIDO IMÓVEIS', x, y);
      ctx.restore();
    }

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((b) => resolve(b), 'image/jpeg', 0.92)
    );

    return { blob, dataUrl };
  } catch {
    return { blob: null, dataUrl: sourceUrlOrDataUrl };
  }
}

export function slugifyPropertyTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 110);
}
