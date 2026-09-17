import { useState } from 'react';
import { 
  Building2, 
  Coins, 
  ShieldCheck, 
  Star, 
  TrendingUp, 
  Users, 
  Layers, 
  Award, 
  Sliders, 
  CheckCircle2, 
  Play,
  RotateCcw,
  AlertCircle
} from 'lucide-react';
import { motion } from 'motion/react';

export const CompanyPanel = () => {
  const [selectedCompany, setSelectedCompany] = useState<'A' | 'B'>('A');
  const [strategyPreset, setStrategyPreset] = useState<'equilibrada' | 'conservadora' | 'ofensiva'>('equilibrada');
  const [capitalCount, setCapitalCount] = useState<number>(1);
  const [tacticalLogs, setTacticalLogs] = useState<string[]>([
    'Ronda 1 iniciada: Asignación de 1 balón de capital en Base.',
    'Pareja de custodia establecida en perímetro de seguridad.',
    'Plan de ataque coordinado en sincronía de parejas.'
  ]);

  // Exact configuration mapping based on prompt specification
  const getPanelRatings = () => {
    switch (strategyPreset) {
      case 'conservadora':
        return {
          estrategia: 4,
          trabajoEnEquipo: 5,
          organizacion: 5,
          name: 'Custodia Patrimonial (Defensa Firme)',
          desc: 'Prioriza salvaguardar el capital en la base propia minimizando riesgos de intercepción rival.'
        };
      case 'ofensiva':
        return {
          estrategia: 5,
          trabajoEnEquipo: 4,
          organizacion: 3,
          name: 'Expansión de Mercado (Incursión Agresiva)',
          desc: 'Todo el esfuerzo se vuelca a capturar el capital rival, aceptando mayor exposición en la base.'
        };
      case 'equilibrada':
      default:
        // EXACT VALUES FROM USER PROMPT:
        // Capital disponible: ⚽
        // Estrategia: ⭐⭐⭐⭐
        // Trabajo en equipo: ⭐⭐⭐⭐⭐
        // Organización: ⭐⭐⭐⭐
        return {
          estrategia: 4,
          trabajoEnEquipo: 5,
          organizacion: 4,
          name: 'Estrategia Balanceada (Recomendada)',
          desc: 'Equilibrio perfecto entre la custodia del activo propio y la búsqueda planificada del capital rival.'
        };
    }
  };

  const ratings = getPanelRatings();

  const handleSimulateAction = () => {
    const actions = [
      '⚡ Incursión de Pareja 2: Superó la primera línea rival y presiona el capital ajeno.',
      '🛡️ Bloqueo defensivo exitoso: Pareja 1 repelió el intento de robo de la Empresa rival.',
      '🤝 Pase sincronizado en pareja: Cobertura perfecta sin cometer falta reglamentaria.',
      '🎯 ¡Captura exitosa!: El balón rival fue asegurado y viaja con escolta hacia la base propia.'
    ];
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    setTacticalLogs(prev => [randomAction, ...prev.slice(0, 4)]);
    
    if (randomAction.includes('Captura exitosa') && capitalCount === 1) {
      setCapitalCount(2);
    }
  };

  const handleResetLogs = () => {
    setCapitalCount(1);
    setTacticalLogs([
      'Simulador restablecido a condiciones de balance inicial.',
      'Base con 1 Balón de Capital disponible.'
    ]);
  };

  return (
    <section id="panel-empresa" className="py-24 bg-[#0a0d14] relative overflow-hidden text-white border-t border-white/[0.06]">
      {/* Glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-amber-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header with Enterprise Focus */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] text-amber-200 border border-amber-500/30 text-xs font-medium tracking-widest uppercase backdrop-blur-xl">
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-cormorant italic normal-case text-sm">Dashboard Directivo & Control Operativo</span>
          </div>

          <h2 className="font-serif italic text-4xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight">
            Panel de la <span className="font-serif italic text-amber-300">Empresa</span>
          </h2>
          <p className="font-cormorant italic text-xl sm:text-2xl text-slate-300/80 font-light max-w-2xl mx-auto">
            «Conexión en tiempo real entre los activos en juego y las métricas de rendimiento gerencial»
          </p>
        </div>

        {/* Company & Strategy Controls */}
        <div className="mt-12 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl">
          
          {/* Company Toggle */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-serif italic text-amber-200/70 uppercase tracking-widest mr-1">
              Corporación:
            </span>
            <button
              onClick={() => setSelectedCompany('A')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs sm:text-sm font-serif italic transition-all cursor-pointer ${
                selectedCompany === 'A'
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/20'
                  : 'bg-white/[0.03] text-slate-300 hover:text-white border border-white/10'
              }`}
            >
              🏢 Empresa A
            </button>
            <button
              onClick={() => setSelectedCompany('B')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs sm:text-sm font-serif italic transition-all cursor-pointer ${
                selectedCompany === 'B'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20'
                  : 'bg-white/[0.03] text-slate-300 hover:text-white border border-white/10'
              }`}
            >
              🏢 Empresa B
            </button>
          </div>

          {/* Strategy Presets */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setStrategyPreset('equilibrada')}
              className={`px-3 py-1.5 rounded-xl text-xs font-serif italic transition-all whitespace-nowrap cursor-pointer ${
                strategyPreset === 'equilibrada'
                  ? 'bg-amber-500 text-slate-950 font-medium shadow-md'
                  : 'bg-white/[0.03] text-slate-300 hover:text-white border border-white/10'
              }`}
            >
              Equilibrada (Estándar)
            </button>
            <button
              onClick={() => setStrategyPreset('conservadora')}
              className={`px-3 py-1.5 rounded-xl text-xs font-serif italic transition-all whitespace-nowrap cursor-pointer ${
                strategyPreset === 'conservadora'
                  ? 'bg-sky-500 text-slate-950 font-medium shadow-md'
                  : 'bg-white/[0.03] text-slate-300 hover:text-white border border-white/10'
              }`}
            >
              Defensa Patrimonial
            </button>
            <button
              onClick={() => setStrategyPreset('ofensiva')}
              className={`px-3 py-1.5 rounded-xl text-xs font-serif italic transition-all whitespace-nowrap cursor-pointer ${
                strategyPreset === 'ofensiva'
                  ? 'bg-emerald-500 text-slate-950 font-medium shadow-md'
                  : 'bg-white/[0.03] text-slate-300 hover:text-white border border-white/10'
              }`}
            >
              Expansión Rápida
            </button>
          </div>

        </div>

        {/* The Core Enterprise Executive Card */}
        <div className="mt-8 max-w-4xl mx-auto">
          <motion.div 
            whileHover={{ y: -3 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl bg-white/[0.02] border border-white/[0.09] p-7 sm:p-9 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative overflow-hidden"
          >
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Official Prompt Format Box */}
              <div className="md:col-span-7 space-y-6">
                
                {/* Header Title strictly matching: CAPITAL EN JUEGO */}
                <div className="border-b border-white/[0.08] pb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif italic text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-2 font-normal">
                      <span>CAPITAL EN JUEGO</span>
                    </h3>
                    <span className="text-xs px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-300 font-serif italic border border-amber-500/30">
                      EMPRESA {selectedCompany}
                    </span>
                  </div>
                  <p className="font-cormorant italic text-sm text-slate-400 mt-1">
                    Panel Ejecutivo de Rendimiento & Gestión Estratégica
                  </p>
                </div>

                {/* The 4 core lines requested by user */}
                <div className="space-y-3.5 bg-black/40 rounded-2xl p-5 border border-white/[0.06]">
                  
                  {/* 1. Capital disponible: ⚽ */}
                  <div className="flex items-center justify-between py-2.5 border-b border-white/[0.06]">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center text-sm">
                        💰
                      </span>
                      <span className="font-serif italic text-base sm:text-lg text-slate-100 font-normal">
                        Capital disponible:
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl tracking-wider filter drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                        {'⚽'.repeat(capitalCount)}
                      </span>
                      <span className="text-xs font-serif italic text-emerald-300 bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-500/30">
                        {capitalCount === 1 ? '1 Activo en Base' : '2 Activos (¡Adquisición!)'}
                      </span>
                    </div>
                  </div>

                  {/* 2. Estrategia: ⭐⭐⭐⭐ */}
                  <div className="flex items-center justify-between py-2.5 border-b border-white/[0.06]">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/30 flex items-center justify-center text-sm">
                        📊
                      </span>
                      <span className="font-serif italic text-base sm:text-lg text-slate-100 font-normal">
                        Estrategia:
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-lg text-amber-400 font-medium tracking-wider">
                        {'⭐'.repeat(ratings.estrategia)}
                      </span>
                      <span className="text-xs text-amber-200/70 font-mono">
                        ({ratings.estrategia}/5)
                      </span>
                    </div>
                  </div>

                  {/* 3. Trabajo en equipo: ⭐⭐⭐⭐⭐ */}
                  <div className="flex items-center justify-between py-2.5 border-b border-white/[0.06]">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/30 flex items-center justify-center text-sm">
                        🤝
                      </span>
                      <span className="font-serif italic text-base sm:text-lg text-slate-100 font-normal">
                        Trabajo en equipo:
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-lg text-amber-400 font-medium tracking-wider">
                        {'⭐'.repeat(ratings.trabajoEnEquipo)}
                      </span>
                      <span className="text-xs text-amber-200/70 font-mono">
                        ({ratings.trabajoEnEquipo}/5)
                      </span>
                    </div>
                  </div>

                  {/* 4. Organización: ⭐⭐⭐⭐ */}
                  <div className="flex items-center justify-between py-2.5">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 flex items-center justify-center text-sm">
                        🏢
                      </span>
                      <span className="font-serif italic text-base sm:text-lg text-slate-100 font-normal">
                        Organización:
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-lg text-amber-400 font-medium tracking-wider">
                        {'⭐'.repeat(ratings.organizacion)}
                      </span>
                      <span className="text-xs text-amber-200/70 font-mono">
                        ({ratings.organizacion}/5)
                      </span>
                    </div>
                  </div>

                </div>

                {/* Sub-note on Current Posture */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] text-xs text-slate-300 flex items-start gap-3">
                  <Sliders className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-serif italic text-amber-200 block text-sm font-normal">
                      Enfoque Actual: {ratings.name}
                    </span>
                    <span className="font-light text-slate-400">{ratings.desc}</span>
                  </div>
                </div>

              </div>

              {/* Right Column: Interactive Simulator & Audit Logs */}
              <div className="md:col-span-5 flex flex-col justify-between space-y-4 h-full">
                
                {/* Financial Health Status */}
                <div className="p-5 rounded-2xl bg-black/40 border border-white/[0.06] space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-serif italic text-slate-300 uppercase tracking-widest text-[11px]">
                      Estado Financiero / Deportivo
                    </span>
                    <span className="flex items-center gap-1 font-serif italic text-emerald-300 bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-500/30 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Solvente
                    </span>
                  </div>

                  {/* Progress Indicators */}
                  <div className="space-y-3 text-xs pt-1">
                    <div>
                      <div className="flex justify-between text-slate-300 font-light mb-1">
                        <span className="font-serif italic text-xs">Índice de Custodia (Defensa)</span>
                        <span className="font-mono text-emerald-300">92%</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full w-[92%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 font-light mb-1">
                        <span className="font-serif italic text-xs">Probabilidad de Incursión</span>
                        <span className="font-mono text-sky-300">78%</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-sky-500 to-blue-500 rounded-full w-[78%]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tactical Log Box */}
                <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-serif italic text-amber-200/90 tracking-wider text-[11px]">
                      Bitácora de Operaciones en Cancha
                    </span>
                    <button
                      onClick={handleResetLogs}
                      className="text-slate-400 hover:text-white transition-colors p-1 cursor-pointer"
                      title="Reiniciar bitácora"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-2 max-h-32 overflow-y-auto pr-1 text-xs">
                    {tacticalLogs.map((log, lIdx) => (
                      <div
                        key={lIdx}
                        className={`p-2.5 rounded-xl border text-[11px] leading-relaxed ${
                          lIdx === 0
                            ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200 font-medium'
                            : 'bg-white/[0.02] border-white/[0.04] text-slate-400 font-light'
                        }`}
                      >
                        {log}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Simulator Action Button */}
                <button
                  onClick={handleSimulateAction}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-serif italic text-base font-medium shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4" />
                  <span>Simular Jugada Estratégica</span>
                </button>

              </div>

            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
};
