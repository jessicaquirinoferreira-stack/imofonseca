import React, { useState } from 'react';
import {
  Lock,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Check,
  X,
  Building2,
  Share2,
  Globe,
  Shield,
  LogIn,
} from 'lucide-react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import {
  Property,
  PropertyCategory,
  PropertyStatus,
  SiteConfig,
} from '../data/seedProperties';
import { WatermarkCanvas } from './WatermarkCanvas';
import { slugifyPropertyTitle } from '../utils/watermark';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  onSaveProperty: (property: Property, isNew: boolean) => Promise<void>;
  onDeleteProperty: (id: string) => Promise<void>;
  siteConfig: SiteConfig;
  onSaveSiteConfig: (config: SiteConfig) => Promise<void>;
  onOpenLandingPage: (slug: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  properties,
  onSaveProperty,
  onDeleteProperty,
  siteConfig,
  onSaveSiteConfig,
  onOpenLandingPage,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<'properties' | 'social'>('properties');
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [configDraft, setConfigDraft] = useState<SiteConfig>(siteConfig);
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCredentialsLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      emailInput.trim().toLowerCase() === 'admin@x.com' &&
      passwordInput === 'admin4321'
    ) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Credenciais inválidas. Utilize admin@x.com / admin4321.');
    }
  };

  const handleGoogleAdminLogin = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      if (res.user) {
        setIsAuthenticated(true);
        setLoginError('');
      }
    } catch {
      setLoginError('Não foi possível autenticar via Google. Use as credenciais padrão.');
    }
  };

  const startNewProperty = () => {
    const emptyProp: Property = {
      id: `imovel-${Date.now()}`,
      slug: `imovel-${Date.now()}`,
      title: '',
      builder: 'Imobiliária Fonseca e Cândido',
      category: 'Minha Casa Minha Vida',
      priceLabel: 'R$ 235.000,00',
      priceValue: 235000,
      location: '',
      highlight: '',
      description: '',
      bedrooms: '2 Dormitórios',
      parking: '1 Vaga',
      area: '50 m²',
      status: 'Na Planta',
      images: [],
      watermarked: true,
      featured: true,
    };
    setEditingProperty(emptyProp);
    setIsCreatingNew(true);
  };

  const handleSavePropertySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProperty) return;
    const computedSlug =
      slugifyPropertyTitle(editingProperty.title) || editingProperty.slug;
    const finalProp: Property = {
      ...editingProperty,
      id: isCreatingNew ? computedSlug : editingProperty.id,
      slug: computedSlug,
      images:
        editingProperty.images.length > 0
          ? editingProperty.images
          : [
              'https://i.postimg.cc/T2gjVt6P/Apresentac-ºa-ao-Parque-1453-Vital-Construtora-imagens-0.jpg',
            ],
    };
    await onSaveProperty(finalProp, isCreatingNew);
    setEditingProperty(null);
    setIsCreatingNew(false);
    setSaveFeedback('Empreendimento salvo e sincronizado com sucesso!');
    setTimeout(() => setSaveFeedback(null), 3000);
  };

  const handleSaveConfigSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSaveSiteConfig(configDraft);
    setSaveFeedback('Redes sociais e contatos atualizados em todo o site!');
    setTimeout(() => setSaveFeedback(null), 3000);
  };

  const handleGenerateLandingLink = (slug: string) => {
    const fullUrl = `${window.location.origin}/imovel/${slug}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-6xl rounded-2xl bg-[#121820] border border-[#D4AF37]/40 shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Modal Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0B0F14] border-b border-[#D4AF37]/25">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-[#D4AF37]" />
            <span className="font-serif-luxury text-base font-bold text-white tracking-wider">
              PAINEL ADMINISTRATIVO — FONSECA &amp; CÂNDIDO
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {!isAuthenticated ? (
            <div className="max-w-md mx-auto py-8 space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center mx-auto">
                  <Lock className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="font-serif-luxury text-xl font-bold text-white">
                  Acesso Restrito à Diretoria
                </h3>
                <p className="text-xs text-slate-400">
                  Gerencie empreendimentos, marca d&apos;água automática e gere Landing Pages de alta conversão.
                </p>
              </div>

              <form onSubmit={handleCredentialsLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    E-mail Administrativo
                  </label>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="admin@x.com"
                    className="w-full rounded-xl bg-[#0B0F14] border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Senha de Segurança
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl bg-[#0B0F14] border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {loginError && (
                  <p className="text-xs text-red-400 bg-red-950/40 border border-red-500/30 rounded-lg p-2.5">
                    {loginError}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0B0F14] font-bold text-sm transition-colors cursor-pointer"
                >
                  Entrar no Painel Administrativo
                </button>
              </form>

              <div className="pt-4 border-t border-white/10 text-center space-y-3">
                <button
                  type="button"
                  onClick={handleGoogleAdminLogin}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#18202B] hover:bg-white/10 border border-white/15 text-xs font-medium text-slate-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogIn className="w-4 h-4 text-[#D4AF37]" />
                  <span>Autenticar com Google Cloud (Sincronização Firestore)</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Top Navigation Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('properties');
                      setEditingProperty(null);
                    }}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      activeTab === 'properties'
                        ? 'bg-[#D4AF37] text-[#0B0F14]'
                        : 'bg-[#0B0F14] text-slate-300 hover:text-white'
                    }`}
                  >
                    <Building2 className="w-4 h-4 inline mr-1.5" />
                    Empreendimentos ({properties.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('social');
                      setEditingProperty(null);
                    }}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      activeTab === 'social'
                        ? 'bg-[#D4AF37] text-[#0B0F14]'
                        : 'bg-[#0B0F14] text-slate-300 hover:text-white'
                    }`}
                  >
                    <Globe className="w-4 h-4 inline mr-1.5" />
                    Redes Sociais &amp; Contatos
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  {activeTab === 'properties' && !editingProperty && (
                    <button
                      type="button"
                      onClick={startNewProperty}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0B0F14] text-xs font-bold cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Novo Empreendimento</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      signOut(auth).catch(() => {});
                      setIsAuthenticated(false);
                    }}
                    className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-400 cursor-pointer"
                  >
                    Encerrar Sessão
                  </button>
                </div>
              </div>

              {saveFeedback && (
                <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-medium flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>{saveFeedback}</span>
                </div>
              )}

              {/* Tab 1: Properties CRUD & Landing Page Generator */}
              {activeTab === 'properties' && !editingProperty && (
                <div className="space-y-4">
                  {properties.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl bg-[#0B0F14] border border-white/10 p-4 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          className="w-20 h-16 rounded-lg object-cover border border-[#D4AF37]/30 shrink-0"
                        />
                        <div>
                          <div className="text-xs text-[#D4AF37] font-medium">
                            {item.category} · {item.status} · {item.images.length} fotos
                          </div>
                          <h4 className="font-serif-luxury text-base font-bold text-white">
                            {item.title}
                          </h4>
                          <div className="font-mono tabular-nums text-xs text-slate-400">
                            {item.priceLabel} — /imovel/{item.slug}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-end">
                        <button
                          type="button"
                          onClick={() => handleGenerateLandingLink(item.slug)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#18202B] hover:bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-xs font-semibold text-[#F3E5AB] cursor-pointer whitespace-nowrap shrink-0"
                        >
                          {copiedSlug === item.slug ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span>URL Copiada: /imovel/{item.slug}</span>
                            </>
                          ) : (
                            <>
                              <Share2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                              <span>Gerar Landing Page Exclusiva</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onOpenLandingPage(item.slug);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/15 text-xs text-white cursor-pointer whitespace-nowrap shrink-0"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Abrir LP</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setEditingProperty(item);
                            setIsCreatingNew(false);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/15 text-xs text-slate-200 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Editar</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onDeleteProperty(item.id)}
                          className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-xs text-red-300 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Property Edit / Create Form */}
              {activeTab === 'properties' && editingProperty && (
                <form onSubmit={handleSavePropertySubmit} className="space-y-5 bg-[#18202B]/50 p-5 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h4 className="font-serif-luxury text-lg font-bold text-white">
                      {isCreatingNew
                        ? 'Cadastrar Novo Empreendimento'
                        : `Editando: ${editingProperty.title}`}
                    </h4>
                    <button
                      type="button"
                      onClick={() => setEditingProperty(null)}
                      className="text-xs text-slate-400 hover:text-white cursor-pointer"
                    >
                      Cancelar
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Nome do Empreendimento</label>
                      <input
                        type="text"
                        required
                        value={editingProperty.title}
                        onChange={(e) =>
                          setEditingProperty({ ...editingProperty, title: e.target.value })
                        }
                        className="w-full rounded-lg bg-[#0B0F14] border border-white/15 px-3.5 py-2 text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Categoria</label>
                      <select
                        value={editingProperty.category}
                        onChange={(e) =>
                          setEditingProperty({
                            ...editingProperty,
                            category: e.target.value as PropertyCategory,
                          })
                        }
                        className="w-full rounded-lg bg-[#0B0F14] border border-white/15 px-3.5 py-2 text-sm text-white"
                      >
                        <option value="Minha Casa Minha Vida">Minha Casa Minha Vida</option>
                        <option value="Alto Padrão">Alto Padrão</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Status da Obra</label>
                      <select
                        value={editingProperty.status}
                        onChange={(e) =>
                          setEditingProperty({
                            ...editingProperty,
                            status: e.target.value as PropertyStatus,
                          })
                        }
                        className="w-full rounded-lg bg-[#0B0F14] border border-white/15 px-3.5 py-2 text-sm text-white"
                      >
                        <option value="Na Planta">Na Planta</option>
                        <option value="Em Construção">Em Construção</option>
                        <option value="Pronto para Morar">Pronto para Morar</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Valor Exibido (R$)</label>
                      <input
                        type="text"
                        required
                        value={editingProperty.priceLabel}
                        onChange={(e) =>
                          setEditingProperty({ ...editingProperty, priceLabel: e.target.value })
                        }
                        className="w-full rounded-lg bg-[#0B0F14] border border-white/15 px-3.5 py-2 text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Valor Numérico (Simulador)</label>
                      <input
                        type="number"
                        required
                        value={editingProperty.priceValue}
                        onChange={(e) =>
                          setEditingProperty({
                            ...editingProperty,
                            priceValue: Number(e.target.value),
                          })
                        }
                        className="w-full rounded-lg bg-[#0B0F14] border border-white/15 px-3.5 py-2 text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Localização</label>
                      <input
                        type="text"
                        required
                        value={editingProperty.location}
                        onChange={(e) =>
                          setEditingProperty({ ...editingProperty, location: e.target.value })
                        }
                        className="w-full rounded-lg bg-[#0B0F14] border border-white/15 px-3.5 py-2 text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Dormitórios</label>
                      <input
                        type="text"
                        value={editingProperty.bedrooms}
                        onChange={(e) =>
                          setEditingProperty({ ...editingProperty, bedrooms: e.target.value })
                        }
                        className="w-full rounded-lg bg-[#0B0F14] border border-white/15 px-3.5 py-2 text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Vagas de Garagem</label>
                      <input
                        type="text"
                        value={editingProperty.parking}
                        onChange={(e) =>
                          setEditingProperty({ ...editingProperty, parking: e.target.value })
                        }
                        className="w-full rounded-lg bg-[#0B0F14] border border-white/15 px-3.5 py-2 text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Área Privativa (m²)</label>
                      <input
                        type="text"
                        value={editingProperty.area}
                        onChange={(e) =>
                          setEditingProperty({ ...editingProperty, area: e.target.value })
                        }
                        className="w-full rounded-lg bg-[#0B0F14] border border-white/15 px-3.5 py-2 text-sm text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Resumo de Destaque</label>
                    <input
                      type="text"
                      required
                      value={editingProperty.highlight}
                      onChange={(e) =>
                        setEditingProperty({ ...editingProperty, highlight: e.target.value })
                      }
                      className="w-full rounded-lg bg-[#0B0F14] border border-white/15 px-3.5 py-2 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Descrição Completa</label>
                    <textarea
                      rows={3}
                      required
                      value={editingProperty.description}
                      onChange={(e) =>
                        setEditingProperty({ ...editingProperty, description: e.target.value })
                      }
                      className="w-full rounded-lg bg-[#0B0F14] border border-white/15 px-3.5 py-2 text-sm text-white"
                    />
                  </div>

                  {/* Watermark Canvas Uploader */}
                  <WatermarkCanvas
                    defaultWatermarked={editingProperty.watermarked}
                    onImageProcessed={(newImg) =>
                      setEditingProperty({
                        ...editingProperty,
                        images: [newImg, ...editingProperty.images],
                      })
                    }
                  />

                  {/* Current Images List */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span>Fotos Cadastradas ({editingProperty.images.length})</span>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editingProperty.watermarked}
                          onChange={(e) =>
                            setEditingProperty({
                              ...editingProperty,
                              watermarked: e.target.checked,
                            })
                          }
                          className="accent-[#D4AF37]"
                        />
                        <span>Exibir Selo Marca d&apos;Água Oficial em todas as fotos</span>
                      </label>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 max-h-40 overflow-y-auto p-2 rounded-lg bg-[#0B0F14]">
                      {editingProperty.images.map((img, i) => (
                        <div key={i} className="relative group aspect-[4/3] rounded overflow-hidden border border-white/10">
                          <img
                            src={img}
                            alt=""
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setEditingProperty({
                                ...editingProperty,
                                images: editingProperty.images.filter((_, idx) => idx !== i),
                              })
                            }
                            className="absolute top-1 right-1 w-6 h-6 rounded bg-red-600 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setEditingProperty(null)}
                      className="px-4 py-2.5 rounded-lg bg-white/10 text-xs text-white cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-lg bg-[#D4AF37] text-[#0B0F14] text-xs font-bold cursor-pointer"
                    >
                      Salvar Empreendimento
                    </button>
                  </div>
                </form>
              )}

              {/* Tab 2: Social Media & Contact Settings */}
              {activeTab === 'social' && (
                <form onSubmit={handleSaveConfigSubmit} className="space-y-4 bg-[#18202B]/50 p-5 rounded-xl border border-white/10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">WhatsApp Oficial (apenas números com DDI)</label>
                      <input
                        type="text"
                        required
                        value={configDraft.whatsapp}
                        onChange={(e) =>
                          setConfigDraft({ ...configDraft, whatsapp: e.target.value })
                        }
                        className="w-full rounded-lg bg-[#0B0F14] border border-white/15 px-3.5 py-2.5 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">E-mail de Contato</label>
                      <input
                        type="email"
                        value={configDraft.email}
                        onChange={(e) =>
                          setConfigDraft({ ...configDraft, email: e.target.value })
                        }
                        className="w-full rounded-lg bg-[#0B0F14] border border-white/15 px-3.5 py-2.5 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Instagram URL</label>
                      <input
                        type="url"
                        value={configDraft.instagram}
                        onChange={(e) =>
                          setConfigDraft({ ...configDraft, instagram: e.target.value })
                        }
                        className="w-full rounded-lg bg-[#0B0F14] border border-white/15 px-3.5 py-2.5 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Facebook URL</label>
                      <input
                        type="url"
                        value={configDraft.facebook}
                        onChange={(e) =>
                          setConfigDraft({ ...configDraft, facebook: e.target.value })
                        }
                        className="w-full rounded-lg bg-[#0B0F14] border border-white/15 px-3.5 py-2.5 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">YouTube URL</label>
                      <input
                        type="url"
                        value={configDraft.youtube}
                        onChange={(e) =>
                          setConfigDraft({ ...configDraft, youtube: e.target.value })
                        }
                        className="w-full rounded-lg bg-[#0B0F14] border border-white/15 px-3.5 py-2.5 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">TikTok URL</label>
                      <input
                        type="url"
                        value={configDraft.tiktok}
                        onChange={(e) =>
                          setConfigDraft({ ...configDraft, tiktok: e.target.value })
                        }
                        className="w-full rounded-lg bg-[#0B0F14] border border-white/15 px-3.5 py-2.5 text-sm text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs text-slate-300 mb-1">Endereço Físico &amp; Atendimento</label>
                      <input
                        type="text"
                        required
                        value={configDraft.address}
                        onChange={(e) =>
                          setConfigDraft({ ...configDraft, address: e.target.value })
                        }
                        className="w-full rounded-lg bg-[#0B0F14] border border-white/15 px-3.5 py-2.5 text-sm text-white"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-lg bg-[#D4AF37] text-[#0B0F14] text-xs font-bold cursor-pointer"
                    >
                      Atualizar Redes Sociais &amp; Rodapé
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
