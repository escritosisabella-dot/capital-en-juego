import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhatIsIt } from './components/WhatIsIt';
import { Objectives } from './components/Objectives';
import { AdminConcepts } from './components/AdminConcepts';
import { CompanyPanel } from './components/CompanyPanel';
import { HowToPlay } from './components/HowToPlay';
import { CompaniesComparison } from './components/CompaniesComparison';
import { Gallery } from './components/Gallery';
import { Learnings } from './components/Learnings';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('inicio');

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'inicio',
        'que-es',
        'objetivos',
        'conceptos',
        'panel-empresa',
        'como-se-juega',
        'empresas',
        'galeria',
        'aprendizajes'
      ];
      
      const scrollPosition = window.scrollY + 250;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      {/* Fixed Navigation Bar */}
      <Navbar activeSection={activeSection} />

      {/* Main Page Content */}
      <main className="flex-grow">
        {/* 1. Inicio */}
        <Hero />

        {/* 2. ¿Qué es Capital en Juego? */}
        <WhatIsIt />

        {/* 3. Objetivo */}
        <Objectives />

        {/* 4. Conceptos de Administración */}
        <AdminConcepts />

        {/* ⭐ Idea: Panel de la Empresa (Dashboard Estratégico) */}
        <CompanyPanel />

        {/* 5. ¿Cómo se juega? (Reglas paso a paso + Pizarra Táctica) */}
        <HowToPlay />

        {/* 6. Empresas (Empresa A y Empresa B) */}
        <CompaniesComparison />

        {/* 7. Galería (Fotos del juego, equipos, campo y actividades) */}
        <Gallery />

        {/* 8. Lo que aprendimos (Conclusión sobre competencia empresarial) */}
        <Learnings />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
