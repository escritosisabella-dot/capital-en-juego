import { useState } from 'react';
import { Camera, Eye, Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_ITEMS } from '../../data/gameData';
import { GalleryItem } from '../../types';

export const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'todas', label: 'Todas las fotos' },
    { id: 'campo', label: 'El Campo' },
    { id: 'equipos', label: 'Los Equipos' },
    { id: 'estrategia', label: 'Pizarra & Estrategia' },
    { id: 'accion', label: 'Actividades & Juego' },
  ];

  const filteredItems = selectedCategory === 'todas'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section id="galeria" className="py-24 bg-[#0a0d14] relative overflow-hidden text-white border-t border-white/[0.06]">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-emerald-950/15 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] text-amber-200 border border-amber-500/30 text-xs font-medium tracking-widest uppercase backdrop-blur-xl">
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-cormorant italic normal-case text-sm">Registro Gráfico de Élite</span>
          </div>

          <h2 className="font-serif italic text-4xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight">
            Galería de <span className="font-serif italic text-emerald-400">Actividades</span>
          </h2>
          <p className="font-cormorant italic text-xl sm:text-2xl text-slate-300/80 font-light max-w-2xl mx-auto">
            «Testimonio visual del despliegue táctico, la demarcación del campo y la intensidad del juego gerencial»
          </p>
        </div>

        {/* Filter categories */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-xs font-serif italic tracking-wider transition-all cursor-pointer backdrop-blur-md ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-medium shadow-lg shadow-amber-500/20'
                  : 'bg-white/[0.03] text-slate-300 hover:text-white border border-white/[0.08] hover:bg-white/[0.06]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid with 3D Depth */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-white/[0.02] border border-white/[0.08] hover:border-amber-500/40 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl relative"
            >
              <div className="relative h-64 sm:h-72 overflow-hidden bg-[#06080d]">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/30 to-transparent opacity-80 group-hover:opacity-50 transition-opacity" />
                
                {/* View zoom icon button */}
                <div className="absolute top-4 right-4 p-2.5 rounded-2xl bg-black/60 backdrop-blur-md text-amber-300 border border-white/10 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-4 h-4" />
                </div>

                <div className="absolute bottom-4 left-5 right-5">
                  <span className="text-[10px] font-serif italic uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 border border-amber-500/30 backdrop-blur-md shadow-sm">
                    {item.category}
                  </span>
                  <h4 className="font-serif italic text-lg sm:text-xl text-white mt-2 line-clamp-1 font-normal">
                    {item.title}
                  </h4>
                </div>
              </div>

              <div className="p-5 bg-black/30 border-t border-white/[0.04]">
                <p className="font-cormorant italic text-sm sm:text-base text-slate-300/80 line-clamp-2 leading-relaxed font-light">
                  {item.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal with Luxury Styling */}
        <AnimatePresence>
          {activePhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl"
              onClick={() => setActivePhoto(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="relative max-w-3xl w-full bg-[#0d111a] border border-white/15 rounded-3xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setActivePhoto(null)}
                  className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/70 text-white hover:bg-black transition-colors cursor-pointer border border-white/10"
                  aria-label="Cerrar modal"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="max-h-[60vh] sm:max-h-[70vh] overflow-hidden bg-black flex items-center justify-center">
                  <img
                    src={activePhoto.imageUrl}
                    alt={activePhoto.title}
                    className="w-full h-auto max-h-[60vh] sm:max-h-[70vh] object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="p-7 bg-[#0a0d14] space-y-2 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-serif italic uppercase tracking-wider px-3 py-0.5 rounded-full bg-amber-500/15 text-amber-200 border border-amber-500/30">
                      {activePhoto.category}
                    </span>
                    <h3 className="font-serif italic text-2xl text-white font-normal">
                      {activePhoto.title}
                    </h3>
                  </div>
                  <p className="font-cormorant italic text-base sm:text-lg text-slate-300 font-light leading-relaxed">
                    {activePhoto.caption}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
