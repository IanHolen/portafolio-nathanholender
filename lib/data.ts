export const profile = {
  name: "Nathan Holender",
  firstName: "Nathan",
  lastName: "Holender",
  title: "Production & Operations Manager",
  specialty:
    "Escalo operaciones de producción y campañas a nivel internacional — de la estrategia al proceso que la sostiene.",
  location: "Ciudad de México",
  email: "nathanholender@gmail.com",
  phone: "+52 55 2492 9029",
  cvUrl: "/cv-nathan-holender.pdf",
  whatsapp: "525524929029",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/nathan-holender/" },
    { label: "Email", href: "mailto:nathanholender@gmail.com" },
    { label: "WhatsApp", href: "https://wa.me/525524929029" },
    { label: "Contacto", href: "#contact" },
  ],
};

/* ─── Empresas (strip de credibilidad en el Hero) ─── */
export const companies = [
  // Prime Video primero: es donde trabaja actualmente.
  // Los logos que ya vienen como mosaico de marca (fondo de color propio)
  // se marcan con `tile` para pintarlos completos, sin chip blanco.
  { name: "Prime Video", logos: ["/companies/primevideo-tile.webp"], tile: true },
  { name: "Amazon", logos: ["/companies/amazon.webp"], tile: false },
  { name: "Shoplogix", logos: ["/companies/shoplogix.png"], tile: false },
  { name: "Coppel", logos: ["/companies/coppel-tile.png"], tile: true },
];

/* ─── Experiencia ───
   El texto (rol, descripción, bullets) vive en lib/translations.ts →
   "experience.items". Aquí solo lo estructural: logos y competencias.
   El cruce es POR ÍNDICE, así que si reordenas uno reordena el otro. */
export type ExperienceMeta = {
  company: string;
  logos: string[];
  stack: string[];
  /** Empleador al que pertenece el rol — agrupa la línea de tiempo. */
  group: string;
};

/* Cada empleador se muestra una vez, con su logo grande, y debajo cuelgan
   sus roles. El id cruza con ExperienceMeta.group. */
export type ExperienceGroup = {
  id: string;
  name: string;
  logo: string;
  tile: boolean;
};

export const experienceGroups: ExperienceGroup[] = [
  { id: "amazon", name: "Amazon", logo: "/companies/amazon.webp", tile: false },
  { id: "shoplogix", name: "Shoplogix Latam", logo: "/companies/shoplogix.png", tile: false },
  { id: "coppel", name: "Coppel S.A. de C.V.", logo: "/companies/coppel-tile.png", tile: true },
];

export const experience: ExperienceMeta[] = [
  {
    company: "Amazon · Prime Video International",
    group: "amazon",
    logos: ["/companies/amazon.webp", "/companies/primevideo-tile.webp"],
    stack: [
      "Production Operations",
      "Stakeholder Management",
      "Workflow Automation",
      "Airtable",
      "Agile / Scrum",
      "Process Standardization",
    ],
  },
  {
    company: "Amazon",
    group: "amazon",
    logos: ["/companies/amazon.webp"],
    stack: [
      "Vendor Management",
      "Contribution Margin",
      "Catalogue Strategy",
      "Pricing",
      "Negotiation",
      "Salesforce",
    ],
  },
  {
    company: "Amazon",
    group: "amazon",
    logos: ["/companies/amazon.webp"],
    stack: [
      "Campaign Strategy",
      "CRM & Lifecycle",
      "Customer Segmentation",
      "CTR Optimization",
      "Email & Push",
      "Merchandising",
    ],
  },
  {
    company: "Amazon",
    group: "amazon",
    logos: ["/companies/amazon.webp"],
    stack: [
      "Product Management",
      "Size & Fit",
      "Continuous Improvement",
      "Cross-Border Launch",
      "Data Quality",
      "Team Leadership",
    ],
  },
  {
    company: "Shoplogix Latam",
    group: "shoplogix",
    logos: ["/companies/shoplogix.png"],
    stack: [
      "Market Research",
      "Business Development",
      "Sales Enablement",
      "Lead Generation",
      "Go-to-Market",
    ],
  },
  {
    company: "Coppel S.A. de C.V.",
    group: "coppel",
    logos: ["/companies/coppel-tile.png"],
    stack: [
      "Logistics Consulting",
      "Six Sigma / DMAIC",
      "Process Optimization",
      "Distribution Center Ops",
      "Lead-Time Reduction",
    ],
  },
];

/* ─── Logros e impacto (carrusel) ───
   Texto en translations → "achievements.items" (mismo orden). */
export type Achievement = {
  id: string;
  tags: string[];
  year: string;
  company: string;
  accent: string;
};

