import { BookOpen, ShieldCheck, Briefcase, Users2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const WhatIsIt = () => {
  return (
    <section id="que-es" className="py-24 bg-[#07090e] relative overflow-hidden text-white border-t border-white/[0.06]">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-950/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-950/20 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] text-amber-200 border border-amber-500/30 text-xs font-medium tracking-widest uppercase backdrop-blur-xl">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-cormorant italic normal-case text-sm">Fundamentación Teórica</span>
          </div>

          <h2 className="font-serif italic text-4xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight">
            ¿Qué es <span className="font-serif italic text-emerald-400">Capital en Juego</span>?
          </h2>

          <p className="font-cormorant italic text-xl sm:text-2xl text-amber-200/80 font-light max-w-2xl mx-auto">
            «La simulación directiva donde cada metro avanzado en el campo representa una victoria financiera»
          </p>

          {/* Breve explicación solicitada textualmente */}
          <div className="mt-8 p-7 sm:p-9 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-left relative overflow-hidden group hover:border-amber-500/30 transition-all duration-500">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-amber-400 via-emerald-400 to-teal-500" />
            <p className="text-base sm:text-lg text-slate-200 font-light leading-relaxed pl-2">
              <strong className="font-serif italic text-white font-normal text-xl">Capital en Juego</strong> es una actividad deportiva basada en la competencia entre dos empresas. Los equipos deben proteger su capital y conseguir el capital del equipo contrario mediante estrategia, organización y trabajo en equipo.
            </p>
          </div>
        </div>

        {/* Metáfora y Correspondencia con 3D Card Depth */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <motion.div 
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.3 }}
            className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-emerald-500/40 hover:bg-white/[0.04] backdrop-blur-xl shadow-2xl transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                ⚽
              </div>
              <h3 className="font-serif italic text-2xl text-white mb-3 font-normal group-hover:text-emerald-300 transition-colors">
                El Balón = El Capital
              </h3>
              <p className="text-sm text-slate-300/80 leading-relaxed font-light">
                No es solo un esférico de juego; representa el patrimonio financiero e intelectual de la organización. Perder la posesión debilita de inmediato a la empresa frente al rival.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center text-xs font-serif italic text-emerald-300 gap-1.5">
              <span>Custodia de Activos Críticos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.3 }}
            className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-sky-500/40 hover:bg-white/[0.04] backdrop-blur-xl shadow-2xl transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-300 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Users2 className="w-6 h-6 text-sky-400" />
              </div>
              <h3 className="font-serif italic text-2xl text-white mb-3 font-normal group-hover:text-sky-300 transition-colors">
                Parejas = Sinergia de Áreas
              </h3>
              <p className="text-sm text-slate-300/80 leading-relaxed font-light">
                Ningún colaborador actúa en solitario. Trabajar en parejas obliga a coordinar visiones, repartir esfuerzos de cobertura y respaldar los movimientos del compañero.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center text-xs font-serif italic text-sky-300 gap-1.5">
              <span>Comunicación Interdepartamental</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.3 }}
            className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-amber-500/40 hover:bg-white/[0.04] backdrop-blur-xl shadow-2xl transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="font-serif italic text-2xl text-white mb-3 font-normal group-hover:text-amber-300 transition-colors">
                La Cancha = El Mercado
              </h3>
              <p className="text-sm text-slate-300/80 leading-relaxed font-light">
                Un terreno neutral donde conviven la oferta, la demanda y la competencia feroz. Quien logre transportar el capital rival a su base concreta una adquisición estratégica.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center text-xs font-serif italic text-amber-300 gap-1.5">
              <span>Conquista y Liderazgo de Mercado</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
