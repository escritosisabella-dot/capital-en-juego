import { useState } from 'react';
import { Briefcase, Building, Coins, TrendingUp, Users, Zap, Brain, ArrowUpRight, CheckCircle2, X } from 'lucide-react';
import { motion } from 'motion/react';
import { ADMIN_CONCEPTS } from '../data/gameData';
import { AdminConcept } from '../types';

export const AdminConcepts = () => {
  const [selectedConcept, setSelectedConcept] = useState<AdminConcept | null>(null);

  const getConceptIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coins':
        return <Coins className="w-5 h-5 text-amber-400" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-emerald-400" />;
      case 'Users':
        return <Users className="w-5 h-5 text-sky-400" />;
      case 'Building2':
        return <Building className="w-5 h-5 text-indigo-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-yellow-400" />;
      case 'Brain':
        return <Brain className="w-5 h-5 text-purple-400" />;
      default:
        return <Briefcase className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="conceptos" className="py-24 bg-[#07090e] relative overflow-hidden text-white border-t border-white/[0.06]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-emerald-950/20 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] text-amber-200 border border-amber-500/30 text-xs font-medium tracking-widest uppercase backdrop-blur-xl">
            <Briefcase className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-cormorant italic normal-case text-sm">Fundamentos Gerenciales Aplicados</span>
          </div>

          <h2 className="font-serif italic text-4xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight">
            Conceptos de <span className="font-serif italic text-emerald-400">Administración</span>
          </h2>
          <p className="font-cormorant italic text-xl sm:text-2xl text-slate-300/80 font-light max-w-2xl mx-auto">
            «Cada dinámica deportiva traduce con precisión matemática un pilar de la gestión y dirección empresarial»
          </p>
        </div>

        {/* 6 Concept Cards with 3D Hover Tilt */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ADMIN_CONCEPTS.map((concept) => (
            <motion.div
              key={concept.id}
              onClick={() => setSelectedConcept(concept)}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="cursor-pointer rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-emerald-500/40 hover:bg-white/[0.04] backdrop-blur-xl p-7 flex flex-col justify-between transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] group"
            >
              <div>
                {/* Header with Emoji & Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl p-2.5 rounded-2xl bg-white/[0.04] border border-white/10 group-hover:scale-110 transition-transform">
                      {concept.emoji}
                    </span>
                    <div>
                      <h3 className="font-serif italic text-2xl text-white font-normal group-hover:text-amber-200 transition-colors">
                        {concept.name}
                      </h3>
                      <span className="text-[11px] font-serif italic text-amber-300/70 uppercase tracking-widest">Dimensión Ejecutiva</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-2xl border border-white/10 bg-white/[0.03]">
                    {getConceptIcon(concept.iconName)}
                  </div>
                </div>

                <p className="text-sm text-slate-300/80 font-light mb-5 leading-relaxed">
                  {concept.shortDesc}
                </p>

                {/* Dual Application Preview in Luxury Boxes */}
                <div className="space-y-3 text-xs rounded-2xl p-4 bg-black/40 border border-white/[0.06]">
                  <div>
                    <span className="font-serif italic text-sky-300 flex items-center gap-1.5 mb-1 text-sm font-normal">
                      🏢 En la Empresa:
                    </span>
                    <p className="text-slate-300 font-light leading-relaxed">
                      {concept.businessContext}
                    </p>
                  </div>
                  <div className="pt-2.5 border-t border-white/[0.06]">
                    <span className="font-serif italic text-emerald-300 flex items-center gap-1.5 mb-1 text-sm font-normal">
                      ⚽ En la Cancha:
                    </span>
                    <p className="text-slate-300 font-light leading-relaxed">
                      {concept.gameContext}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-serif italic text-amber-300/90 group-hover:text-amber-200">
                <span>Inspeccionar análisis dual</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal / Detailed Card View with Luxury Aesthetics */}
        {selectedConcept && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0b0f17] border border-amber-500/30 rounded-3xl max-w-lg w-full p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] space-y-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 blur-[60px] pointer-events-none" />

              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-3.5">
                  <span className="text-3xl p-2 rounded-2xl bg-white/[0.04] border border-white/10">{selectedConcept.emoji}</span>
                  <div>
                    <h3 className="font-serif italic text-2xl text-white font-normal">{selectedConcept.name}</h3>
                    <p className="text-xs font-serif italic text-amber-300 uppercase tracking-wider">Concepto Administrativo de Élite</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedConcept(null)}
                  className="p-2.5 rounded-full bg-white/[0.05] text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border border-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                {selectedConcept.shortDesc}
              </p>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-sky-950/20 border border-sky-500/20">
                  <h4 className="font-serif italic text-sky-300 text-sm mb-1.5 flex items-center gap-2 font-normal">
                    <Building className="w-4 h-4 text-sky-400" />
                    Dimensión en Administración de Empresas
                  </h4>
                  <p className="text-sm text-slate-300 font-light leading-relaxed">
                    {selectedConcept.businessContext}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/20">
                  <h4 className="font-serif italic text-emerald-300 text-sm mb-1.5 flex items-center gap-2 font-normal">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Ejecución Táctica en la Cancha
                  </h4>
                  <p className="text-sm text-slate-300 font-light leading-relaxed">
                    {selectedConcept.gameContext}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedConcept(null)}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-serif italic text-base shadow-lg transition-all cursor-pointer font-medium"
              >
                Cerrar análisis
              </button>
            </motion.div>
          </div>
        )}

      </div>
    </section>
  );
};