export const achievements: Achievement[] = [
  {
    id: "asset-production",
    tags: ["Prime Video", "TVOD", "Operations"],
    year: "2025",
    company: "Amazon · Prime Video",
    accent: "from-rose-600/20 to-rose-500/5",
  },
  {
    id: "process-standardization",
    tags: ["Process Design", "EU + LatAm", "Documentación"],
    year: "2025",
    company: "Amazon · Prime Video",
    accent: "from-orange-600/20 to-amber-500/5",
  },
  {
    id: "rush-rate",
    tags: ["Workflow", "Eficiencia", "Planeación"],
    year: "2025",
    company: "Amazon · Prime Video",
    accent: "from-rose-600/20 to-amber-500/5",
  },
  {
    id: "music-partnership",
    tags: ["Amazon Music", "Live Events", "Cross-functional"],
    year: "2025",
    company: "Amazon · Prime Video",
    accent: "from-rose-600/20 to-amber-500/5",
  },
  {
    id: "gms-growth",
    tags: ["P&L", "Vendor Management", "Retail"],
    year: "2024",
    company: "Amazon",
    accent: "from-amber-600/20 to-amber-500/5",
  },
  {
    id: "po-automation",
    tags: ["Automatización", "Supply Chain", "Catálogo"],
    year: "2024",
    company: "Amazon",
    accent: "from-rose-600/20 to-rose-500/5",
  },
  {
    id: "ctr-campaigns",
    tags: ["Marketing", "CTR", "Q4 Peak"],
    year: "2024",
    company: "Amazon",
    accent: "from-orange-600/20 to-amber-500/5",
  },
  {
    id: "return-rate",
    tags: ["Product", "Size & Fit", "CX"],
    year: "2023",
    company: "Amazon",
    accent: "from-rose-600/20 to-amber-500/5",
  },
];

/* ─── Campañas / trabajo destacado (texto en translations → "featured.items") ─── */
export type Campaign = {
  id: string;
  year: string;
  org: string;
  tags: string[];
  accent: string;
};

export const campaigns: Campaign[] = [
  {
    id: "vivelatino",
    year: "2025",
    org: "Amazon Music × Prime Video",
    tags: ["Live Events", "Cross-functional", "Streaming"],
    accent: "from-rose-500/25 to-orange-500/5",
  },
  {
    id: "tvod-standardization",
    year: "2025",
    org: "Prime Video International",
    tags: ["Process Design", "EU + LatAm", "Workflow"],
    accent: "from-orange-500/25 to-amber-500/5",
  },
  {
    id: "asset-scale",
    year: "2025",
    org: "Prime Video International",
    tags: ["Operations", "TVOD & Channels"],
    accent: "from-amber-500/25 to-rose-500/5",
  },
  {
    id: "workflow-opt",
    year: "2025",
    org: "Prime Video International",
    tags: ["Efficiency", "Planning"],
    accent: "from-rose-500/25 to-amber-500/5",
  },
];

/* ─── Skills ───
   Las etiquetas de grupo se traducen en translations → "skills.groups".
   Los items se muestran tal cual (son términos de industria). */
export const skills = {
  groups: [
    {
      label: "Operaciones & Producción",
      items: [
        "Operations & Production Management",
        "Process Standardization",
        "Workflow Automation",
        "Supply Chain Management",
        "Capacity Planning",
      ],
    },
    {
      label: "Comercial & Marketing",
      items: [
        "Campaign Strategy & Execution",
        "Strategic Vendor Relationships",
        "Merchandising & Product Management",
        "Pricing & Negotiation",
        "Customer Experience Optimization",
      ],
    },
    {
      label: "Datos & Análisis",
      items: [
        "Big Data Analysis",
        "Data-Driven Process Optimization",
        "KPI Tracking & Reporting",
        "Advanced Excel Modeling",
      ],
    },
    {
      label: "Gestión de Programas",
      items: [
        "Cross-Functional Program Coordination",
        "Stakeholder Management",
        "Project Management (Agile/Scrum)",
        "Compliance & Multi-Studio Approvals",
        "Adaptability to New Environments",
      ],
    },
    {
      label: "Herramientas",
      items: ["Airtable", "Salesforce", "Microsoft Excel", "Tableau", "Jira", "Asana"],
    },
  ],
  interests: [
    "Operational Excellence",
    "Media & Entertainment",
    "E-commerce",
    "Program Management",
    "Process Automation",
    "International Expansion",
  ],
};

/* ─── Educación (texto en translations → "education.items") ─── */
export const education = [
  { logo: "/education/itesm.webp", alt: "Tec de Monterrey" },
  { logo: "/education/ipag.png", alt: "IPAG Business School" },
];

/* ─── Extracurriculares / certificaciones ───
   Vacío = la sección se auto-oculta (texto en translations → "certs.items"). */
export const certifications: { icon: string; credentialUrl: string }[] = [
  { icon: "scrum", credentialUrl: "" },
  { icon: "linkedin", credentialUrl: "/certs/cadena-suministro-operaciones.jpg" },
  { icon: "linkedin", credentialUrl: "/certs/bases-cadena-suministro.jpg" },
  { icon: "community", credentialUrl: "" },
];

/* ─── Métricas del Hero (las etiquetas viven en translations → "hero.stat.*") ─── */
export const heroStats = [
  { key: "assets", value: 51294, suffix: "" },
  { key: "campaigns", value: 1184, suffix: "" },
  { key: "gms", value: 13.8, suffix: "MM" },
  { key: "years", value: 3, suffix: "+" },
] as const;
