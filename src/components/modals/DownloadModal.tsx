import { useState, useEffect } from 'react';
import { Download, FileCode, FolderArchive, Copy, Check, X, FileText, Sparkles, Eye, Code2 } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal = ({ isOpen, onClose }: DownloadModalProps) => {
  const [activeTab, setActiveTab] = useState<'files' | 'code-html' | 'code-css' | 'code-js'>('files');
  const [copiedTab, setCopiedTab] = useState<string | null>(null);
  const [codeContents, setCodeContents] = useState<{ [key: string]: string }>({});
  const [downloading, setDownloading] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Preload the code contents
      const targets = [
        { key: 'html', url: '/downloads/index.html' },
        { key: 'css', url: '/downloads/style.css' },
        { key: 'js', url: '/downloads/app.js' },
      ];

      targets.forEach(({ key, url }) => {
        fetch(url)
          .then((r) => r.text())
          .then((text) => {
            setCodeContents((prev) => ({ ...prev, [key]: text }));
          })
          .catch(() => {});
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Reliable client-side blob download (prevents iframe navigation redirects)
  const triggerDownload = (url: string, filename: string) => {
    setDownloading(filename);
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.blob();
      })
      .then((blob) => {
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          window.URL.revokeObjectURL(blobUrl);
          document.body.removeChild(a);
          setDownloading(null);
        }, 300);
      })
      .catch(() => {
        // Fallback: direct window location
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setDownloading(null);
      });
  };

  const handleCopyText = (id: string, text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedTab(id);
    setTimeout(() => setCopiedTab(null), 2500);
  };

  const handleCopyFromUrl = (id: string, url: string) => {
    fetch(url)
      .then((res) => res.text())
      .then((text) => {
        navigator.clipboard.writeText(text);
        setCopiedTab(id);
        setTimeout(() => setCopiedTab(null), 2500);
      })
      .catch(() => {});
  };

  const files = [
    {
      name: 'index.html',
      label: 'Estructura HTML5',
      desc: 'Plantilla semántica completa con tipografías y contenedores',
      url: '/downloads/index.html',
      codeKey: 'html',
      size: '2.9 KB',
      icon: FileCode,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/30',
    },
    {
      name: 'style.css',
      label: 'Hojas de Estilo CSS',
      desc: 'Variables de color oro/verde, animaciones de levitación y responsive',
      url: '/downloads/style.css',
      codeKey: 'css',
      size: '6.2 KB',
      icon: FileText,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/30',
    },
    {
      name: 'app.js',
      label: 'Script JavaScript',
      desc: 'Controlador de alternancia de vista original/insignia y utilidades',
      url: '/downloads/app.js',
      codeKey: 'js',
      size: '1.3 KB',
      icon: FileCode,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/30',
    },
    {
      name: 'logo.png',
      label: 'Logotipo Oficial (Lienzo)',
      desc: 'Emblema en alta resolución 1024x1024 con fondo vintage marfil',
      url: '/downloads/logo.png',
      size: '182 KB',
      icon: Sparkles,
      color: 'text-amber-300',
      bg: 'bg-amber-500/10 border-amber-500/30',
    },
    {
      name: 'logo-transparent.png',
      label: 'Insignia (PNG Transparente)',
      desc: 'Sin fondo, ideal para superponer en fondos oscuros o prendas',
      url: '/downloads/logo-transparent.png',
      size: '198 KB',
      icon: Sparkles,
      color: 'text-emerald-300',
      bg: 'bg-emerald-500/10 border-emerald-500/30',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900/95 border border-amber-500/30 shadow-2xl shadow-amber-500/10 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-amber-500/10 via-slate-900 to-emerald-500/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 shadow-inner">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif italic text-lg sm:text-xl text-white font-medium">
                Descargar Código y Recursos
              </h3>
              <p className="text-xs text-slate-400">
                Archivos directos sin redirecciones ni dependencias externas
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/10 px-5 pt-3 gap-2 overflow-x-auto bg-slate-950/40 text-xs">
          <button
            onClick={() => setActiveTab('files')}
            className={`pb-2.5 px-3 font-semibold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'files'
                ? 'text-amber-300 border-amber-400'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            <FolderArchive className="w-3.5 h-3.5" />
            <span>Descarga de Archivos</span>
          </button>
          <button
            onClick={() => setActiveTab('code-html')}
            className={`pb-2.5 px-3 font-semibold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'code-html'
                ? 'text-amber-300 border-amber-400'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Ver index.html</span>
          </button>
          <button
            onClick={() => setActiveTab('code-css')}
            className={`pb-2.5 px-3 font-semibold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'code-css'
                ? 'text-emerald-300 border-emerald-400'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Ver style.css</span>
          </button>
          <button
            onClick={() => setActiveTab('code-js')}
            className={`pb-2.5 px-3 font-semibold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'code-js'
                ? 'text-cyan-300 border-cyan-400'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Ver app.js</span>
          </button>
        </div>

        {/* Tab 1: Files view */}
        {activeTab === 'files' && (
          <>
            {/* Quick ZIP download banner */}
            <div className="p-5 sm:p-6 pb-2">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 to-emerald-500/15 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0">
                    <FolderArchive className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">
                      Paquete Completo (.ZIP)
                    </h4>
                    <p className="text-xs text-slate-300">
                      Incluye <code className="text-amber-200">index.html</code>, <code className="text-amber-200">style.css</code>, <code className="text-amber-200">app.js</code> y los logos en PNG/SVG.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => triggerDownload('/downloads/capital-en-juego.zip', 'capital-en-juego.zip')}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{downloading === 'capital-en-juego.zip' ? 'Descargando...' : 'Descargar .ZIP'}</span>
                </button>
              </div>
            </div>

            {/* Individual files list */}
            <div className="p-5 sm:p-6 pt-3 space-y-2.5 overflow-y-auto flex-1">
              <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                Archivos Individuales
              </span>

              <div className="grid gap-2.5">
                {files.map((file) => {
                  const Icon = file.icon;
                  return (
                    <div
                      key={file.name}
                      className="p-3 sm:p-3.5 rounded-xl bg-slate-950/60 border border-white/10 hover:border-amber-500/30 transition-all flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-9 h-9 rounded-xl ${file.bg} flex items-center justify-center ${file.color} shrink-0`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-white font-medium">{file.name}</span>
                            <span className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                              {file.size}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 truncate">{file.desc}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {file.codeKey && (
                          <button
                            type="button"
                            onClick={() => setActiveTab(`code-${file.codeKey}` as any)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors text-xs flex items-center gap-1 cursor-pointer"
                            title="Ver código fuente"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => handleCopyFromUrl(file.name, file.url)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors text-xs flex items-center gap-1 cursor-pointer"
                          title="Copiar contenido"
                        >
                          {copiedTab === file.name ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => triggerDownload(file.url, file.name)}
                          className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 hover:text-amber-200 border border-amber-500/30 transition-all text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>{downloading === file.name ? '...' : 'Descargar'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* Tab 2: HTML Viewer */}
        {activeTab === 'code-html' && (
          <div className="p-5 flex-1 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between pb-3">
              <span className="text-xs font-mono text-amber-300 font-semibold">index.html</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyText('html-code', codeContents['html'] || '')}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedTab === 'html-code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedTab === 'html-code' ? '¡Copiado!' : 'Copiar Todo'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => triggerDownload('/downloads/index.html', 'index.html')}
                  className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar Archivo</span>
                </button>
              </div>
            </div>
            <pre className="p-4 bg-slate-950 rounded-2xl border border-white/10 text-[11px] font-mono text-slate-300 overflow-auto flex-1 leading-relaxed selection:bg-amber-500/40">
              <code>{codeContents['html'] || 'Cargando index.html...'}</code>
            </pre>
          </div>
        )}

        {/* Tab 3: CSS Viewer */}
        {activeTab === 'code-css' && (
          <div className="p-5 flex-1 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between pb-3">
              <span className="text-xs font-mono text-emerald-300 font-semibold">style.css</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyText('css-code', codeContents['css'] || '')}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedTab === 'css-code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedTab === 'css-code' ? '¡Copiado!' : 'Copiar Todo'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => triggerDownload('/downloads/style.css', 'style.css')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar Archivo</span>
                </button>
              </div>
            </div>
            <pre className="p-4 bg-slate-950 rounded-2xl border border-white/10 text-[11px] font-mono text-slate-300 overflow-auto flex-1 leading-relaxed selection:bg-emerald-500/40">
              <code>{codeContents['css'] || 'Cargando style.css...'}</code>
            </pre>
          </div>
        )}

        {/* Tab 4: JS Viewer */}
        {activeTab === 'code-js' && (
          <div className="p-5 flex-1 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between pb-3">
              <span className="text-xs font-mono text-cyan-300 font-semibold">app.js</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyText('js-code', codeContents['js'] || '')}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedTab === 'js-code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedTab === 'js-code' ? '¡Copiado!' : 'Copiar Todo'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => triggerDownload('/downloads/app.js', 'app.js')}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar Archivo</span>
                </button>
              </div>
            </div>
            <pre className="p-4 bg-slate-950 rounded-2xl border border-white/10 text-[11px] font-mono text-slate-300 overflow-auto flex-1 leading-relaxed selection:bg-cyan-500/40">
              <code>{codeContents['js'] || 'Cargando app.js...'}</code>
            </pre>
          </div>
        )}

        {/* Footer */}
        <div className="px-5 sm:px-6 py-3 border-t border-white/10 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <span>Los archivos se descargan directamente en tu dispositivo sin redirecciones.</span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-white/10 text-slate-300 hover:text-white cursor-pointer"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
