import { useState } from 'react';
import { Building, Trophy, Shield, Target, Users, Zap, CheckCircle2, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { COMPANIES_DATA } from '../data/gameData';

export const CompaniesComparison = () => {
  return (
    <section id="empresas" className="py-24 bg-[#0a0d14] relative overflow-hidden text-white border-t border-white/[0.06]">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-950/20 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-emerald-950/20 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] text-amber-200 border border-amber-500/30 text-xs font-medium tracking-widest uppercase backdrop-blur-xl">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-cormorant italic normal-case text-sm">Estructuras Corporativas</span>
          </div>

          <h2 className="font-serif italic text-4xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight">
            Empresas en <span className="font-serif italic text-amber-300">Competencia</span>
          </h2>
          <p className="font-cormorant italic text-xl sm:text-2xl text-slate-300/80 font-light max-w-2xl mx-auto">
            «Dos entidades de élite con tácticas complementarias, unidas por la excelencia en la ejecución patrimonial»
          </p>
        </div>

        {/* Two Company Profiles Grid with 3D Depth */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {COMPANIES_DATA.map((company) => {
            const isBlue = company.id === 'empresa-a';
            return (
              <motion.div
                key={company.id}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className={`rounded-3xl p-7 sm:p-9 border transition-all backdrop-blur-xl flex flex-col justify-between ${
                  isBlue
                    ? 'bg-gradient-to-b from-sky-950/20 to-transparent border-sky-500/20 hover:border-sky-500/40 shadow-[0_20px_50px_rgba(14,165,233,0.08)]'
                    : 'bg-gradient-to-b from-emerald-950/20 to-transparent border-emerald-500/20 hover:border-emerald-500/40 shadow-[0_20px_50px_rgba(16,185,129,0.08)]'
                }`}
              >
                <div>
                  {/* Header Profile */}
                  <div className="flex items-start justify-between gap-4 pb-6 border-b border-white/[0.08]">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border backdrop-blur-md ${
                        isBlue
                          ? 'bg-sky-950/60 border-sky-500/30 text-sky-300 shadow-[0_0_20px_rgba(56,189,248,0.2)]'
                          : 'bg-emerald-950/60 border-emerald-500/30 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                      }`}>
                        🏢
                      </div>
                      <div>
                        <h3 className="font-serif italic text-2xl sm:text-3xl text-white font-normal">
                          {company.name}
                        </h3>
                        <span className={`inline-block text-xs font-serif italic px-3 py-0.5 rounded-full border mt-1.5 ${
                          isBlue
                            ? 'bg-sky-500/10 text-sky-200 border-sky-500/30'
                            : 'bg-emerald-500/10 text-emerald-200 border-emerald-500/30'
                        }`}>
                          {company.tag}
                        </span>
                      </div>
                    </div>

                    {/* Capital Pill */}
                    <div className="text-right">
                      <div className="text-[11px] uppercase tracking-wider text-slate-400 font-light">
                        Capital Asignado
                      </div>
                      <div className="font-serif italic text-2xl text-amber-300 flex items-center justify-end gap-1.5 mt-0.5">
                        <span>⚽</span>
                        <span className="text-xs text-slate-300 font-light font-sans">1 Balón Oficial</span>
                      </div>
                    </div>
                  </div>

                  {/* Misión Requerida */}
                  <div className="mt-6 space-y-4">
                    <div className={`p-4 rounded-2xl border backdrop-blur-md ${
                      isBlue ? 'bg-sky-950/30 border-sky-500/20' : 'bg-emerald-950/30 border-emerald-500/20'
                    }`}>
                      <div className="flex items-center gap-2 text-xs font-serif italic text-amber-300 uppercase tracking-wider mb-1.5">
                        <Target className={`w-4 h-4 ${isBlue ? 'text-sky-400' : 'text-emerald-400'}`} />
                        <span>Misión Corporativa:</span>
                      </div>
                      <p className="font-cormorant italic text-lg text-slate-200 font-light leading-relaxed">
                        «{company.mission}»
                      </p>
                    </div>

                    {/* Indicadores Corporativos */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
                        <span className="text-[11px] text-slate-400 block font-light">Estrategia</span>
                        <span className="text-amber-400 text-sm font-medium mt-1 block">
                          {'★'.repeat(company.strategyStars)}
                        </span>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
                        <span className="text-[11px] text-slate-400 block font-light">Trabajo en Equipo</span>
                        <span className="text-amber-400 text-sm font-medium mt-1 block">
                          {'★'.repeat(company.teamworkStars)}
                        </span>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
                        <span className="text-[11px] text-slate-400 block font-light">Organización</span>
                        <span className="text-amber-400 text-sm font-medium mt-1 block">
                          {'★'.repeat(company.organizationStars)}
                        </span>
                      </div>
                    </div>

                    {/* Estilo Táctico */}
                    <div className="text-xs text-slate-300 bg-white/[0.02] p-4 rounded-2xl border border-white/[0.06]">
                      <span className="font-serif italic text-amber-200 block mb-1 text-sm font-normal">
                        ⚙️ Enfoque Estratégico en Cancha:
                      </span>
                      <span className="font-light leading-relaxed block text-slate-300/90">{company.tacticalStyle}</span>
                    </div>

                    {/* Organigrama de Parejas */}
                    <div className="pt-2">
                      <span className="text-xs font-serif italic text-slate-400 tracking-wider block mb-2.5">
                        Organización Funcional (Parejas Sincronizadas):
                      </span>
                      <div className="space-y-2">
                        {company.keyPairs.map((pair, pIdx) => (
                          <div
                            key={pIdx}
                            className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs"
                          >
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-amber-400/80" />
                              <span className="font-serif italic text-sm text-slate-200">{pair.role}</span>
                            </div>
                            <span className="text-slate-400 font-light italic font-cormorant text-sm">{pair.focus}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Corporate Motto Banner */}
        <div className="mt-12 p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-2xl flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center justify-center text-xl shrink-0 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
              🤝
            </div>
            <div>
              <h4 className="font-serif italic text-xl text-white font-normal">Competencia Justa y Ética Corporativa</h4>
              <p className="font-cormorant italic text-base text-slate-300/80 mt-0.5 font-light">
                Ambas empresas operan bajo las mismas leyes de juego y mercado. La victoria no es por azar físico, sino por rigor estratégico.
              </p>
            </div>
          </div>
          <a
            href="#como-se-juega"
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-xs font-serif italic font-medium text-slate-950 shadow-lg shadow-amber-500/20 shrink-0 transition-all cursor-pointer"
          >
            Revisar Reglas de Juego
          </a>
        </div>

      </div>
    </section>
  );
};
