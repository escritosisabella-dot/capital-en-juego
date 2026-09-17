import { useState } from 'react';
import { Play, RotateCcw, Shield, Trophy, CheckCircle, Flag, ArrowRight, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import { GAME_RULES } from '../data/gameData';

export const HowToPlay = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [simPhase, setSimPhase] = useState<'inicio' | 'incursion' | 'captura' | 'victoria'>('inicio');

  const handleNextPhase = () => {
    if (simPhase === 'inicio') setSimPhase('incursion');
    else if (simPhase === 'incursion') setSimPhase('captura');
    else if (simPhase === 'captura') setSimPhase('victoria');
    else setSimPhase('inicio');
  };

  const handleResetSim = () => {
    setSimPhase('inicio');
  };

  return (
    <section id="como-se-juega" className="py-24 bg-[#07090e] relative overflow-hidden text-white border-t border-white/[0.06]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-emerald-950/20 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] text-amber-200 border border-amber-500/30 text-xs font-medium tracking-widest uppercase backdrop-blur-xl">
            <span>⚽</span>
            <span className="font-cormorant italic normal-case text-sm">Protocolo Operativo de Alta Precisión</span>
          </div>

          <h2 className="font-serif italic text-4xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight">
            ¿Cómo se <span className="font-serif italic text-emerald-400">juega</span>?
          </h2>
          <p className="font-cormorant italic text-xl sm:text-2xl text-slate-300/80 font-light max-w-2xl mx-auto">
            «Manual reglamentario de 6 fases donde la disciplina táctica sella el destino patrimonial»
          </p>
        </div>

        {/* 6 Rules Step-by-Step Grid with 3D Depth */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GAME_RULES.map((rule, idx) => {
            const isCurrent = activeStepIndex === idx;
            return (
              <motion.div
                key={rule.step}
                onClick={() => setActiveStepIndex(idx)}
                whileHover={{ y: -5, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className={`cursor-pointer rounded-3xl p-7 transition-all border flex flex-col justify-between backdrop-blur-xl ${
                  isCurrent
                    ? 'bg-white/[0.05] border-amber-500/60 shadow-[0_15px_40px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/30'
                    : 'bg-white/[0.02] border-white/[0.08] hover:border-white/20 hover:bg-white/[0.03]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className={`w-10 h-10 rounded-2xl flex items-center justify-center font-serif italic text-base ${
                      isCurrent
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-md'
                        : 'bg-white/[0.04] text-slate-300 border border-white/10'
                    }`}>
                      {rule.step}
                    </span>
                    <span className="text-xs font-serif italic text-amber-300/80 tracking-wider">
                      Fase {rule.step} de 6
                    </span>
                  </div>

                  <h3 className={`font-serif italic text-2xl mb-2.5 transition-colors font-normal ${
                    isCurrent ? 'text-amber-200' : 'text-white'
                  }`}>
                    {rule.title}
                  </h3>

                  <p className="text-sm text-slate-300/80 leading-relaxed font-light">
                    {rule.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs bg-black/40 p-3.5 rounded-2xl border border-white/[0.04]">
                  <span className="font-serif italic text-sky-300 block mb-1 text-sm font-normal">
                    💡 Visión Administrativa:
                  </span>
                  <span className="font-light text-slate-300">{rule.tacticalNote}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Tactical Field / Pizarra Táctica */}
        <div className="mt-16 bg-white/[0.02] border border-white/[0.09] rounded-3xl p-7 sm:p-9 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2 text-amber-300 text-xs font-serif italic uppercase tracking-wider">
                <Activity className="w-4 h-4 text-amber-400" />
                <span>Simulador Dinámico de Campo / Pizarra Táctica 3D</span>
              </div>
              <h3 className="font-serif italic text-2xl sm:text-3xl text-white mt-1 font-normal">
                Visualización Táctica del Juego
              </h3>
              <p className="font-cormorant italic text-base text-slate-300/80 font-light">
                Observa cómo interactúan las dos bases y cómo una incursión sincronizada concreta la victoria patrimonial.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={handleNextPhase}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-serif italic text-sm font-medium shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                <span>
                  {simPhase === 'inicio' && 'Avanzar: Incursión'}
                  {simPhase === 'incursion' && 'Avanzar: Captura de Capital'}
                  {simPhase === 'captura' && 'Avanzar: Retorno a Base'}
                  {simPhase === 'victoria' && 'Reiniciar Simulación'}
                </span>
              </button>

              <button
                onClick={handleResetSim}
                className="p-2.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Reiniciar Pizarra"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tactical Pitch Surface */}
          <div className="mt-8 relative w-full h-84 sm:h-96 rounded-2xl overflow-hidden bg-gradient-to-b from-[#060a0f] to-[#040608] border border-emerald-500/20 p-5 sm:p-7 flex flex-col justify-between shadow-2xl">
            
            {/* Field Pitch markings with gold & emerald illumination */}
            <div className="absolute inset-0 border border-emerald-500/15 m-4 rounded-xl pointer-events-none" />
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-emerald-500/20 -translate-x-1/2 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 w-32 h-32 border border-emerald-500/20 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-emerald-400/40 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            {/* Top Field Labels */}
            <div className="relative z-10 flex items-center justify-between text-xs text-slate-300 px-2">
              <div className="flex items-center gap-2 text-sky-300 bg-sky-950/50 px-3.5 py-1.5 rounded-full border border-sky-500/30 backdrop-blur-md">
                <span className="font-serif italic">🏢 Base Empresa A</span>
                <span className="text-[10px] bg-sky-500/20 px-2 py-0.5 rounded-full text-sky-200">Territorio A</span>
              </div>
              <div className="text-[11px] font-serif italic text-amber-300 bg-black/60 px-4 py-1.5 rounded-full border border-amber-500/30 backdrop-blur-md tracking-wider">
                LÍNEA DE MEDIO CAMPO (MERCADO COMÚN)
              </div>
              <div className="flex items-center gap-2 text-emerald-300 bg-emerald-950/50 px-3.5 py-1.5 rounded-full border border-emerald-500/30 backdrop-blur-md">
                <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded-full text-emerald-200">Territorio B</span>
                <span className="font-serif italic">Base Empresa B 🏢</span>
              </div>
            </div>

            {/* Dynamic Player & Ball Positioning based on simPhase */}
            <div className="relative z-10 grid grid-cols-2 h-full items-center px-4">
              
              {/* EMPRESA A SIDE */}
              <div className="relative h-full flex items-center justify-between pr-8">
                
                {/* Base Vault A */}
                <div className="flex flex-col items-center p-3.5 rounded-2xl bg-sky-950/80 border border-sky-500/50 text-center shadow-[0_0_20px_rgba(14,165,233,0.3)] backdrop-blur-md">
                  <div className="text-xs font-serif italic text-sky-300 mb-1">Base A</div>
                  <div className="text-2xl animate-bounce">
                    ⚽
                  </div>
                  <span className="text-[10px] text-slate-300 font-light mt-1">Capital A</span>
                </div>

                {/* Pareja Custodia A (Defensores) */}
                <div className="flex flex-col items-center bg-sky-900/60 border border-sky-400/40 p-2.5 rounded-2xl text-white text-center shadow-lg backdrop-blur-md">
                  <span className="text-xs font-serif italic">👥 Pareja 1</span>
                  <span className="text-[10px] text-sky-200 font-light">Custodia Activos</span>
                </div>

                {/* Pareja Expansión A (Atacantes en movimiento) */}
                <div
                  className={`flex flex-col items-center p-2.5 rounded-2xl text-white text-center transition-all duration-700 backdrop-blur-md ${
                    simPhase === 'inicio'
                      ? 'translate-x-0 bg-sky-900/60 border border-sky-400/40 shadow-sm'
                      : simPhase === 'incursion'
                      ? 'translate-x-36 sm:translate-x-48 bg-sky-600 border border-sky-300 shadow-[0_0_25px_rgba(56,189,248,0.5)] font-medium'
                      : simPhase === 'captura'
                      ? 'translate-x-64 sm:translate-x-80 bg-sky-600 border border-sky-300 shadow-[0_0_30px_rgba(56,189,248,0.7)] font-medium'
                      : 'translate-x-6 sm:translate-x-10 bg-emerald-600 border border-emerald-300 shadow-[0_0_30px_rgba(16,185,129,0.7)] font-medium'
                  }`}
                >
                  <span className="text-xs font-serif italic">👥 Pareja 2 (Expansión)</span>
                  <span className="text-[10px] text-sky-100 font-light">
                    {simPhase === 'inicio' && 'Listo para incursión'}
                    {simPhase === 'incursion' && '¡Cruzando al mercado rival!'}
                    {simPhase === 'captura' && '¡Capturando capital B ⚽!'}
                    {simPhase === 'victoria' && '¡Capital asegurado en Base A! 🏆'}
                  </span>
                </div>

              </div>

              {/* EMPRESA B SIDE */}
              <div className="relative h-full flex items-center justify-between pl-8">
                
                {/* Pareja Expansión B */}
                <div className="flex flex-col items-center bg-white/[0.04] border border-white/10 p-2.5 rounded-2xl text-white text-center shadow-sm backdrop-blur-md">
                  <span className="text-xs font-serif italic">👥 Pareja 3</span>
                  <span className="text-[10px] text-slate-400 font-light">Incursión B</span>
                </div>

                {/* Pareja Custodia B */}
                <div className="flex flex-col items-center bg-white/[0.04] border border-white/10 p-2.5 rounded-2xl text-white text-center shadow-sm backdrop-blur-md">
                  <span className="text-xs font-serif italic">👥 Pareja 4</span>
                  <span className="text-[10px] text-slate-400 font-light">Defensa Base</span>
                </div>

                {/* Base Vault B */}
                <div className="flex flex-col items-center p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-center shadow-[0_0_20px_rgba(16,185,129,0.3)] backdrop-blur-md">
                  <div className="text-xs font-serif italic text-emerald-300 mb-1">Base B</div>
                  <div className={`text-2xl transition-all ${
                    simPhase === 'captura' || simPhase === 'victoria' ? 'opacity-30 line-through' : ''
                  }`}>
                    ⚽
                  </div>
                  <span className="text-[10px] text-slate-300 font-light mt-1">
                    {simPhase === 'captura' || simPhase === 'victoria' ? 'Capital Extraído' : 'Capital B'}
                  </span>
                </div>

              </div>

            </div>

            {/* Bottom Status bar */}
            <div className="relative z-10 bg-black/60 backdrop-blur-xl rounded-2xl p-3.5 border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300 gap-2.5">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-serif italic text-amber-300">Fase Táctica:</span>
                <span className="text-slate-200 font-light">
                  {simPhase === 'inicio' && 'Equipos organizados en sus bases, custodiando su respectivo capital (⚽).'}
                  {simPhase === 'incursion' && 'La Pareja de Expansión de Empresa A avanza en sincronía al campo rival.'}
                  {simPhase === 'captura' && 'Pareja A sortea la defensa de Empresa B y toma posesión del activo rival.'}
                  {simPhase === 'victoria' && '¡Victoria consumada! Empresa A transporta el balón rival a su base y consolida la fusión.'}
                </span>
              </div>
              <span className="text-amber-200/70 text-[11px] font-serif italic whitespace-nowrap">
                Regla 6: Gana quien lleve el capital rival a su base
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
