import { AdminConcept, ObjectiveItem, GameRule, CompanyProfile, GalleryItem } from '../types';

export const ADMIN_CONCEPTS: AdminConcept[] = [
  {
    id: 'capital',
    name: 'Capital',
    emoji: '💰',
    shortDesc: 'El recurso vital que sustenta la supervivencia y crecimiento de la organización.',
    businessContext: 'Representa los activos financieros, materiales y humanos indispensables para operar en el mercado. Perderlo significa la quiebra.',
    gameContext: 'El balón oficial asignado. Si el adversario lo sustrae, tu empresa pierde liquidez y queda al borde de la eliminación.',
    iconName: 'Coins',
    color: 'from-amber-500/15 via-orange-500/10 to-amber-500/5 text-amber-600 border-amber-300 bg-amber-50/50'
  },
  {
    id: 'estrategia',
    name: 'Estrategia',
    emoji: '📊',
    shortDesc: 'El plan maestro deliberado para anticipar al rival y maximizar ventajas competitivas.',
    businessContext: 'Definición de objetivos, posicionamiento de marca, segmentación y asignación óptima de recursos limitados.',
    gameContext: 'Planificar si avanzar en bloque, presionar las líneas rivales o tender una trampa táctica para recuperar el balón ajeno.',
    iconName: 'TrendingUp',
    color: 'from-sky-500/15 via-blue-500/10 to-sky-500/5 text-sky-600 border-sky-300 bg-sky-50/50'
  },
  {
    id: 'trabajo-en-equipo',
    name: 'Trabajo en equipo',
    emoji: '🤝',
    shortDesc: 'Sinergia donde el resultado conjunto supera la suma de esfuerzos individuales.',
    businessContext: 'Colaboración transversal entre áreas, comunicación asertiva y confianza mutua para alcanzar metas compartidas.',
    gameContext: 'Desplazamiento sincronizado en parejas obligatorias; si uno se descoordina, la defensa colapsa y el capital queda expuesto.',
    iconName: 'Users',
    color: 'from-emerald-500/15 via-teal-500/10 to-emerald-500/5 text-emerald-600 border-emerald-300 bg-emerald-50/50'
  },
  {
    id: 'organizacion',
    name: 'Organización',
    emoji: '🏢',
    shortDesc: 'Estructuración clara de roles, responsabilidades y líneas de acción.',
    businessContext: 'Organigrama funcional, delegación eficiente de autoridad y alineación de funciones operativas.',
    gameContext: 'División precisa del equipo en parejas de custodia (defensa de base) y parejas de incursión (captura del capital rival).',
    iconName: 'Building2',
    color: 'from-indigo-500/15 via-blue-500/10 to-indigo-500/5 text-indigo-600 border-indigo-300 bg-indigo-50/50'
  },
  {
    id: 'competencia',
    name: 'Competencia',
    emoji: '⚡',
    shortDesc: 'La rivalidad directa en el mercado donde cada acción genera una reacción del oponente.',
    businessContext: 'Fuerzas de Porter, presión de competidores directos, amenazas de sustitutos y necesidad de diferenciación continua.',
    gameContext: 'La empresa rival está constantemente estudiando tus puntos ciegos para robarte el balón y conquistar tu base.',
    iconName: 'Zap',
    color: 'from-orange-500/15 via-red-500/10 to-orange-500/5 text-orange-600 border-orange-300 bg-orange-50/50'
  },
  {
    id: 'toma-de-decisiones',
    name: 'Toma de decisiones',
    emoji: '🧠',
    shortDesc: 'Evaluación ágil de riesgos y selección de la alternativa óptima bajo presión.',
    businessContext: 'Respuestas ejecutivas en entornos inciertos (VUCA) donde demorar una decisión implica costo de oportunidad.',
    gameContext: 'Decidir en milisegundos si salir a interceptar, replantear la cobertura o proteger el activo en la base propia.',
    iconName: 'Brain',
    color: 'from-violet-500/15 via-purple-500/10 to-violet-500/5 text-violet-600 border-violet-300 bg-violet-50/50'
  }
];

export const OBJECTIVES: ObjectiveItem[] = [
  {
    id: 'obj-1',
    title: 'Desarrollar el trabajo en equipo',
    desc: 'Fomentar la cohesión activa y la comunicación directa al operar permanentemente en parejas interconectadas.',
    iconName: 'UsersRound',
    metricLabel: '100% Sinergia en Cancha'
  },
  {
    id: 'obj-2',
    title: 'Practicar la toma de decisiones',
    desc: 'Ejercitar la agilidad mental para elegir cuándo presionar, replegarse o arriesgar en situaciones de alta presión.',
    iconName: 'Target',
    metricLabel: 'Decisiones en Tiempo Real'
  },
  {
    id: 'obj-3',
    title: 'Comprender la importancia del capital',
    desc: 'Experimentar de forma tangible cómo un descuido en la protección de los recursos clave puede costar la partida completa.',
    iconName: 'Coins',
    metricLabel: 'Custodia de Activos Críticos'
  },
  {
    id: 'obj-4',
    title: 'Aplicar estrategias de competencia',
    desc: 'Diseñar planes de ataque y defensa adaptables a los movimientos y tácticas de la empresa adversaria.',
    iconName: 'Compass',
    metricLabel: 'Ventaja Competitiva Dinámica'
  }
];

