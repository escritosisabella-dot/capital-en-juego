import { Brain, Lightbulb, CheckCircle2, TrendingUp, ShieldAlert, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const Learnings = () => {
  const takeaways = [
    {
      title: 'El Capital es Frágil sin Protección',
      description: 'Tener recursos no garantiza la perpetuidad si no existe un sistema riguroso de custodia. En la empresa real, descuidar la liquidez o los activos estratégicos conduce a la quiebra.',
      icon: <ShieldAlert className="w-5 h-5 text-amber-400" />
    },
    {
      title: 'El Peligro de la Sobreexpansión',
      description: 'Lanzar a todos los miembros a la cancha rival deja tu base desprotegida. Crecer agresivamente en el mercado sin consolidar la retaguardia operativa engendra vulnerabilidad crítica.',
      icon: <TrendingUp className="w-5 h-5 text-rose-400" />
    },
    {
      title: 'Sinergia Real vs Esfuerzo Individual',
      description: 'El ejecutor más veloz fracasa si no sincroniza el pase con su contraparte. Las organizaciones de élite prosperan por la cohesión interdepartamental, nunca por individualismos.',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />
    },
    {
      title: 'Decisiones Bajo Presión Competitiva',
      description: 'La fatiga física y el reloj simulan los cierres trimestrales y las crisis de mercado. Aprender a discernir con serenidad estratégica es la mayor maestría gerencial.',
      icon: <Brain className="w-5 h-5 text-sky-400" />
    }
  ];

  return (
    <section id="aprendizajes" className="py-24 bg-[#07090e] relative overflow-hidden text-white border-t border-white/[0.06]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-amber-950/15 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] text-amber-200 border border-amber-500/30 text-xs font-medium tracking-widest uppercase backdrop-blur-xl">
            <Brain className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-cormorant italic normal-case text-sm">Síntesis y Maestría Gerencial</span>
          </div>

          <h2 className="font-serif italic text-4xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight">
            Lo que <span className="font-serif italic text-amber-300">aprendimos</span>
          </h2>
          <p className="font-cormorant italic text-xl sm:text-2xl text-slate-300/80 font-light max-w-2xl mx-auto">
            «Una reflexión profunda sobre cómo la dinámica del juego refleja con fidelidad la competencia empresarial en el mundo real»
          </p>
        </div>

        {/* Main Concluding Thought Banner */}
        <motion.div
          whileHover={{ y: -4, scale: 1.005 }}
          transition={{ duration: 0.3 }}
          className="mt-14 p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.08] relative overflow-hidden backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
        >
          <div className="flex items-start gap-5 sm:gap-7">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center justify-center shrink-0 text-2xl shadow-[0_0_25px_rgba(245,158,11,0.2)]">
              💡
            </div>
            <div className="space-y-3.5">
              <h3 className="font-serif italic text-2xl sm:text-3xl text-white font-normal leading-snug">
                Cómo el juego representa la competencia empresarial moderna
              </h3>
              <p className="font-cormorant italic text-lg sm:text-xl text-slate-200 leading-relaxed font-light">
                <strong className="text-amber-300 font-normal">Capital en Juego</strong> demuestra que una organización no triunfa por volumen o impulsividad, sino por la lucidez de su <span className="text-emerald-300 underline decoration-emerald-500/40 underline-offset-4">organización</span> y la templanza de su <span className="text-emerald-300 underline decoration-emerald-500/40 underline-offset-4">estrategia</span>. En el campo, como en el mercado abierto, el capital representa la viabilidad patrimonial: salir a competir descuidando lo propio es una apuesta suicida; encerrarse sin audacia conduce a la irrelevancia.
              </p>
              <p className="font-cormorant italic text-base sm:text-lg text-amber-200/80 pt-3 border-t border-white/[0.08] font-light">
                “La victoria en los negocios y en el deporte pertenece a los equipos capaces de sincronizar talentos, leer las intenciones del competidor y decidir con audacia en fracciones de segundo.”
              </p>
            </div>
          </div>
        </motion.div>

        {/* 4 Key Takeaways with 3D Depth */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {takeaways.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="p-7 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-amber-500/40 transition-all flex flex-col justify-between backdrop-blur-xl group shadow-lg"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-inner">
                  {item.icon}
                </div>
                <h4 className="font-serif italic text-xl text-white mb-2.5 font-normal group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
