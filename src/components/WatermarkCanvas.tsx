import React, { useState, useRef } from 'react';
import { Upload, CheckCircle2, Sliders, Image as ImageIcon, RefreshCw } from 'lucide-react';
import { applyCompanyWatermark } from '../utils/watermark';
import { OFFICIAL_WATERMARK_URL } from '../data/seedProperties';

interface WatermarkCanvasProps {
  onImageProcessed: (finalUrl: string) => void;
  defaultWatermarked?: boolean;
}

export const WatermarkCanvas: React.FC<WatermarkCanvasProps> = ({
  onImageProcessed,
  defaultWatermarked = true,
}) => {
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [applyWatermark, setApplyWatermark] = useState(defaultWatermarked);
  const [opacity, setOpacity] = useState(0.35);
  const [position, setPosition] = useState<'bottom-right' | 'center'>('bottom-right');
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processSource = async (source: string) => {
    if (!source.trim()) return;
    setIsProcessing(true);
    try {
      if (applyWatermark) {
        const result = await applyCompanyWatermark(source, {
          opacity,
          position,
        });
        setPreviewUrl(result.dataUrl);
      } else {
        setPreviewUrl(source);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const dataUrl = String(ev.target?.result || '');
      if (dataUrl) {
        setImageUrlInput(dataUrl);
        await processSource(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleConfirmAdd = () => {
    const target = previewUrl || imageUrlInput.trim();
    if (!target) return;
    onImageProcessed(target);
    setImageUrlInput('');
    setPreviewUrl(null);
  };

  return (
    <div className="rounded-xl border border-[#D4AF37]/20 bg-[#0B0F14]/90 p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-3">
        <div className="flex items-center gap-3">
          <ImageIcon className="w-5 h-5 text-[#D4AF37]" />
          <div>
            <h4 className="text-sm font-semibold text-white">
              Estúdio de Imagem & Marca d&apos;Água Oficial
            </h4>
            <p className="text-xs text-slate-400">
              Processamento em HTML5 Canvas com selo dourado Fonseca &amp; Cândido
            </p>
          </div>
        </div>

        <label className="flex items-center gap-2.5 cursor-pointer select-none text-xs font-medium text-[#F3E5AB]">
          <input
            type="checkbox"
            checked={applyWatermark}
            onChange={(e) => setApplyWatermark(e.target.checked)}
            className="w-4 h-4 accent-[#D4AF37] rounded cursor-pointer"
          />
          <span>Aplicar Marca d&apos;Água da Empresa</span>
        </label>
      </div>

      {applyWatermark && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#18202B]/70 p-3.5 rounded-lg border border-white/5">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#D4AF37]" />
                Opacidade da Marca d&apos;Água
              </span>
              <span className="font-mono tabular-nums text-[#F3E5AB]">
                {Math.round(opacity * 100)}%
              </span>
            </div>
            <input
              type="range"
              min={0.15}
              max={0.85}
              step={0.05}
              value={opacity}
              onChange={(e) => setOpacity( parseFloat(e.target.value) )}
              className="w-full accent-[#D4AF37] cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <span className="block text-xs text-slate-300">Posição do Selo Oficial</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPosition('bottom-right')}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  position === 'bottom-right'
                    ? 'bg-[#D4AF37] text-[#0B0F14]'
                    : 'bg-[#0B0F14] text-slate-300 hover:text-white border border-white/10'
                }`}
              >
                Canto Inferior Direito
              </button>
              <button
                type="button"
                onClick={() => setPosition('center')}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  position === 'center'
                    ? 'bg-[#D4AF37] text-[#0B0F14]'
                    : 'bg-[#0B0F14] text-slate-300 hover:text-white border border-white/10'
                }`}
              >
                Centro da Foto
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="md:col-span-7 flex gap-2">
          <input
            type="url"
            value={imageUrlInput}
            onChange={(e) => setImageUrlInput(e.target.value)}
            placeholder="Cole a URL da imagem (https://...) ou envie do computador"
            className="w-full bg-[#121820] border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#D4AF37]"
          />
          <button
            type="button"
            onClick={() => processSource(imageUrlInput)}
            disabled={!imageUrlInput.trim() || isProcessing}
            className="px-3.5 py-2.5 bg-[#18202B] hover:bg-[#D4AF37]/20 text-[#F3E5AB] border border-[#D4AF37]/30 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 disabled:opacity-40"
          >
            {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Pré-visualizar'}
          </button>
        </div>

        <div className="md:col-span-5 flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 flex items-center justify-center gap-2 px-3.5 py-2.5 bg-[#18202B] hover:bg-white/10 text-slate-200 border border-white/15 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0"
          >
            <Upload className="w-4 h-4 text-[#D4AF37]" />
            Upload Arquivo
          </button>

          <button
            type="button"
            onClick={handleConfirmAdd}
            disabled={!previewUrl && !imageUrlInput.trim()}
            className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0B0F14] rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 disabled:opacity-40"
          >
            <CheckCircle2 className="w-4 h-4" />
            Inserir na Galeria
          </button>
        </div>
      </div>

      {previewUrl && (
        <div className="relative rounded-lg overflow-hidden border border-[#D4AF37]/30 bg-black/60 max-h-60 flex items-center justify-center">
          <img
            src={previewUrl}
            alt="Pré-visualização com marca d'água"
            referrerPolicy="no-referrer"
            className="max-h-56 w-auto object-contain"
          />
          {applyWatermark && (
            <img
              src={OFFICIAL_WATERMARK_URL}
              alt="Selo Oficial Fonseca e Cândido"
              referrerPolicy="no-referrer"
              style={{ opacity }}
              className={`pointer-events-none absolute w-28 h-auto object-contain drop-shadow-md ${
                position === 'center'
                  ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                  : 'bottom-3 right-3'
              }`}
            />
          )}
        </div>
      )}
    </div>
  );
};
