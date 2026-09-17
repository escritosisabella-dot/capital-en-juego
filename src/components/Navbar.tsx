import { useState, useEffect } from 'react';
import { LayoutDashboard, Menu, X, ArrowRight, Shield, Download } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

export const Navbar = ({ activeSection }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#que-es', label: '¿Qué es?' },
    { href: '#objetivos', label: 'Objetivos' },
    { href: '#conceptos', label: 'Conceptos' },
    { href: '#como-se-juega', label: 'Reglas' },
    { href: '#empresas', label: 'Empresas' },
    { href: '#galeria', label: 'Galería' },
    { href: '#aprendizajes', label: 'Conclusión' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-slate-950/90 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] py-3'
          : 'bg-gradient-to-b from-slate-950/90 via-slate-950/40 to-transparent backdrop-blur-sm py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand & Slogan in Elegant Cursive Typography */}
          <a
            href="#inicio"
            className="flex items-center gap-3.5 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-emerald-500/10 flex items-center justify-center shadow-[0_0_20px_rgba(234,179,8,0.12)] group-hover:border-amber-400/60 transition-all p-1.5 overflow-hidden">
              <img src="/logo-transparent.png" alt="Logo Capital en Juego" className="w-full h-full object-contain group-hover:scale-110 transition-transform" referrerPolicy="no-referrer" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif italic font-medium text-xl sm:text-2xl text-white tracking-normal leading-none group-hover:text-amber-100 transition-colors">
                  Capital en <span className="font-serif italic text-emerald-400">Juego</span>
                </span>
                <span className="text-[9px] font-sans uppercase tracking-[0.2em] px-2 py-0.5 rounded-full border border-amber-500/30 text-amber-300/90 bg-amber-950/30 hidden sm:inline-block">
                  Edición Gerencial
                </span>
              </div>
              <p className="font-cormorant italic text-xs tracking-wide text-slate-300/90 mt-1 leading-none group-hover:text-amber-200 transition-colors">
                «La estrategia también juega»
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'text-amber-200 bg-white/[0.06] border border-amber-500/30 font-medium shadow-[0_0_12px_rgba(234,179,8,0.15)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Luxury Action button */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="/downloads/capital-en-juego.zip"
              download="capital-en-juego.zip"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-amber-500/40 bg-amber-950/40 hover:bg-amber-900/60 text-amber-200 text-xs font-medium tracking-wider uppercase transition-all duration-300 shadow-[0_0_15px_rgba(234,179,8,0.15)] hover:border-amber-400"
              title="Descargar paquete completo HTML, CSS, JS y Logos"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Descargar (.ZIP)</span>
            </a>

            <a
              href="#panel-empresa"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/40 bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-200 text-xs font-medium tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:border-emerald-400/70"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
              <span>Panel Gerencial</span>
            </a>
          </div>

          {/* Mobile triggers */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href="#panel-empresa"
              className="p-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 text-emerald-300"
              title="Panel Gerencial"
            >
              <LayoutDashboard className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full border border-white/10 bg-white/[0.03] text-slate-300 hover:text-white"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 pb-4 px-3 border border-white/10 bg-slate-950/95 backdrop-blur-2xl rounded-2xl shadow-2xl space-y-1">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs uppercase tracking-widest px-4 py-2.5 rounded-xl text-slate-300 hover:text-amber-200 hover:bg-white/[0.05] transition-colors flex items-center justify-between"
                >
                  <span className="font-serif italic text-sm">{link.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </a>
              ))}
              <div className="pt-2 border-t border-white/10 space-y-2">
                <a
                  href="/downloads/capital-en-juego.zip"
                  download="capital-en-juego.zip"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-full border border-amber-500/40 bg-amber-950/60 text-amber-200 text-xs uppercase tracking-wider font-medium"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Descargar Código (.ZIP)</span>
                </a>

                <a
                  href="#panel-empresa"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-full border border-emerald-500/40 bg-emerald-950/60 text-emerald-200 text-xs uppercase tracking-wider font-medium"
                >
                  <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                  <span>Acceder al Panel Gerencial</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