export const GAME_RULES: GameRule[] = [
  {
    step: 1,
    title: 'Se forman dos empresas',
    description: 'Los participantes se dividen en dos corporaciones rivales (Empresa A y Empresa B). Cada una nombra su directorio táctico y establece su base de operaciones en extremos opuestos del campo.',
    tacticalNote: 'Definir filosofía corporativa: ¿seremos una organización conservadora y protectora o agresiva y expansiva?'
  },
  {
    step: 2,
    title: 'Cada empresa tiene un balón que representa su capital',
    description: 'El balón oficial es el activo financiero más valioso de la compañía. Se ubica inicialmente en la bóveda o base corporativa de cada equipo.',
    tacticalNote: 'El capital es finito: si lo pierdes, tu capacidad operativa queda anulada.'
  },
  {
    step: 3,
    title: 'Los jugadores trabajan en parejas',
    description: 'Nadie opera de forma aislada. Cada integrante debe coordinar movimientos con su pareja designada (sinergia interdepartamental), manteniendo comunicación constante.',
    tacticalNote: 'La fuerza de una empresa depende de la solidez de sus alianzas internas.'
  },
  {
    step: 4,
    title: 'Cada equipo protege su capital',
    description: 'Las parejas asignadas a la custodia deben bloquear las líneas de avance contrarias sin cometer infracciones, salvaguardando el balón en la base.',
    tacticalNote: 'Un descuido de dos segundos permite que la competencia capture tu activo principal.'
  },
  {
    step: 5,
    title: 'Se intenta tomar el balón rival',
    description: 'Las parejas de expansión cruzan al territorio enemigo con maniobras rápidas de desmarque y desvío para sustraer el balón de la empresa contraria.',
    tacticalNote: 'Incursión de mercado: alto riesgo pero necesaria para alcanzar el liderazgo comercial.'
  },
  {
    step: 6,
    title: 'Gana quien consiga llevar el capital rival hasta su base',
    description: 'La victoria empresarial se declara cuando un equipo logra recuperar el balón del competidor y transportarlo de forma segura y controlada hasta su propia sede corporativa.',
    tacticalNote: 'Fusión por adquisición: has consolidado el doble de capital en tu balance general.'
  }
];

export const COMPANIES_DATA: CompanyProfile[] = [
  {
    id: 'empresa-a',
    name: 'Empresa A 🏢',
    tag: 'Corporación Azul / Visión Patrimonial',
    badgeColor: 'border-sky-300 bg-sky-50 text-sky-700',
    capital: '⚽ 1 Balón de Capital Inicial',
    capitalCount: 1,
    mission: 'Proteger el capital patrimonial propio en la base y conseguir el capital del equipo contrario mediante un balance defensivo y contragolpe quirúrgico.',
    strategyStars: 4,
    teamworkStars: 5,
    organizationStars: 4,
    tacticalStyle: 'Defensa escalonada con desdoble rápido por bandas.',
    keyPairs: [
      { role: 'Pareja Custodia (Finanzas)', focus: 'Blindaje perimetral del balón en base propia.' },
      { role: 'Pareja Expansión (Comercial)', focus: 'Presión al activo rival e intercepción rápida.' }
    ]
  },
  {
    id: 'empresa-b',
    name: 'Empresa B 🏢',
    tag: 'Corporación Naranja / Enfoque Expansivo',
    badgeColor: 'border-orange-300 bg-orange-50 text-orange-700',
    capital: '⚽ 1 Balón de Capital Inicial',
    capitalCount: 1,
    mission: 'Proteger el capital patrimonial propio en la base y conseguir el capital del equipo contrario mediante presión alta continua y desgaste del adversario.',
    strategyStars: 5,
    teamworkStars: 4,
    organizationStars: 4,
    tacticalStyle: 'Presión asfixiante en campo rival y transición veloz.',
    keyPairs: [
      { role: 'Pareja Custodia (Operaciones)', focus: 'Vigilancia activa y anticipación de incursiones.' },
      { role: 'Pareja Expansión (Innovación)', focus: 'Ataque sincronizado para extraer el activo rival.' }
    ]
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'La Cancha Táctica y Bases Corporativas',
    category: 'campo',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1000&q=80',
    caption: 'Distribución espacial del campo: dos mitades empresariales claramente delimitadas con sus zonas de capital.'
  },
  {
    id: 'gal-2',
    title: 'Coordinación Estratégica en Parejas',
    category: 'equipos',
    imageUrl: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1000&q=80',
    caption: 'Las duplas operan con sincronización constante: uno cubre el flanco mientras el compañero sostiene la posesión.'
  },
  {
    id: 'gal-3',
    title: 'La Disputa por el Capital Rival',
    category: 'accion',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1000&q=80',
    caption: 'El momento cumbre de la incursión: recuperar el balón adversario sin descuidar el retorno a la base.'
  },
  {
    id: 'gal-4',
    title: 'Pizarra de Estrategia Gerencial',
    category: 'estrategia',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80',
    caption: 'Tiempo fuera táctico: los equipos analizan fallas en la cobertura y rediseñan su plan de acción para la siguiente ronda.'
  },
  {
    id: 'gal-5',
    title: 'Celebración Corporativa y Logro de Objetivos',
    category: 'equipos',
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1000&q=80',
    caption: 'El equipo consolida la victoria al ingresar con ambos capitales en su sede, demostrando máxima cohesión.'
  },
  {
    id: 'gal-6',
    title: 'Toma de Decisiones en Plena Jugada',
    category: 'accion',
    imageUrl: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1000&q=80',
    caption: 'Lectura veloz del movimiento del rival: repliegue de emergencia o pase filtrado para el triunfo.'
  }
];
