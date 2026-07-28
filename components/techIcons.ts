import type { LucideIcon } from "lucide-react";
import {
  Factory,
  Workflow,
  Bot,
  Truck,
  CalendarRange,
  Megaphone,
  Handshake,
  ShoppingBag,
  Tag,
  Smile,
  BarChart3,
  Gauge,
  Target,
  Table2,
  Users,
  Network,
  KanbanSquare,
  ShieldCheck,
  Sparkles,
  Grid3x3,
  Cloud,
  FileSpreadsheet,
  PieChart,
  ListChecks,
  CircleDot,
} from "lucide-react";

export type SkillMeta = { Icon: LucideIcon; color: string };

const NAVY = "#9c3d2e";
const STEEL = "#b5553f";
const EMBER = "#a67c3a";
const SLATE = "#5a5a4d";

/** Las claves deben coincidir exactamente con skills.groups[].items de lib/data.ts */
export const SKILL_ICONS: Record<string, SkillMeta> = {
  // Operaciones & Producción
  "Operations & Production Management": { Icon: Factory, color: NAVY },
  "Process Standardization": { Icon: Workflow, color: NAVY },
  "Workflow Automation": { Icon: Bot, color: STEEL },
  "Supply Chain Management": { Icon: Truck, color: STEEL },
  "Capacity Planning": { Icon: CalendarRange, color: SLATE },

  // Comercial & Marketing
  "Campaign Strategy & Execution": { Icon: Megaphone, color: EMBER },
  "Strategic Vendor Relationships": { Icon: Handshake, color: NAVY },
  "Merchandising & Product Management": { Icon: ShoppingBag, color: STEEL },
  "Pricing & Negotiation": { Icon: Tag, color: EMBER },
  "Customer Experience Optimization": { Icon: Smile, color: STEEL },

  // Datos & Análisis
  "Big Data Analysis": { Icon: BarChart3, color: NAVY },
  "Data-Driven Process Optimization": { Icon: Gauge, color: STEEL },
  "KPI Tracking & Reporting": { Icon: Target, color: EMBER },
  "Advanced Excel Modeling": { Icon: Table2, color: SLATE },

  // Gestión de Programas
  "Cross-Functional Program Coordination": { Icon: Network, color: NAVY },
  "Stakeholder Management": { Icon: Users, color: STEEL },
  "Project Management (Agile/Scrum)": { Icon: KanbanSquare, color: NAVY },
  "Compliance & Multi-Studio Approvals": { Icon: ShieldCheck, color: SLATE },
  "Adaptability to New Environments": { Icon: Sparkles, color: EMBER },

  // Herramientas
  Airtable: { Icon: Grid3x3, color: STEEL },
  Salesforce: { Icon: Cloud, color: "#00A1E0" },
  "Microsoft Excel": { Icon: FileSpreadsheet, color: "#217346" },
  Tableau: { Icon: PieChart, color: "#C05F1F" },
  Jira: { Icon: ListChecks, color: "#2684FF" },
  Asana: { Icon: CircleDot, color: "#F06A6A" },
};

const FALLBACK: SkillMeta = { Icon: CircleDot, color: "#8a8676" };

export function skillMeta(name: string): SkillMeta {
  return SKILL_ICONS[name] ?? FALLBACK;
}
