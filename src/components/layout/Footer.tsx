import { Shield, Heart, ArrowUp } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05070a] border-t border-white/[0.08] text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/[0.08]">
          
          {/* Brand & Slogan */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500/20 to-emerald-500/20 border border-amber-500/30 flex items-center justify-center p-1.5 shadow-lg shadow-amber-500/10 overflow-hidden">
                <img src="/logo-transparent.png" alt="Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              </div>
              <span className="font-serif italic text-2xl text-white tracking-tight">
                Capital en <span className="font-serif italic text-amber-300">Juego</span>
              </span>
            </div>

            <p className="font-cormorant italic text-xl text-amber-200/90 font-light">
              «La estrategia también juega»
            </p>

            <p className="text-xs text-slate-400 max-w-md leading-relaxed font-light font-sans">
              Proyecto integrador de Educación Física y Ciencias Administrativas. Aprender a custodiar recursos, liderar en sincronía de parejas y conquistar metas de mercado mediante la dinámica del fútbol.
            </p>
          </div>

          {/* Quick Sections Navigation */}
          <div>
            <h4 className="font-serif italic text-sm text-amber-300 uppercase tracking-wider mb-4 font-normal">
              Estructura del Proyecto
            </h4>
            <ul className="space-y-2.5 text-xs font-serif italic text-slate-300">
              <li>
                <a href="#inicio" className="hover:text-amber-300 transition-colors">1. Inicio & Visión</a>
              </li>
              <li>
                <a href="#que-es" className="hover:text-amber-300 transition-colors">2. ¿Qué es Capital en Juego?</a>
              </li>
              <li>
                <a href="#objetivos" className="hover:text-amber-300 transition-colors">3. Objetivos Estratégicos</a>
              </li>
              <li>
                <a href="#conceptos" className="hover:text-amber-300 transition-colors">4. Conceptos Administrativos</a>
              </li>
              <li>
                <a href="#panel-empresa" className="hover:text-amber-300 transition-colors">5. Simulador Ejecutivo</a>
              </li>
              <li>
                <a href="#como-se-juega" className="hover:text-amber-300 transition-colors">6. ¿Cómo se juega? (Reglas)</a>
              </li>
              <li>
                <a href="#empresas" className="hover:text-amber-300 transition-colors">7. Empresas A y B</a>
              </li>
              <li>
                <a href="#galeria" className="hover:text-amber-300 transition-colors">8. Galería de Actividades</a>
              </li>
              <li>
                <a href="#aprendizajes" className="hover:text-amber-300 transition-colors">9. Lo que aprendimos</a>
              </li>
            </ul>
          </div>

          {/* Executive Panel Link & Highlight */}
          <div className="space-y-4">
            <h4 className="font-serif italic text-sm text-amber-300 uppercase tracking-wider font-normal">
              Estado de la Empresa
            </h4>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-md text-xs space-y-2.5 shadow-lg">
              <div className="text-white font-serif italic flex items-center justify-between">
                <span>Capital asignado:</span>
                <span className="text-amber-300 text-sm">⚽ 1 Balón</span>
              </div>
              <div className="text-slate-300 flex items-center justify-between font-light">
                <span>Estrategia:</span>
                <span className="text-amber-400">★★★★☆</span>
              </div>
              <div className="text-slate-300 flex items-center justify-between font-light">
                <span>Trabajo en equipo:</span>
                <span className="text-amber-400">★★★★★</span>
              </div>
              <div className="text-slate-300 flex items-center justify-between font-light">
                <span>Organización:</span>
                <span className="text-amber-400">★★★★☆</span>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-xs font-serif italic text-amber-300 hover:text-amber-200 transition-colors pt-1 cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5 text-amber-400" />
              <span>Volver arriba</span>
            </button>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3 font-light">
          <p>© {new Date().getFullYear()} Capital en Juego — «La estrategia también juega».</p>
          <p className="font-cormorant italic text-sm text-slate-400">
            Diseñado para integrar el deporte con la Administración de Empresas
          </p>
        </div>

      </div>
    </footer>
  );
};
