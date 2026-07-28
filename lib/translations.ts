export type Locale = "es" | "en";

const translations = {
  // ─── Navbar ───
  "nav.about": { es: "Sobre mí", en: "About" },
  "nav.experience": { es: "Experiencia", en: "Experience" },
  "nav.featured": { es: "Campañas", en: "Work" },
  "nav.achievements": { es: "Logros", en: "Impact" },
  "nav.skills": { es: "Skills", en: "Skills" },
  "nav.education": { es: "Educación", en: "Education" },
  "nav.contact": { es: "Contacto", en: "Contact" },
  "nav.cta": { es: "Hablemos", en: "Let's talk" },
  "nav.menuOpen": { es: "Abrir menú", en: "Open menu" },
  "nav.menuClose": { es: "Cerrar menú", en: "Close menu" },

  // ─── Hero ───
  "hero.available": {
    es: "Abierto a nuevas oportunidades",
    en: "Open to new opportunities",
  },
  "hero.role": {
    es: "Production & Operations Manager · Prime Video International",
    en: "Production & Operations Manager · Prime Video International",
  },
  "hero.tagline": {
    es: "Ingeniero Industrial y de Sistemas con 3+ años en Amazon. Escalo operaciones de producción y campañas comerciales a través de Latinoamérica, Europa y Canadá — donde la estrategia se vuelve proceso.",
    en: "Industrial & Systems Engineer with 3+ years at Amazon. I scale production operations and commercial campaigns across Latin America, Europe, and Canada — where strategy becomes process.",
  },
  "hero.cta": { es: "Ver mi impacto", en: "See my impact" },
  "hero.downloadCv": { es: "Descargar CV", en: "Download CV" },
  "hero.workedAt": { es: "Experiencia en", en: "Experience at" },
  "hero.stat.assets": { es: "Assets producidos", en: "Assets produced" },
  "hero.stat.campaigns": { es: "Campañas entregadas", en: "Campaigns delivered" },
  "hero.stat.gms": { es: "USD en ventas gestionadas", en: "USD in managed sales" },
  "hero.stat.years": { es: "Años en Amazon", en: "Years at Amazon" },

  // Quick facts (tarjetas del Hero)
  "hero.info.role": { es: "Rol actual", en: "Current role" },
  "hero.info.roleValue": { es: "Production Manager", en: "Production Manager" },
  "hero.info.roleSub": {
    es: "Prime Video International · Amazon",
    en: "Prime Video International · Amazon",
  },
  "hero.info.education": { es: "Educación", en: "Education" },
  "hero.info.educationValue": {
    es: "Ing. Industrial y de Sistemas",
    en: "B.S. Industrial & Systems Eng.",
  },
  "hero.info.educationSub": {
    es: "Tec de Monterrey · + IPAG Business School, París",
    en: "Tec de Monterrey · + IPAG Business School, Paris",
  },
  "hero.info.scope": { es: "Alcance", en: "Scope" },
  "hero.info.scopeValue": {
    es: "LatAm · Europa · Canadá",
    en: "LatAm · Europe · Canada",
  },
  "hero.info.languages": { es: "Idiomas", en: "Languages" },
  "hero.info.languagesValue": {
    es: "Español nativo · Inglés profesional",
    en: "Native Spanish · Professional English",
  },

  // ─── About ───
  "about.kicker": { es: "Sobre mí", en: "About me" },
  "about.title": { es: "Operaciones que escalan.", en: "Operations that scale." },
  "about.intro": {
    es: "Soy Ingeniero Industrial y de Sistemas con 3+ años en Amazon, donde he combinado pensamiento estratégico, criterio comercial y excelencia operativa. Hoy dirijo las operaciones de producción de TVOD y Channels en Prime Video International, con responsabilidad end-to-end sobre Latinoamérica, Europa y Canadá.",
    en: "I'm an Industrial & Systems Engineer with 3+ years at Amazon, combining strategic thinking, commercial acumen, and operational excellence. Today I lead TVOD and Channels production operations at Prime Video International, owning end-to-end delivery across Latin America, Europe, and Canada.",
  },
  "about.intro2": {
    es: "Antes de producción llevé una cuenta de $13.8MM USD como Vendor Manager, diseñé campañas de marketing que triplicaron el CTR promedio del sitio, y lideré proyectos de producto en Amazon Softlines México. Me muevo cómodo en entornos rápidos y ambiguos — negociando acuerdos comerciales, optimizando flujos de trabajo o lanzando campañas regionales desde cero.",
    en: "Before production I ran a $13.8MM USD account as Vendor Manager, designed marketing campaigns that tripled the site-wide average CTR, and led product initiatives at Amazon Softlines Mexico. I'm comfortable in fast-paced, ambiguous environments — negotiating commercial deals, optimizing workflows, or launching regional campaigns from scratch.",
  },
  "about.bullets": {
    es: [
      "Entregué 51,294 assets (+70.4% interanual) soportando 1,184 campañas, reduciendo la tasa de urgencias de 5.0% a 3.9%.",
      "Escalé una cuenta a $13.8MM USD en Gross Merchandise Sales (+72.04% interanual, +42% sobre objetivo).",
      "Comunicador cross-functional entre agencias de diseño, marketing y partners en tres regiones.",
      "Ingeniero Industrial y de Sistemas por el Tec de Monterrey, con formación en negocios en IPAG Business School (París).",
    ],
    en: [
      "Delivered 51,294 assets (+70.4% YoY) supporting 1,184 campaigns, cutting the rush rate from 5.0% to 3.9%.",
      "Scaled an account to $13.8MM USD in Gross Merchandise Sales (+72.04% YoY, +42% vs. goal).",
      "Cross-functional communicator across design agencies, marketing teams, and partners in three regions.",
      "Industrial & Systems Engineer from Tec de Monterrey, with business training at IPAG Business School (Paris).",
    ],
  },

  // ─── Experiencia ───
  "experience.kicker": { es: "Experiencia", en: "Experience" },
  "experience.title": { es: "Experiencia laboral.", en: "Work experience." },
  "experience.expand": { es: "Ver más detalle", en: "See more detail" },
  "experience.collapse": { es: "Ocultar detalle", en: "Hide detail" },
  "experience.stackLabel": { es: "Competencias", en: "Competencies" },
  "experience.items": {
    es: [
      {
        role: "Production Manager",
        company: "Amazon · Prime Video International",
        period: "Dic 2024 — Presente",
        description:
          "Production Manager de TVOD y Channels/Subscriptions. Escalé la producción de assets dentro de Prime Video International (PVI), con responsabilidad end-to-end sobre las operaciones de producción en Latinoamérica, Europa y Canadá.",
        metrics: [
          "51,294 assets (+70.4% YoY)",
          "1,184 campañas (+25.8% YoY)",
          "Rush rate 5.0% → 3.9%",
          "3 regiones",
        ],
        highlights: [
          "Lideré la iniciativa de estandarización del proceso de producción de TVOD tras la integración de marketing entre Europa y Latinoamérica/Canadá — redactando el documento unificado de workflow y alineando a múltiples stakeholders (agencia de diseño, marketing managers, partner managers) en una sola forma de trabajar entre regiones.",
          "Dirijo el piloto para internalizar la producción de assets de Eventos en la agencia interna de Europa, migrando de un modelo de diseñador único a un proceso escalable.",
          "Entregué 51,294 assets (+70.4% interanual) soportando 1,184 campañas (+25.8% interanual), reduciendo la tasa de urgencias de 5.0% a 3.9% mediante optimización del flujo de trabajo.",
          "Fui el enlace principal entre Amazon Music y Prime Video para colaboraciones de alto perfil, coordinando la entrega cross-functional del livestream de Vive Latino 2025 y Bad Bunny, con 9M+ de espectadores activos.",
          "Estandaricé la producción de plantillas y optimicé los paquetes de assets del marketplace, logrando ~10% de reducción de desperdicio y simplificando la comunicación cross-team al eliminar pasos intermedios.",
          "Ejecuté campañas regionales complejas en Latinoamérica, Canadá y ANZ — navegando procesos de aprobación multi-estudio y estándares de compliance (Apple TV+, HBO Max, Globo, Crunchyroll, Universal+, MGM+, Paramount+, Mubi, entre otros) con precisión perfecta y tiempos ajustados.",
        ],
      },
      {
        role: "Vendor Manager | Brand Specialist",
        company: "Amazon",
        period: "Feb 2024 — Dic 2024",
        description:
          "Gestioné una marca líder de Amazon Fashion para impulsar crecimiento y entregar una experiencia de cliente de primer nivel en Amazon.com.mx.",
        metrics: [
          "$13.8MM USD GMS",
          "+72.04% YoY",
          "+42% vs objetivo",
          "CM 2.32 (+9.55%)",
        ],
        highlights: [
          "Superé los objetivos de Gross Merchandise Sales de la cuenta ($13.8MM USD, +72.04% interanual, +42% sobre objetivo) manteniendo un Contribution Margin de 2.32 (+9.55% interanual).",
          "Automaticé ~50% de las órdenes de compra mediante cambios en la estrategia de catálogo, reduciendo entregas tardías y rechazos de órdenes.",
          "Expandí la selección incorporando ~3,000 nuevos listings de producto, identificando y resolviendo problemas de precio.",
          "Lideré las presentaciones a proveedores y fui el punto de contacto principal, gestionando la relación comercial end-to-end.",
        ],
      },
      {
        role: "Marketing Specialist",
        company: "Amazon",
        period: "Feb 2024 — Dic 2024",
        description:
          "Responsable de los canales de comunicación outbound e inbound del grupo de negocio Amazon Softlines.",
        metrics: [
          "3× el CTR del sitio",
          "~200,000 clientes/semana",
          "30+ campañas/mes",
        ],
        highlights: [
          "Entregué campañas de homepage que consistentemente alcanzaron 3× el CTR promedio del sitio (11.7%–13.5% vs. benchmark de 4.3%) durante los eventos de alta visibilidad de Q4, ubicándome como el contribuidor de mayor engagement entre todos los grupos de negocio.",
          "Gestioné 3 campañas outbound semanales alcanzando ~200,000 clientes, y 30+ campañas de marca mensuales alcanzando ~25,000 clientes cada una, además de emplazamientos mensuales en gateway (hero banners, mobile dashboards, quick cards) que llegaron a 1–2M de clientes reconocidos por emplazamiento.",
          "Optimicé los segmentos de cliente para mejorar el targeting y el Click-Through Rate en email y notificaciones push.",
          "Guié el proyecto de lifecycle para atraer nuevos clientes a Amazon Fashion, reducir el porcentaje de clientes inactivos e incrementar las tasas de conversión.",
        ],
      },
      {
        role: "Product Management Specialist",
        company: "Amazon",
        period: "Ago 2023 — Feb 2024",
        description:
          "Responsable de los proyectos relacionados con Size & Fit en Amazon Softlines para el marketplace de México.",
        metrics: ["−1 a 2% en devoluciones", "Equipo de 3", "Cross-border"],
        highlights: [
          "Lideré iniciativas de tallaje que redujeron las tasas de devolución de producto entre 1% y 2%, mejorando la experiencia del cliente y reduciendo costos operativos.",
          "Incorporé con éxito proyectos internacionales de mejora de experiencia de cliente al marketplace de México, liderando la implementación cross-border con múltiples stakeholders.",
          "Lideré un equipo de 3 personas en un proyecto de mejora continua para optimizar el customer journey.",
          "Generé mecanismos y procedimientos estandarizados para optimizar procesos operativos de calidad de datos interna.",
        ],
      },
      {
        role: "Marketing & Business Development Intern",
        company: "Shoplogix Latam",
        period: "May 2022 — Sep 2022",
        description:
          "Prácticas en el equipo de marketing y desarrollo de negocio de Shoplogix, plataforma de analítica de manufactura (OEE). Apoyé la generación de oportunidades comerciales para el mercado de Latinoamérica.",
        metrics: ["I+D de mercado", "Desarrollo de negocio", "LatAm"],
        highlights: [
          "Realicé investigación y desarrollo (I+D) de mercado para identificar oportunidades comerciales en el sector de manufactura en Latinoamérica.",
          "Preparé y apoyé presentaciones de ventas para prospectos, traduciendo las capacidades técnicas de la plataforma en propuestas de valor claras.",
          "Colaboré con el equipo de desarrollo de negocio en la generación y calificación de prospectos para el mercado LatAm.",
        ],
      },
      {
        role: "Consultor de Logística",
        company: "Coppel S.A. de C.V.",
        period: "Feb 2021 — Jun 2021",
        description:
          "Servicio de consultoría logística para una de las mayores cadenas de retail de México, aplicando metodología Six Sigma sobre las operaciones de sus centros de distribución.",
        metrics: ["Six Sigma", "Centros de distribución", "Retail"],
        highlights: [
          "Apliqué metodología Six Sigma para identificar oportunidades de mejora en las operaciones de los centros de distribución.",
          "Optimicé costos y tiempos de entrega (lead time) del servicio de entrega a domicilio.",
          "Desarrollé estrategias logísticas para los procesos de acomodo de prendas.",
          "Generé soluciones innovadoras para las operaciones de batching (agrupación de pedidos).",
        ],
      },
    ],
    en: [
      {
        role: "Production Manager",
        company: "Amazon · Prime Video International",
        period: "Dec 2024 — Present",
        description:
          "Production Manager for TVOD and Channels/Subscriptions. Scaled asset production within Prime Video International (PVI) — owning end-to-end production operations across Latin America, Europe, and Canada.",
        metrics: [
          "51,294 assets (+70.4% YoY)",
          "1,184 campaigns (+25.8% YoY)",
          "Rush rate 5.0% → 3.9%",
          "3 regions",
        ],
        highlights: [
          "Led the TVOD production process standardization initiative following the PVI marketing integration between EU and Latin America/Canada regions — authoring the unified production workflow document and aligning multiple stakeholders (design agency, marketing managers, partner managers) into a single way of working across both regions.",
          "Currently leading the pilot to onboard Events asset production into the internal agency for EU, transitioning from a single-designer model to a scalable production process.",
          "Delivered 51,294 assets (+70.4% year-over-year) supporting 1,184 campaigns (+25.8% year-over-year), while reducing rush rate from 5.0% to 3.9% through workflow optimization.",
          "Served as primary liaison between Amazon Music and Prime Video for high-visibility partnerships, coordinating cross-functional delivery for Vive Latino 2025 and Bad Bunny's livestream, reaching 9M+ active viewers.",
          "Standardized template production and optimized marketplace asset packages, achieving ~10% waste reduction and streamlining cross-team communication by removing intermediary steps.",
          "Executed complex regional campaigns across Latin America, Canada, and ANZ — navigating multi-studio approval processes and compliance standards (Apple TV+, HBO Max, Globo, Crunchyroll, Universal+, MGM+, Paramount+, Mubi, among others) while delivering with perfect accuracy across tight timelines.",
        ],
      },
      {
        role: "Vendor Manager | Brand Specialist",
        company: "Amazon",
        period: "Feb 2024 — Dec 2024",
        description:
          "Managed a top Amazon Fashion brand to drive growth and deliver best-in-class customer experience on Amazon.com.mx.",
        metrics: [
          "$13.8MM USD GMS",
          "+72.04% YoY",
          "+42% vs. goal",
          "CM 2.32 (+9.55%)",
        ],
        highlights: [
          "Surpassed Gross Merchandise Sales goals for the account ($13.8MM USD, +72.04% year-over-year, +42% vs. goal) while maintaining a Contribution Margin of 2.32 (+9.55% year-over-year).",
          "Automated ~50% of purchase orders through catalogue strategy changes, reducing late deliveries and order rejections.",
          "Expanded selection by onboarding ~3,000 new product listings while identifying and resolving pricing issues.",
          "Led vendor presentations and acted as main point of contact, managing the end-to-end commercial relationship.",
        ],
      },
      {
        role: "Marketing Specialist",
        company: "Amazon",
        period: "Feb 2024 — Dec 2024",
        description:
          "Responsible for outbound and inbound communication channels of the Amazon Softlines business group.",
        metrics: [
          "3× site-wide CTR",
          "~200,000 customers/week",
          "30+ campaigns/month",
        ],
        highlights: [
          "Delivered homepage campaigns consistently achieving 3× the site-wide Click-Through Rate average (11.7%–13.5% vs. 4.3% benchmark) during Q4 High Visibility Events, ranking as the top engagement contributor across all business groups.",
          "Managed 3 weekly outbound campaigns reaching ~200,000 customers, 30+ monthly brand campaigns reaching ~25,000 customers each, and monthly gateway placements (hero banners, mobile dashboards, quick cards) reaching 1–2M recognized customers per placement.",
          "Optimized customer segments to improve targeting and Click-Through Rates across email and push notification channels.",
          "Guided the lifecycle project to attract new customers to Amazon Fashion, reduce lapsed customer percentage, and increase conversion rates.",
        ],
      },
      {
        role: "Product Management Specialist",
        company: "Amazon",
        period: "Aug 2023 — Feb 2024",
        description:
          "Manager of Size and Fit related projects on Amazon Softlines for the Mexico marketplace.",
        metrics: ["−1 to 2% return rate", "Team of 3", "Cross-border"],
        highlights: [
          "Led sizing initiatives that reduced product return rates by 1–2%, enhancing customer experience and reducing operational costs.",
          "Successfully onboarded international customer experience enhancement projects into the Mexico marketplace, leading cross-border implementation with multiple stakeholders.",
          "Led a team of 3 on a continuous improvement project to enhance the customer journey.",
          "Generated standardized mechanisms and procedures to optimize operational processes for internal data quality.",
        ],
      },
      {
        role: "Marketing & Business Development Intern",
        company: "Shoplogix Latam",
        period: "May 2022 — Sep 2022",
        description:
          "Internship with the marketing and business development team at Shoplogix, a manufacturing analytics (OEE) platform. Supported commercial opportunity generation for the Latin American market.",
        metrics: ["Market R&D", "Business Development", "LatAm"],
        highlights: [
          "Conducted market research and development (R&D) to identify commercial opportunities across the manufacturing sector in Latin America.",
          "Prepared and supported sales presentations for prospects, translating the platform's technical capabilities into clear value propositions.",
          "Partnered with the business development team on lead generation and qualification for the LatAm market.",
        ],
      },
      {
        role: "Logistics Consultant",
        company: "Coppel S.A. de C.V.",
        period: "Feb 2021 — Jun 2021",
        description:
          "Logistics consulting engagement for one of Mexico's largest retail chains, applying Six Sigma methodology across distribution-center operations.",
        metrics: ["Six Sigma", "Distribution Centers", "Retail"],
        highlights: [
          "Applied Six Sigma methodology to identify improvement opportunities across distribution-center operations.",
          "Optimized home-delivery costs and lead times.",
          "Developed logistics strategies for clothing arrangement processes.",
          "Generated innovative solutions for batching operations.",
        ],
      },
    ],
  },

  // ─── Logros e impacto ───
  // ─── Campañas destacadas ───
  "featured.kicker": { es: "Campañas & proyectos", en: "Campaigns & projects" },
  "featured.title": { es: "Trabajo destacado.", en: "Selected work." },
  "featured.items": {
    es: [
      {
        title: "Vive Latino × Bad Bunny — Livestream",
        figure: "9M+",
        unit: "espectadores en vivo",
        blurb:
          "Enlace principal entre Amazon Music y Prime Video para el livestream de Vive Latino 2025 y Bad Bunny, coordinando la entrega cross-functional en vivo.",
      },
      {
        title: "Estandarización del proceso TVOD",
        figure: "2",
        unit: "regiones unificadas",
        blurb:
          "Tras la integración de marketing de PVI entre Europa y LatAm/Canadá, redacté el documento unificado de workflow y alineé a agencia, marketing y partner managers.",
      },
      {
        title: "Producción de assets a escala",
        figure: "51,294",
        unit: "assets · +70.4% YoY",
        blurb:
          "Escalé la producción de assets de TVOD y Channels soportando 1,184 campañas a través de Latinoamérica, Europa y Canadá, sin sacrificar precisión.",
      },
      {
        title: "Optimización del flujo de producción",
        figure: "3.9%",
        unit: "rush rate · desde 5.0%",
        blurb:
          "Rediseño de la planeación para reducir urgencias de última hora, con ~10% menos desperdicio estandarizando plantillas y paquetes del marketplace.",
      },
    ],
    en: [
      {
        title: "Vive Latino × Bad Bunny — Livestream",
        figure: "9M+",
        unit: "live viewers",
        blurb:
          "Primary liaison between Amazon Music and Prime Video for the Vive Latino 2025 and Bad Bunny livestream, coordinating cross-functional live delivery.",
      },
      {
        title: "TVOD process standardization",
        figure: "2",
        unit: "regions unified",
        blurb:
          "After the PVI marketing integration between EU and LatAm/Canada, I authored the unified workflow document and aligned the agency, marketing, and partner managers.",
      },
      {
        title: "Asset production at scale",
        figure: "51,294",
        unit: "assets · +70.4% YoY",
        blurb:
          "Scaled TVOD and Channels asset production supporting 1,184 campaigns across Latin America, Europe, and Canada — with no loss of accuracy.",
      },
      {
        title: "Production workflow optimization",
        figure: "3.9%",
        unit: "rush rate · down from 5.0%",
        blurb:
          "Redesigned planning to cut last-minute rushes, with ~10% less waste by standardizing marketplace templates and asset packages.",
      },
    ],
  },
  "achievements.kicker": { es: "Logros e impacto", en: "Impact" },
  "achievements.title": { es: "Impacto medible.", en: "Measurable impact." },
  "achievements.scrollLeft": { es: "Anterior", en: "Previous" },
  "achievements.scrollRight": { es: "Siguiente", en: "Next" },
  "achievements.swipeHint": { es: "Desliza para ver más", en: "Swipe to see more" },
  "achievements.items": {
    es: [
      {
        title: "Producción de assets a escala",
        metric: "51,294 assets · +70.4%",
        blurb:
          "Entrega de 51,294 assets soportando 1,184 campañas de TVOD y Channels a través de Latinoamérica, Europa y Canadá — un crecimiento de 70.4% interanual sin sacrificar precisión.",
      },
      {
        title: "Estandarización del proceso de producción",
        metric: "2 regiones unificadas",
        blurb:
          "Tras la integración de marketing de PVI entre Europa y LatAm/Canadá, redacté el documento unificado de workflow y alineé a agencia de diseño, marketing y partner managers en una sola forma de trabajar.",
      },
      {
        title: "Optimización del flujo de trabajo",
        metric: "Rush rate 5.0% → 3.9%",
        blurb:
          "Rediseño de la planeación de producción para reducir las urgencias de última hora, además de ~10% de reducción de desperdicio estandarizando plantillas y paquetes de assets del marketplace.",
      },
      {
        title: "Amazon Music × Prime Video",
        metric: "9M+ espectadores",
        blurb:
          "Enlace principal entre Amazon Music y Prime Video para colaboraciones de alta visibilidad: coordinación cross-functional del livestream de Vive Latino 2025 y Bad Bunny.",
      },
      {
        title: "Crecimiento de cuenta en Amazon Fashion",
        metric: "$13.8MM USD · +72%",
        blurb:
          "Gestión end-to-end de una marca líder: superé el objetivo de Gross Merchandise Sales en 42% manteniendo un Contribution Margin de 2.32 (+9.55% interanual).",
      },
      {
        title: "Automatización de órdenes de compra",
        metric: "~50% automatizado",
        blurb:
          "Cambios en la estrategia de catálogo que automatizaron la mitad de las órdenes de compra, reduciendo entregas tardías y rechazos, con ~3,000 nuevos listings incorporados.",
      },
      {
        title: "Campañas de máximo engagement",
        metric: "3× el CTR del sitio",
        blurb:
          "Campañas de homepage con 11.7%–13.5% de CTR frente al benchmark de 4.3% durante los eventos de Q4 — el contribuidor de mayor engagement entre todos los grupos de negocio.",
      },
      {
        title: "Size & Fit: menos devoluciones",
        metric: "−1 a 2% devoluciones",
        blurb:
          "Iniciativas de tallaje en Amazon Softlines México que redujeron las devoluciones de producto, mejorando la experiencia del cliente y bajando costos operativos.",
      },
    ],
    en: [
      {
        title: "Asset production at scale",
        metric: "51,294 assets · +70.4%",
        blurb:
          "Delivered 51,294 assets supporting 1,184 TVOD and Channels campaigns across Latin America, Europe, and Canada — 70.4% year-over-year growth with no loss of accuracy.",
      },
      {
        title: "Production process standardization",
        metric: "2 regions unified",
        blurb:
          "After the PVI marketing integration between EU and LatAm/Canada, I authored the unified workflow document and aligned the design agency, marketing, and partner managers into a single way of working.",
      },
      {
        title: "Workflow optimization",
        metric: "Rush rate 5.0% → 3.9%",
        blurb:
          "Redesigned production planning to cut last-minute rushes, plus ~10% waste reduction by standardizing templates and marketplace asset packages.",
      },
      {
        title: "Amazon Music × Prime Video",
        metric: "9M+ viewers",
        blurb:
          "Primary liaison between Amazon Music and Prime Video for high-visibility partnerships: cross-functional coordination of the Vive Latino 2025 and Bad Bunny livestream.",
      },
      {
        title: "Amazon Fashion account growth",
        metric: "$13.8MM USD · +72%",
        blurb:
          "End-to-end management of a top brand: exceeded the Gross Merchandise Sales goal by 42% while holding a Contribution Margin of 2.32 (+9.55% year-over-year).",
      },
      {
        title: "Purchase order automation",
        metric: "~50% automated",
        blurb:
          "Catalogue strategy changes that automated half of all purchase orders, reducing late deliveries and rejections, with ~3,000 new listings onboarded.",
      },
      {
        title: "Top-engagement campaigns",
        metric: "3× site-wide CTR",
        blurb:
          "Homepage campaigns at 11.7%–13.5% CTR against a 4.3% benchmark during Q4 events — the top engagement contributor across all business groups.",
      },
      {
        title: "Size & Fit: fewer returns",
        metric: "−1 to 2% returns",
        blurb:
          "Sizing initiatives at Amazon Softlines Mexico that reduced product returns, improving customer experience and lowering operational costs.",
      },
    ],
  },

  // ─── Skills ───
  "skills.kicker": { es: "Capacidades", en: "Capabilities" },
  "skills.title": { es: "Stack operativo.", en: "Operating stack." },
  "skills.groups": {
    es: [
      "Operaciones & Producción",
      "Comercial & Marketing",
      "Datos & Análisis",
      "Gestión de Programas",
      "Herramientas que domino",
    ],
    en: [
      "Operations & Production",
      "Commercial & Marketing",
      "Data & Analysis",
      "Program Management",
      "Tools I master",
    ],
  },
  "skills.interests": {
    es: [
      "Operational Excellence",
      "Media & Entertainment",
      "E-commerce",
      "Program Management",
      "Process Automation",
      "Expansión internacional",
    ],
    en: [
      "Operational Excellence",
      "Media & Entertainment",
      "E-commerce",
      "Program Management",
      "Process Automation",
      "International Expansion",
    ],
  },

  // ─── Educación & idiomas ───
  "education.kicker": { es: "Educación", en: "Education" },
  "education.title": { es: "Formación.", en: "Education." },
  "education.items": {
    es: [
      {
        title: "Ingeniería Industrial y de Sistemas",
        institution: "Instituto Tecnológico y de Estudios Superiores de Monterrey",
        period: "Ago 2019 — Jul 2023",
      },
      {
        title: "Business Management",
        institution: "IPAG Business School — París, Francia",
        period: "Sep 2022 — Dic 2022",
      },
    ],
    en: [
      {
        title: "Industrial and Systems Engineering",
        institution: "Instituto Tecnológico y de Estudios Superiores de Monterrey",
        period: "Aug 2019 — Jul 2023",
      },
      {
        title: "Business Management",
        institution: "IPAG Business School — Paris, France",
        period: "Sep 2022 — Dec 2022",
      },
    ],
  },
  "languages.kicker": { es: "Idiomas", en: "Languages" },
  "languages.items": {
    es: [
      { name: "Español", level: "Nativo" },
      { name: "Inglés", level: "Profesional" },
    ],
    en: [
      { name: "Spanish", level: "Native" },
      { name: "English", level: "Professional proficiency" },
    ],
  },

  // ─── Extracurriculares ───
  "certs.kicker": { es: "Formación continua", en: "Continuous learning" },
  "certs.title": { es: "Certificaciones.", en: "Certifications." },
  "certs.viewCredential": { es: "Ver credencial", en: "View credential" },
  "certs.items": {
    es: [
      { title: "Scrum Foundation", issuer: "CertiProf · ID 86030236" },
      { title: "Cadena de suministro y operaciones", issuer: "LinkedIn Learning · Jun 2023" },
      { title: "Aprende las bases de las cadenas de suministro", issuer: "LinkedIn Learning · Jun 2023" },
      {
        title: "Servicio Social — Investigación",
        issuer: "Fundación Tierra de Artistas",
      },
    ],
    en: [
      { title: "Scrum Foundation", issuer: "CertiProf · ID 86030236" },
      { title: "Supply Chain & Operations Job Skills", issuer: "LinkedIn Learning · Jun 2023" },
      { title: "Supply Chain Foundations", issuer: "LinkedIn Learning · Jun 2023" },
      {
        title: "Social Service — Research",
        issuer: "Fundación Tierra de Artistas",
      },
    ],
  },

  // ─── Contacto ───
  "contact.kicker": { es: "Contacto", en: "Contact" },
  "contact.title1": { es: "Hablemos de", en: "Let's talk about" },
  "contact.title2": { es: "tu próximo reto.", en: "your next challenge." },
  "contact.subtitle": {
    es: "Abierto a oportunidades en operaciones, producción y program management. Escríbeme y te respondo pronto.",
    en: "Open to opportunities in operations, production, and program management. Drop me a line and I'll get back to you soon.",
  },
  "contact.copyEmail": { es: "Copiar email", en: "Copy email" },
  "contact.copied": { es: "Copiado", en: "Copied" },
  "contact.waGreeting": {
    es: "Hola Nathan, vi tu portafolio y me gustaría platicar contigo.",
    en: "Hi Nathan, I saw your portfolio and I'd love to talk.",
  },
  "contact.methodLabel": {
    es: "¿Cómo prefieres escribirme?",
    en: "How would you rather reach me?",
  },
  "contact.methodEmail": { es: "Email", en: "Email" },
  "contact.methodWhatsapp": { es: "WhatsApp", en: "WhatsApp" },
  "contact.waSubmit": { es: "Enviar por WhatsApp", en: "Send via WhatsApp" },
  "contact.emailSubmit": { es: "Enviar email", en: "Send email" },
  "contact.formName": { es: "Nombre", en: "Name" },
  "contact.formEmail": { es: "Email", en: "Email" },
  "contact.formMessage": { es: "Mensaje", en: "Message" },
  "contact.formSubmit": { es: "Enviar mensaje", en: "Send message" },
  "contact.formSending": { es: "Enviando...", en: "Sending..." },
  "contact.formSent": { es: "Mensaje enviado", en: "Message sent" },
  "contact.formThanks": {
    es: "Gracias por escribir. Nathan te responderá lo antes posible.",
    en: "Thanks for writing. Nathan will get back to you as soon as possible.",
  },
  "contact.formAnother": { es: "Enviar otro mensaje", en: "Send another message" },
  "contact.formRetry": { es: "Intentar de nuevo", en: "Try again" },
  "contact.errName": { es: "El nombre es requerido", en: "Name is required" },
  "contact.errEmail": { es: "El email es requerido", en: "Email is required" },
  "contact.errEmailInvalid": { es: "Email no válido", en: "Invalid email" },
  "contact.errMessage": { es: "El mensaje es requerido", en: "Message is required" },
  "contact.errConnection": {
    es: "Error de conexión. Intenta de nuevo.",
    en: "Connection error. Try again.",
  },
  "contact.infoEmail": { es: "Email", en: "Email" },
  "contact.infoPhone": { es: "Teléfono", en: "Phone" },
  "contact.infoLocation": { es: "Ubicación", en: "Location" },

  // ─── Footer ───
  "footer.designed": { es: "Portafolio personal.", en: "Personal portfolio." },
  "footer.madeIn": { es: "Hecho en", en: "Made in" },

  // ─── BackToTop ───
  backToTop: { es: "Volver arriba", en: "Back to top" },

  // ─── CommandPalette ───
  "cmd.placeholder": {
    es: "Buscar secciones, logros, acciones...",
    en: "Search sections, achievements, actions...",
  },
  "cmd.noResults": { es: "Sin resultados", en: "No results" },
  "cmd.label": { es: "Paleta de comandos", en: "Command palette" },
  "cmd.search": { es: "Buscar", en: "Search" },
  "cmd.home": { es: "Inicio", en: "Home" },
  "cmd.about": { es: "Sobre mí", en: "About" },
  "cmd.experience": { es: "Experiencia", en: "Experience" },
  "cmd.achievements": { es: "Logros", en: "Impact" },
  "cmd.skills": { es: "Skills", en: "Skills" },
  "cmd.education": { es: "Educación", en: "Education" },
  "cmd.contact": { es: "Contacto", en: "Contact" },
  "cmd.copyEmail": { es: "Copiar email", en: "Copy email" },
  "cmd.viewLinkedin": { es: "Ver LinkedIn", en: "View LinkedIn" },
  "cmd.downloadCv": { es: "Descargar CV", en: "Download CV" },
  "cmd.hintAchievement": { es: "Logro", en: "Achievement" },
  "cmd.hintAction": { es: "Acción", en: "Action" },

  // ─── Skip link ───
  skipToContent: { es: "Ir al contenido principal", en: "Skip to main content" },
} as const;

export type TranslationKey = keyof typeof translations;

export function t(key: TranslationKey, locale: Locale): string {
  const entry = translations[key];
  const value = entry[locale];
  if (typeof value === "string") return value;
  return String(value);
}

export function tArray<T>(key: TranslationKey, locale: Locale): T[] {
  const entry = translations[key];
  const value = entry[locale];
  return value as unknown as T[];
}

export default translations;
