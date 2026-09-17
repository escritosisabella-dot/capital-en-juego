import { useState } from 'react';
import { ArrowDown, Trophy, Shield, Sparkles, Play, CheckCircle2, Award, Image as ImageIcon, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { DownloadModal } from '../modals/DownloadModal';

export const Hero = () => {
  const [logoMode, setLogoMode] = useState<'original' | 'transparent'>('original');
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  return (
    <section
      id="inicio"
      className="relative min-h-[96vh] flex items-center pt-28 pb-20 text-white overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(2, 6, 23, 0.78) 0%, rgba(2, 6, 23, 0.88) 50%, rgba(2, 6, 23, 0.98) 100%), url('/hero-bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Background ambient luminous halos */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Clear Presentation, High Contrast Typography & Actions */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-6 flex flex-col items-start space-y-6"
          >
            {/* Category Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] text-amber-200 border border-amber-500/30 text-xs font-medium tracking-widest uppercase backdrop-blur-xl shadow-[0_0_15px_rgba(234,179,8,0.1)]">
              <Shield className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="font-serif italic text-sm normal-case tracking-normal">Educación Física & Estrategia Empresarial</span>
            </div>

            {/* Main Title & Slogan in Elegant Cursive Typography */}
            <div className="space-y-2">
              <h1 className="font-serif italic font-normal text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08]">
                Capital en <span className="font-serif italic text-emerald-400">Juego</span>
              </h1>
              
              <p className="font-cormorant italic text-2xl sm:text-3xl lg:text-4xl text-amber-200/95 font-light tracking-wide">
                «La estrategia también juega»
              </p>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300/90 max-w-xl leading-relaxed font-light">
              Una innovadora disciplina gerencial y deportiva donde el terreno de juego simboliza el mercado competitivo.
              Dos empresas disputan, custodian y multiplican su capital mediante sincronización táctica en parejas
              y liderazgo en tiempo real.
            </p>

            {/* Metrics in Elegant Luxury Glass Cards */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-lg">
              <div className="p-4 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-xl text-center group hover:border-amber-500/40 transition-colors">
                <div className="text-3xl font-serif italic text-amber-200">2</div>
                <div className="text-[11px] font-sans uppercase tracking-widest text-slate-400 font-medium mt-1">Empresas A y B</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-xl text-center group hover:border-emerald-500/40 transition-colors">
                <div className="text-3xl font-serif italic text-emerald-300">100%</div>
                <div className="text-[11px] font-sans uppercase tracking-widest text-slate-400 font-medium mt-1">Capital en Balón</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-xl text-center group hover:border-sky-500/40 transition-colors">
                <div className="text-3xl font-serif italic text-sky-300">2 vs 2</div>
                <div className="text-[11px] font-sans uppercase tracking-widest text-slate-400 font-medium mt-1">Duplas Tácticas</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
              <a
                id="btn-conoce-el-juego"
                href="#que-es"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_35px_rgba(16,185,129,0.45)] transition-all cursor-pointer border border-emerald-400/40"
              >
                <span>Conoce el Juego</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                id="btn-ver-pizarra"
                href="#pizarra-tactica"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/15 font-medium text-sm tracking-wider uppercase backdrop-blur-xl transition-all cursor-pointer shadow-sm hover:border-amber-400/50"
              >
                <Play className="w-4 h-4 text-amber-400" />
                <span>Pizarra Táctica</span>
              </a>

              <a
                id="btn-panel-empresa"
                href="#panel-empresa"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-amber-200 border border-amber-500/30 font-medium text-sm tracking-wider uppercase backdrop-blur-xl transition-all cursor-pointer shadow-sm hover:border-amber-400/60"
              >
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Panel Gerencial</span>
              </a>

              <button
                id="btn-descargar-codigo"
                type="button"
                onClick={() => setIsDownloadOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-500/20 to-emerald-500/20 hover:from-amber-500/30 hover:to-emerald-500/30 text-amber-300 border border-amber-500/40 font-medium text-sm tracking-wider uppercase backdrop-blur-xl transition-all cursor-pointer shadow-[0_0_20px_rgba(234,179,8,0.15)] hover:border-amber-400"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Descargar Código (HTML/CSS/JS)</span>
              </button>
            </div>

            {/* Highlights list */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-300/80 pt-1">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-cormorant italic text-sm">Reglas Formativas Oficiales</span>
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-cormorant italic text-sm">Simulador de Mercado 2 vs 2</span>
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                <span className="font-cormorant italic text-sm">Custodia y Finanzas en Campo</span>
              </span>
            </div>
          </motion.div>

          {/* Right Column: Official Logo Showcase with luxury depth and floating animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.15,
            }}
            className="lg:col-span-6 flex flex-col items-center justify-center"
          >
            <div className="relative w-full max-w-[480px] sm:max-w-[520px] rounded-3xl bg-slate-950/70 backdrop-blur-2xl border border-white/[0.08] p-6 sm:p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] flex flex-col justify-between overflow-hidden group">
              
              {/* Internal glowing atmospheric halos */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/15 blur-3xl rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/15 blur-3xl rounded-full pointer-events-none" />

              {/* Header Badge with View Mode Selector */}
              <div className="relative z-10 w-full flex items-center justify-between text-xs pb-3.5 border-b border-white/[0.08]">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-amber-500/30 text-amber-200 font-serif italic text-sm tracking-wide shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Emblema Oficial</span>
                </div>

                <div className="inline-flex items-center p-0.5 rounded-full bg-slate-900/90 border border-white/10 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setLogoMode('original')}
                    className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                      logoMode === 'original'
                        ? 'bg-amber-500/20 text-amber-300 font-medium border border-amber-500/30 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Lienzo Original
                  </button>
                  <button
                    type="button"
                    onClick={() => setLogoMode('transparent')}
                    className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                      logoMode === 'transparent'
                        ? 'bg-amber-500/20 text-amber-300 font-medium border border-amber-500/30 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Insignia
                  </button>
                </div>
              </div>

              {/* Center Logo Showcase with Floating Animation */}
              <div className="relative z-10 flex-1 w-full flex items-center justify-center my-4 min-h-[300px] sm:min-h-[350px]">
                {/* Luminous aura behind logo */}
                <div className="absolute w-60 h-60 rounded-full bg-gradient-to-tr from-amber-500/20 via-emerald-500/15 to-transparent blur-2xl pointer-events-none" />

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative flex items-center justify-center py-2"
                >
                  {logoMode === 'original' ? (
                    <div className="rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-2xl shadow-black/90 p-1.5 bg-[#f7efe1] group-hover:scale-105 transition-transform duration-700">
                      <img
                        src="/logo.png"
                        alt="Logo Original Capital en Juego"
                        className="w-auto h-64 sm:h-80 max-h-[380px] object-contain rounded-xl"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ) : (
                    <img
                      src="/logo-transparent.png"
                      alt="Logo Oficial Capital en Juego"
                      className="w-auto h-64 sm:h-80 max-h-[380px] object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.9)] filter group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </motion.div>
              </div>

              {/* Bottom Explanatory Card */}
              <div className="relative z-10 w-full space-y-2.5 pt-3 border-t border-white/[0.08]">
                <div className="backdrop-blur-xl rounded-2xl p-4 border border-white/[0.08] bg-slate-950/80 flex items-center justify-between text-xs text-white shadow-lg">
                  <div className="text-left pr-2">
                    <span className="block font-serif italic text-amber-200 text-base font-normal">
                      Emblema Oficial Capital en Juego
                    </span>
                    <span className="font-cormorant italic text-sm text-slate-300 font-light mt-0.5 block leading-snug">
                      «La disputa estratégica por el maletín de recursos: liderazgo corporativo y pasión futbolística»
                    </span>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="inline-block px-3.5 py-1.5 rounded-full border font-serif italic text-xs bg-amber-500/10 text-amber-300 border-amber-500/30 shadow-sm whitespace-nowrap">
                      Torneo 2026
                    </span>
                  </div>
                </div>

                {/* Quick Download Action Button */}
                <div className="pt-1 flex items-center justify-between gap-2">
                  <a
                    href="/downloads/capital-en-juego.zip"
                    download="capital-en-juego.zip"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 hover:text-amber-200 text-xs font-semibold tracking-wide transition-all shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Descargar .ZIP (HTML, CSS, JS)</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsDownloadOpen(true)}
                    className="py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-medium transition-all"
                  >
                    Ver Archivos
                  </button>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Download Center Modal */}
      <DownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
      />
    </section>
  );
};
