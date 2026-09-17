import { Target, Users, Brain, Coins, Compass, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { OBJECTIVES } from '../../data/gameData';

export const Objectives = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'UsersRound':
        return <Users className="w-5 h-5 text-sky-400" />;
      case 'Target':
        return <Brain className="w-5 h-5 text-emerald-400" />;
      case 'Coins':
        return <Coins className="w-5 h-5 text-amber-400" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-teal-400" />;
      default:
        return <Target className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section id="objetivos" className="py-24 bg-[#0a0d14] relative overflow-hidden text-white border-t border-white/[0.06]">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] text-amber-200 border border-amber-500/30 text-xs font-medium tracking-widest uppercase backdrop-blur-xl">
            <Target className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-cormorant italic normal-case text-sm">Metas Formativas de Alto Rendimiento</span>
          </div>

          <h2 className="font-serif italic text-4xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight">
            Objetivos de la <span className="font-serif italic text-amber-300">Actividad</span>
          </h2>
          <p className="font-cormorant italic text-xl sm:text-2xl text-slate-300/80 font-light max-w-2xl mx-auto">
            «Cuatro pilares esenciales que transforman el esfuerzo físico en competencias gerenciales aplicables»
          </p>
        </div>

        {/* 4 Cards strictly matching the 4 objectives with 3D Depth */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {OBJECTIVES.map((obj, index) => (
            <motion.div
              key={obj.id}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="p-7 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-amber-500/40 hover:bg-white/[0.04] backdrop-blur-xl transition-all shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:border-amber-500/40 transition-all">
                    {getIcon(obj.iconName)}
                  </div>
                  <span className="font-serif italic text-sm text-amber-300/80 border border-amber-500/30 bg-amber-950/30 px-3 py-0.5 rounded-full">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="font-serif italic text-xl text-white mb-2.5 leading-snug group-hover:text-amber-200 transition-colors font-normal">
                  {obj.title}
                </h3>

                <p className="text-sm text-slate-300/80 leading-relaxed font-light">
                  {obj.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center gap-2 text-xs font-serif italic text-emerald-300">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{obj.metricLabel}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
