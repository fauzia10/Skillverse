import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import {
  LayoutDashboard, User, Award, ClipboardCheck, Target, TrendingUp,
  FolderKanban, FileBadge, LineChart as LineChartIcon, Settings,
  Search, Bell, HelpCircle, ChevronDown, Plus, Check, AlertTriangle,
  ExternalLink, Github, X, Camera, Trash2, Sparkles, ArrowRight,
  BadgeCheck, GraduationCap, ChevronRight, Menu, Star, Code2,
  Cpu, Globe, Smartphone, BarChart3, FileText, Briefcase
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from "recharts";

/* ============================================================
   DESIGN TOKENS
   ============================================================ */
const COLORS = {
  blush: "#E9A6A6",
  blushDark: "#CF7F83",
  seafoam: "#9DCEBE",
  seafoamDark: "#4B8B79",
  teal: "#315C61",
  tealDark: "#1F4045",
  bg: "#FAF7F3",
  white: "#FFFFFF",
  gray: "#738083",
  border: "#E8E4DF",
};

/* ============================================================
   MOCK DATA
   ============================================================ */
const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "profile", label: "My Profile", icon: User },
  { id: "skills", label: "Skills & Badges", icon: Award },
  { id: "assessments", label: "Assessments", icon: ClipboardCheck },
  { id: "goal", label: "Career Goal", icon: Target },
  { id: "gap", label: "Skill Gap Analysis", icon: TrendingUp },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "certificates", label: "Certificates", icon: FileBadge },
  { id: "progress", label: "Progress", icon: LineChartIcon },
  { id: "settings", label: "Settings", icon: Settings },
];

const INITIAL_SKILLS = [
  { id: 1, name: "Python", level: "Intermediate", verified: true, icon: Code2 },
  { id: 2, name: "SQL", level: "Beginner", verified: true, icon: FileText },
  { id: 3, name: "Excel", level: "Advanced", verified: true, icon: BarChart3 },
  { id: 4, name: "Data Analysis", level: "Intermediate", verified: true, icon: TrendingUp },
  { id: 5, name: "Communication", level: "Advanced", verified: false, icon: Sparkles },
  { id: 6, name: "Problem Solving", level: "Intermediate", verified: false, icon: Cpu },
  { id: 7, name: "JavaScript", level: "Beginner", verified: false, icon: Code2 },
];

const GAP_DATA = [
  { skill: "SQL", current: "Beginner", required: "Intermediate", curVal: 1, reqVal: 2 },
  { skill: "Data Visualization", current: "Beginner", required: "Intermediate", curVal: 1, reqVal: 2 },
  { skill: "Statistics", current: "Beginner", required: "Intermediate", curVal: 1, reqVal: 2 },
  { skill: "Python", current: "Intermediate", required: "Intermediate", curVal: 2, reqVal: 2 },
  { skill: "Communication", current: "Advanced", required: "Intermediate", curVal: 3, reqVal: 2 },
];

function gapPriority(cur, req) {
  const diff = req - cur;
  if (diff >= 2) return "High";
  if (diff === 1) return "Medium";
  return "Ready";
}

const INITIAL_PROJECTS = [
  {
    id: 1,
    title: "Customer Churn Analysis",
    category: "Other",
    skills: ["Python", "Pandas", "SQL", "Power BI"],
    description:
      "Analyzed customer behavior data to identify churn patterns and generate actionable business insights.",
    github: "https://github.com/",
    demo: "https://example.com/",
    visual: "churn",
    usage: [
      { name: "Python", value: 42 },
      { name: "SQL", value: 28 },
      { name: "Pandas", value: 18 },
      { name: "Power BI", value: 12 },
    ],
  },
  {
    id: 2,
    title: "Expense Tracker",
    category: "App",
    skills: ["React", "JavaScript", "Firebase"],
    description:
      "A personal finance application for recording expenses, tracking budgets, and visualizing monthly spending.",
    github: "https://github.com/",
    demo: "https://example.com/",
    visual: "expense",
    usage: [
      { name: "React", value: 48 },
      { name: "JavaScript", value: 32 },
      { name: "Firebase", value: 20 },
    ],
  },
  {
    id: 3,
    title: "Campus Connect",
    category: "Website",
    skills: ["HTML", "CSS", "JavaScript", "Node.js"],
    description:
      "A student community platform for discovering events, announcements, clubs, and campus opportunities.",
    github: "https://github.com/",
    demo: "https://example.com/",
    visual: "campus",
    usage: [
      { name: "JavaScript", value: 34 },
      { name: "Node.js", value: 26 },
      { name: "HTML", value: 22 },
      { name: "CSS", value: 18 },
    ],
  },
  {
    id: 4,
    title: "Smart Irrigation System",
    category: "Hardware",
    skills: ["Arduino", "IoT", "Soil Moisture Sensors", "C++"],
    description:
      "An IoT-based system that monitors soil conditions and automatically controls water delivery.",
    github: "https://github.com/",
    demo: "https://example.com/",
    visual: "irrigation",
    usage: [
      { name: "C++", value: 38 },
      { name: "Arduino", value: 30 },
      { name: "IoT", value: 20 },
      { name: "Soil Sensors", value: 12 },
    ],
  },
];

const CERTIFICATES = [
  { id: 1, title: "Google Data Analytics Certificate", org: "Coursera", date: "Jan 2026", verified: true },
  { id: 2, title: "Python Programming", org: "NPTEL", date: "Nov 2025", verified: true },
  { id: 3, title: "Machine Learning Workshop", org: "ABC University", date: "Aug 2025", verified: false },
];

const PROGRESS_DATA = [
  { month: "September", score: 61 },
  { month: "December", score: 72 },
  { month: "March", score: 81 },
];

const BADGE_PROGRESSION = [
  { skill: "SQL", from: "Beginner", to: "Intermediate" },
  { skill: "Python", from: "Beginner", to: "Intermediate" },
  { skill: "Excel", from: "Intermediate", to: "Advanced" },
];

const CAREER_OPTIONS = [
  "Data Analyst",
  "Software Developer",
  "AI/ML Engineer",
  "Web Developer",
  "Business Analyst",
  "UI/UX Designer",
];

const COURSEWORK = ["Data Structures", "DBMS", "Statistics", "Machine Learning", "Web Development"];

/* ============================================================
   SMALL UI PRIMITIVES
   ============================================================ */

function LevelBadge({ level }) {
  const styles = {
    Beginner: "bg-[#F1EEE9] text-[#738083]",
    Intermediate: "bg-[#F7E6E6] text-[#CF7F83]",
    Advanced: "bg-[#E7EEEE] text-[#315C61]",
  };
  return (
    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${styles[level] || styles.Beginner}`}>
      {level}
    </span>
  );
}

function PriorityBadge({ priority }) {
  if (priority === "High")
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#FBEAEA] text-[#C15B5B]">
        <AlertTriangle size={12} /> High
      </span>
    );
  if (priority === "Medium")
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#FBF1E6] text-[#B47B3C]">
        <AlertTriangle size={12} /> Medium
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#E9F4EF] text-[#4B8B79]">
      <Check size={12} /> Ready
    </span>
  );
}

function ProgressBar({ value, colorClass = "bg-[#9DCEBE]" }) {
  return (
    <div className="w-full h-2 rounded-full bg-[#EFE9E3] overflow-hidden">
      <div
        className={`h-full rounded-full ${colorClass} transition-all duration-700 ease-out`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

function CircularProgress({ value, size = 96, stroke = 9, label }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#EFE9E3" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#9DCEBE"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-semibold text-[#1F4045]">{value}%</span>
        {label && <span className="text-[10px] text-[#738083]">{label}</span>}
      </div>
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-[20px] border border-[#E8E4DF] shadow-[0_2px_16px_rgba(31,64,69,0.05)] ${className}`}>
      {children}
    </div>
  );
}

function SectionHeading({ eyebrow, title, action }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        {eyebrow && <p className="text-xs text-[#738083] mb-0.5">{eyebrow}</p>}
        <h3 className="text-lg font-semibold text-[#1F4045]">{title}</h3>
      </div>
      {action}
    </div>
  );
}

function Toast({ message, show }) {
  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-2 bg-[#1F4045] text-white px-5 py-3 rounded-full shadow-lg text-sm">
        <Check size={16} className="text-[#9DCEBE]" />
        {message}
      </div>
    </div>
  );
}

function Modal({ open, onClose, title, children, wide = false }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F4045]/40 backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={`bg-white rounded-[22px] w-full ${wide ? "max-w-2xl" : "max-w-md"} max-h-[90vh] overflow-y-auto shadow-2xl animate-[fadeIn_0.2s_ease]`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8E4DF] sticky top-0 bg-white rounded-t-[22px]">
          <h3 className="text-lg font-semibold text-[#1F4045]">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 rounded-full text-[#738083] hover:bg-[#F1EEE9] hover:text-[#1F4045] transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function TextField({ label, ...props }) {
  return (
    <label className="block mb-4">
      <span className="block text-sm font-medium text-[#1F4045] mb-1.5">{label}</span>
      <input
        {...props}
        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DF] bg-[#FAF7F3] text-[#1F4045] placeholder:text-[#A2ACAE] focus:outline-none focus:ring-2 focus:ring-[#E9A6A6] focus:border-transparent transition-shadow"
      />
    </label>
  );
}

function TextArea({ label, ...props }) {
  return (
    <label className="block mb-4">
      <span className="block text-sm font-medium text-[#1F4045] mb-1.5">{label}</span>
      <textarea
        {...props}
        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DF] bg-[#FAF7F3] text-[#1F4045] placeholder:text-[#A2ACAE] focus:outline-none focus:ring-2 focus:ring-[#E9A6A6] focus:border-transparent transition-shadow resize-none"
      />
    </label>
  );
}

function SelectField({ label, options, ...props }) {
  return (
    <label className="block mb-4">
      <span className="block text-sm font-medium text-[#1F4045] mb-1.5">{label}</span>
      <select
        {...props}
        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DF] bg-[#FAF7F3] text-[#1F4045] focus:outline-none focus:ring-2 focus:ring-[#E9A6A6] focus:border-transparent transition-shadow"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#E9A6A6] text-white text-sm font-medium hover:bg-[#CF7F83] active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E9A6A6] ${className}`}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-[#E8E4DF] text-[#315C61] text-sm font-medium bg-white hover:bg-[#FAF7F3] active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#315C61] ${className}`}
    >
      {children}
    </button>
  );
}

/* ============================================================
   ABSTRACT PROJECT THUMBNAILS (original geometric SVG art)
   ============================================================ */
function ProjectVisual({ variant, className = "" }) {
  const common = "absolute inset-0 w-full h-full";
  if (variant === "churn")
    return (
      <div className={`relative overflow-hidden rounded-t-[18px] ${className}`} style={{ background: "linear-gradient(135deg,#F7E6E6,#E9F4EF)" }}>
        <svg viewBox="0 0 300 160" className={common} preserveAspectRatio="none">
          <polyline points="10,120 60,100 110,110 160,70 210,85 290,40" fill="none" stroke="#CF7F83" strokeWidth="3" strokeLinecap="round" />
          <polyline points="10,140 60,130 110,120 160,125 210,100 290,95" fill="none" stroke="#4B8B79" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
          {[10, 60, 110, 160, 210, 290].map((x, i) => (
            <circle key={i} cx={x} cy={[120, 100, 110, 70, 85, 40][i]} r="4" fill="#315C61" />
          ))}
        </svg>
      </div>
    );
  if (variant === "expense")
    return (
      <div className={`relative overflow-hidden rounded-t-[18px] ${className}`} style={{ background: "linear-gradient(135deg,#E9F4EF,#FAF7F3)" }}>
        <svg viewBox="0 0 300 160" className={common} preserveAspectRatio="none">
          <rect x="30" y="30" width="240" height="100" rx="14" fill="#FFFFFF" stroke="#E8E4DF" />
          <rect x="48" y="50" width="60" height="8" rx="4" fill="#9DCEBE" />
          <rect x="48" y="66" width="100" height="6" rx="3" fill="#E8E4DF" />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={48 + i * 40} y={100 - [30, 45, 20, 38, 26][i]} width="20" height={[30, 45, 20, 38, 26][i]} rx="4" fill={i % 2 ? "#E9A6A6" : "#315C61"} />
          ))}
        </svg>
      </div>
    );
  if (variant === "campus")
    return (
      <div className={`relative overflow-hidden rounded-t-[18px] ${className}`} style={{ background: "linear-gradient(135deg,#F1EEE9,#F7E6E6)" }}>
        <svg viewBox="0 0 300 160" className={common} preserveAspectRatio="none">
          <rect x="24" y="24" width="252" height="24" rx="8" fill="#315C61" />
          <circle cx="40" cy="36" r="4" fill="#E9A6A6" />
          <circle cx="54" cy="36" r="4" fill="#9DCEBE" />
          <rect x="24" y="60" width="118" height="76" rx="10" fill="#FFFFFF" stroke="#E8E4DF" />
          <rect x="154" y="60" width="118" height="36" rx="10" fill="#FFFFFF" stroke="#E8E4DF" />
          <rect x="154" y="100" width="118" height="36" rx="10" fill="#FFFFFF" stroke="#E8E4DF" />
          <rect x="38" y="76" width="90" height="8" rx="4" fill="#E9A6A6" />
          <rect x="38" y="92" width="70" height="6" rx="3" fill="#E8E4DF" />
          <rect x="38" y="106" width="80" height="6" rx="3" fill="#E8E4DF" />
        </svg>
      </div>
    );
  return (
    <div className={`relative overflow-hidden rounded-t-[18px] ${className}`} style={{ background: "linear-gradient(135deg,#E7EEEE,#E9F4EF)" }}>
      <svg viewBox="0 0 300 160" className={common} preserveAspectRatio="none">
        <rect x="120" y="30" width="60" height="60" rx="8" fill="#315C61" />
        <line x1="150" y1="90" x2="150" y2="120" stroke="#738083" strokeWidth="3" />
        <circle cx="90" cy="130" r="10" fill="#9DCEBE" />
        <circle cx="150" cy="135" r="10" fill="#E9A6A6" />
        <circle cx="210" cy="130" r="10" fill="#9DCEBE" />
        <line x1="90" y1="130" x2="150" y2="120" stroke="#CF7F83" strokeWidth="2" />
        <line x1="210" y1="130" x2="150" y2="120" stroke="#CF7F83" strokeWidth="2" />
        <path d="M135 55 q15 -12 30 0" fill="none" stroke="#9DCEBE" strokeWidth="3" />
      </svg>
    </div>
  );
}

const CATEGORY_ICON = { App: Smartphone, Website: Globe, Hardware: Cpu, Other: Briefcase };

const CERT_PALETTES = [
  { bg: "linear-gradient(135deg,#F7E6E6,#FAF7F3)", ribbon: "#CF7F83", seal: "#E9A6A6" },
  { bg: "linear-gradient(135deg,#E9F4EF,#FAF7F3)", ribbon: "#4B8B79", seal: "#9DCEBE" },
  { bg: "linear-gradient(135deg,#E7EEEE,#FAF7F3)", ribbon: "#315C61", seal: "#9DCEBE" },
];

function CertificateVisual({ index = 0, className = "" }) {
  const palette = CERT_PALETTES[index % CERT_PALETTES.length];
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: palette.bg }}>
      <svg viewBox="0 0 300 160" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <rect x="26" y="24" width="248" height="112" rx="10" fill="#FFFFFF" stroke="#E8E4DF" />
        <rect x="42" y="42" width="130" height="8" rx="4" fill="#315C61" />
        <rect x="42" y="58" width="90" height="6" rx="3" fill="#E8E4DF" />
        <rect x="42" y="72" width="110" height="6" rx="3" fill="#E8E4DF" />
        <circle cx="230" cy="90" r="26" fill={palette.seal} opacity="0.9" />
        <path d="M230 74 l5 11 12 1 -9 8 3 12 -11 -6 -11 6 3 -12 -9 -8 12 -1 z" fill="#FFFFFF" opacity="0.9" />
        <path d="M216 112 l-8 18 12 -4 6 10 8 -18z" fill={palette.ribbon} />
      </svg>
    </div>
  );
}

/* ============================================================
   HERO ILLUSTRATION (abstract, original)
   ============================================================ */
function HeroIllustration() {
  return (
    <svg viewBox="0 0 360 300" className="w-full h-full max-w-[360px]" aria-hidden="true">
      <defs>
        <linearGradient id="cardGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E9A6A6" />
          <stop offset="100%" stopColor="#9DCEBE" />
        </linearGradient>
      </defs>
      <rect x="70" y="70" width="170" height="120" rx="18" fill="#FFFFFF" stroke="#E8E4DF" />
      <circle cx="100" cy="100" r="14" fill="url(#cardGrad)" />
      <rect x="122" y="92" width="80" height="8" rx="4" fill="#315C61" />
      <rect x="122" y="106" width="55" height="6" rx="3" fill="#E8E4DF" />
      <rect x="86" y="132" width="200" height="6" rx="3" fill="#F1EEE9" />
      <rect x="86" y="146" width="150" height="6" rx="3" fill="#F1EEE9" />
      <rect x="86" y="160" width="170" height="6" rx="3" fill="#F1EEE9" />

      <g>
        <rect x="30" y="200" width="120" height="34" rx="17" fill="#E9A6A6" opacity="0.95" />
        <text x="90" y="222" textAnchor="middle" fontSize="13" fill="#FFFFFF" fontFamily="Inter, sans-serif" fontWeight="600">
          Python · L2
        </text>
      </g>

      <g transform="translate(230,150)">
        <rect x="0" y="0" width="70" height="90" rx="10" fill="#FFFFFF" stroke="#E8E4DF" />
        <rect x="12" y="14" width="46" height="6" rx="3" fill="#315C61" />
        <rect x="12" y="28" width="30" height="5" rx="2.5" fill="#E8E4DF" />
        <circle cx="35" cy="60" r="16" fill="none" stroke="#9DCEBE" strokeWidth="4" />
        <path d="M35 44 a16 16 0 0 1 0 32" fill="none" stroke="#4B8B79" strokeWidth="4" strokeLinecap="round" />
      </g>

      <polyline points="60,260 100,240 140,250 180,220 220,235 260,205" fill="none" stroke="#315C61" strokeWidth="3" strokeLinecap="round" />
      <circle cx="260" cy="205" r="5" fill="#CF7F83" />

      <g fill="#E9A6A6">
        <circle cx="40" cy="60" r="3" />
        <circle cx="330" cy="120" r="3" />
        <circle cx="300" cy="260" r="3" />
      </g>
      <g stroke="#9DCEBE" strokeWidth="2">
        <path d="M20 150 l6 0 M23 147 l0 6" strokeLinecap="round" />
        <path d="M310 60 l8 0 M314 56 l0 8" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/* ============================================================
   SIDEBAR
   ============================================================ */
function Sidebar({ activePage, onNavigate, mobileOpen, setMobileOpen }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {/* Desktop sidebar — expands on hover */}
      <aside
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        className={`hidden md:flex md:flex-col shrink-0 h-screen sticky top-0 bg-white border-r border-[#E8E4DF] py-6 transition-[width] duration-200 ease-out overflow-hidden z-40 ${
          expanded ? "w-20 shadow-[4px_0_20px_rgba(31,64,69,0.08)]" : "w-10"
        }`}
      >
        <div className="flex flex-col items-center gap-1.5 mb-6 px-1">
          <div className="w-8 h-8 shrink-0 rounded-xl bg-gradient-to-br from-[#E9A6A6] to-[#9DCEBE] flex items-center justify-center text-white font-bold text-xs">
            SV
          </div>
          {expanded && <p className="text-[9px] font-medium text-[#738083] leading-tight text-center">SkillVerse</p>}
        </div>

        <nav className="flex-1 px-1.5 space-y-1 overflow-y-auto overflow-x-hidden">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                aria-label={item.label}
                className={`w-full flex flex-col items-center gap-1 py-2 px-0.5 rounded-lg text-center transition-colors ${
                  active ? "bg-[#F7E6E6] text-[#CF7F83] font-medium" : "text-[#315C61] hover:bg-[#FAF7F3]"
                }`}
              >
                <Icon size={16} className={`shrink-0 ${active ? "text-[#CF7F83]" : "text-[#315C61]"}`} />
                {expanded && (
                  <span className="text-[8.5px] leading-[1.1] break-words">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="px-1.5 pt-3 mt-3 border-t border-[#E8E4DF]">
          <button
            onClick={() => onNavigate("profile")}
            className="w-full flex flex-col items-center gap-1 py-2 rounded-lg hover:bg-[#FAF7F3] transition-colors"
          >
            <div className="w-7 h-7 shrink-0 rounded-full bg-[#E7EEEE] border border-[#E8E4DF] flex items-center justify-center">
              <User size={13} className="text-[#315C61]" />
            </div>
            {expanded && <span className="text-[8.5px] text-[#1F4045] font-medium leading-tight">Rahul</span>}
          </button>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E8E4DF] flex items-center justify-around px-1 py-1.5">
        {NAV_ITEMS.slice(0, 4).map((item) => {
          const Icon = item.icon;
          const active = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg min-w-[56px] ${
                active ? "text-[#CF7F83]" : "text-[#738083]"
              }`}
              aria-label={item.label}
            >
              <Icon size={19} />
              <span className="text-[10px]">{item.label.split(" ")[0]}</span>
            </button>
          );
        })}
        <button
          onClick={() => setMobileOpen(true)}
          className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg text-[#738083]"
          aria-label="More navigation"
        >
          <Menu size={19} />
          <span className="text-[10px]">More</span>
        </button>
      </nav>

      {/* Mobile full menu sheet */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-[#1F4045]/40" onMouseDown={(e) => e.target === e.currentTarget && setMobileOpen(false)}>
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[22px] p-4 max-h-[75vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-3 px-2">
              <p className="font-semibold text-[#1F4045]">Menu</p>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="p-1.5 text-[#738083]">
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setMobileOpen(false);
                    }}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl text-xs ${
                      active ? "bg-[#F7E6E6] text-[#CF7F83]" : "text-[#315C61] hover:bg-[#FAF7F3]"
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ============================================================
   HEADER
   ============================================================ */
function Header({ title, onNavigate }) {
  return (
    <header className="sticky top-0 z-30 bg-[#FAF7F3]/90 backdrop-blur-sm border-b border-[#E8E4DF] px-4 sm:px-8 py-4 flex items-center gap-3">
      <div className="flex-1 min-w-0">
        {title ? (
          <h1 className="text-lg font-semibold text-[#1F4045] truncate">{title}</h1>
        ) : (
          <div className="relative max-w-md hidden sm:block">
            <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A2ACAE]" />
            <input
              type="text"
              placeholder="Search skills, certificates, projects…"
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[#E8E4DF] bg-white text-sm placeholder:text-[#A2ACAE] focus:outline-none focus:ring-2 focus:ring-[#E9A6A6]"
            />
          </div>
        )}
      </div>
      <div className="flex items-center gap-1.5 sm:gap-3">
        <button className="p-2 rounded-full hover:bg-white text-[#315C61] relative" aria-label="Notifications">
          <Bell size={19} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#CF7F83]" />
        </button>
        <button className="p-2 rounded-full hover:bg-white text-[#315C61] hidden sm:block" aria-label="Help">
          <HelpCircle size={19} />
        </button>
        <button onClick={() => onNavigate?.("profile")} className="flex items-center gap-1.5" aria-label="Profile">
          <div className="w-8 h-8 rounded-full bg-[#E7EEEE] border border-[#E8E4DF] flex items-center justify-center">
            <User size={15} className="text-[#315C61]" />
          </div>
          <ChevronDown size={15} className="text-[#738083] hidden sm:block" />
        </button>
      </div>
    </header>
  );
}

/* ============================================================
   ADD SKILL MODAL
   ============================================================ */
function AddSkillModal({ open, onClose, onSave }) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!name.trim()) {
      setError("Enter a skill name to continue.");
      return;
    }
    onSave({ id: Date.now(), name: name.trim(), level, verified, icon: Sparkles });
    setName("");
    setLevel("Beginner");
    setVerified(false);
    setError("");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Add a skill">
      <TextField
        label="Skill name"
        placeholder="e.g. Tableau"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError("");
        }}
      />
      {error && <p className="text-xs text-[#C15B5B] -mt-3 mb-4">{error}</p>}
      <div className="mb-4">
        <span className="block text-sm font-medium text-[#1F4045] mb-1.5">Level</span>
        <div className="flex gap-2">
          {["Beginner", "Intermediate", "Advanced"].map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLevel(l)}
              className={`flex-1 py-2 rounded-xl text-sm border transition-colors ${
                level === l ? "border-[#E9A6A6] bg-[#F7E6E6] text-[#CF7F83] font-medium" : "border-[#E8E4DF] text-[#738083]"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
      <label className="flex items-center gap-2.5 mb-6 cursor-pointer select-none">
        <input type="checkbox" checked={verified} onChange={(e) => setVerified(e.target.checked)} className="w-4 h-4 rounded accent-[#4B8B79]" />
        <span className="text-sm text-[#315C61]">Mark as assessed / verified</span>
      </label>
      <div className="flex gap-3">
        <PrimaryButton onClick={handleSave} className="flex-1">
          Save skill
        </PrimaryButton>
        <SecondaryButton onClick={onClose} className="flex-1">
          Cancel
        </SecondaryButton>
      </div>
    </Modal>
  );
}

/* ============================================================
   ADD PROJECT MODAL
   ============================================================ */
function AddProjectModal({ open, onClose, onSave }) {
  const empty = { title: "", category: "App", description: "", skills: "", github: "", demo: "" };
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSave = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required.";
    if (!form.category) errs.category = "Choose a category.";
    if (!form.description.trim()) errs.description = "Add a short description.";
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    const skillList = form.skills.split(",").map((s) => s.trim()).filter(Boolean);
    const usageList = skillList.length
      ? skillList.map((name, i) => ({
          name,
          value: Math.round(100 / skillList.length) - i, // gentle descending split, sums close to 100
        }))
      : [{ name: form.category, value: 100 }];

    onSave({
      id: Date.now(),
      title: form.title.trim(),
      category: form.category,
      description: form.description.trim(),
      skills: skillList,
      github: form.github || "https://github.com/",
      demo: form.demo || "https://example.com/",
      visual: "campus",
      usage: usageList,
    });
    setForm(empty);
    setErrors({});
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Add a project" wide>
      <TextField label="Project title" placeholder="e.g. Attendance Tracker" value={form.title} onChange={set("title")} />
      {errors.title && <p className="text-xs text-[#C15B5B] -mt-3 mb-4">{errors.title}</p>}
      <SelectField label="Category" options={["App", "Website", "Hardware", "Other"]} value={form.category} onChange={set("category")} />
      <TextArea label="Short description" rows={3} placeholder="What does this project do?" value={form.description} onChange={set("description")} />
      {errors.description && <p className="text-xs text-[#C15B5B] -mt-3 mb-4">{errors.description}</p>}
      <TextField label="Skills / technologies used (comma separated)" placeholder="React, Node.js, MongoDB" value={form.skills} onChange={set("skills")} />
      <div className="grid sm:grid-cols-2 gap-x-4">
        <TextField label="GitHub URL" placeholder="https://github.com/…" value={form.github} onChange={set("github")} />
        <TextField label="Demo URL" placeholder="https://…" value={form.demo} onChange={set("demo")} />
      </div>
      <div className="flex gap-3 mt-2">
        <PrimaryButton onClick={handleSave} className="flex-1">
          Save project
        </PrimaryButton>
        <SecondaryButton onClick={onClose} className="flex-1">
          Cancel
        </SecondaryButton>
      </div>
    </Modal>
  );
}

/* ============================================================
   PROJECTS SHOWCASE (hover-only floating tab preview)
   ============================================================ */
const TECH_CHART_COLORS = ["#CF7F83", "#4B8B79", "#315C61", "#E9A6A6", "#9DCEBE"];

function ProjectsShowcase({ projects, onAddProject }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [detailProject, setDetailProject] = useState(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  const hovered = useMemo(() => projects.find((p) => p.id === hoveredId) || null, [hoveredId, projects]);

  if (!projects.length) {
    return (
      <Card className="p-10 text-center">
        <FolderKanban size={30} className="mx-auto text-[#9DCEBE] mb-3" />
        <p className="text-[#1F4045] font-medium mb-1">No projects yet</p>
        <p className="text-sm text-[#738083] mb-4">Add your first project to start building your showcase.</p>
        <PrimaryButton onClick={() => setAddOpen(true)}>
          <Plus size={16} /> Add Project
        </PrimaryButton>
        <AddProjectModal open={addOpen} onClose={() => setAddOpen(false)} onSave={onAddProject} />
      </Card>
    );
  }

  const DetailIcon = hovered ? CATEGORY_ICON[hovered.category] || Briefcase : FolderKanban;
  const chartData = hovered?.usage || [];

  return (
    <Card className="p-5 sm:p-6">
      <SectionHeading
        title="Projects Showcase"
        action={
          <SecondaryButton onClick={() => setAddOpen(true)} className="!px-3.5 !py-2 text-xs">
            <Plus size={15} /> Add Project
          </SecondaryButton>
        }
      />
      <p className="text-sm text-[#738083] -mt-2 mb-5">
        {isTouch ? "Tap a project to see its details." : "Point at any project to preview it here."}
      </p>

      <div className="relative">
        {/* Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {projects.map((p) => {
            const isHovered = hoveredId === p.id;
            const dimmed = hoveredId && !isHovered && !isTouch;
            const Icon = CATEGORY_ICON[p.category] || Briefcase;
            return (
              <div key={p.id} className="relative">
                <button
                  onMouseEnter={() => setHoveredId(p.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setHoveredId(p.id)}
                  onBlur={() => setHoveredId(null)}
                  onClick={() => (isTouch ? setHoveredId(p.id) : setDetailProject(p))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setDetailProject(p);
                    }
                  }}
                  className={`group relative w-full text-left rounded-[16px] border overflow-hidden bg-white transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E9A6A6] focus-visible:ring-offset-2 ${
                    isHovered ? "shadow-[0_10px_24px_rgba(207,127,131,0.18)] -translate-y-0.5 border-[#E9A6A6]" : "border-[#E8E4DF]"
                  } ${dimmed ? "opacity-60" : "opacity-100"}`}
                >
                  <div className="h-20 relative">
                    <ProjectVisual variant={p.visual} className="h-full" />
                  </div>
                  <div className="p-2.5">
                    <p className="text-xs font-medium text-[#1F4045] truncate">{p.title}</p>
                    <p className="text-[11px] text-[#738083] flex items-center gap-1 mt-0.5">
                      <Icon size={10} /> {p.category}
                    </p>
                  </div>
                </button>

                {/* Floating tab — only exists while this tile is hovered/focused, gone otherwise */}
                {isHovered && !isTouch && (
                  <div
                    className="hidden lg:block absolute top-0 left-[calc(100%+10px)] w-72 z-40 animate-[tabPop_0.18s_ease] pointer-events-none"
                  >
                    <div className="rounded-[16px] border border-[#E8E4DF] bg-white shadow-[0_14px_32px_rgba(31,64,69,0.16)] overflow-hidden">
                      <div className="h-24 relative">
                        <ProjectVisual variant={p.visual} className="h-full" />
                      </div>
                      <div className="p-3.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#E7EEEE] text-[#315C61] mb-1.5">
                          <DetailIcon size={10} /> {p.category}
                        </span>
                        <p className="text-sm font-semibold text-[#1F4045] mb-1 leading-snug">{p.title}</p>
                        <p className="text-[11px] text-[#738083] mb-2.5 leading-relaxed line-clamp-2">{p.description}</p>

                        <p className="text-[10px] font-medium text-[#315C61] uppercase tracking-wide mb-1">Languages & tech used</p>
                        <div className="h-[84px] -ml-2">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={p.usage || []} layout="vertical" margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
                              <XAxis type="number" hide domain={[0, 100]} />
                              <YAxis
                                type="category"
                                dataKey="name"
                                width={76}
                                tick={{ fontSize: 9, fill: "#315C61" }}
                                axisLine={false}
                                tickLine={false}
                              />
                              <Bar dataKey="value" radius={[0, 5, 5, 0]} barSize={8}>
                                {(p.usage || []).map((entry, i) => (
                                  <Cell key={entry.name} fill={TECH_CHART_COLORS[i % TECH_CHART_COLORS.length]} />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                        <p className="text-[10px] text-[#CF7F83] font-medium mt-2">Click the tile for full details →</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile/tablet: tapped preview shown inline below the grid */}
        {isTouch && hovered && (
          <div key={hovered.id} className="lg:hidden mt-4 rounded-[16px] border border-[#E8E4DF] bg-[#FAF7F3] overflow-hidden animate-[detailFade_0.25s_ease]">
            <div className="h-28 relative">
              <ProjectVisual variant={hovered.visual} className="h-full" />
            </div>
            <div className="p-4">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#E7EEEE] text-[#315C61] mb-2">
                <DetailIcon size={12} /> {hovered.category}
              </span>
              <p className="text-sm font-semibold text-[#1F4045] mb-1.5">{hovered.title}</p>
              <p className="text-xs text-[#738083] mb-3">{hovered.description}</p>
              <div className="h-[100px] -ml-2 mb-3">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 12, left: 0, bottom: 0 }}>
                    <XAxis type="number" hide domain={[0, 100]} />
                    <YAxis type="category" dataKey="name" width={84} tick={{ fontSize: 10, fill: "#315C61" }} axisLine={false} tickLine={false} />
                    <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={10}>
                      {chartData.map((entry, i) => (
                        <Cell key={entry.name} fill={TECH_CHART_COLORS[i % TECH_CHART_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <PrimaryButton onClick={() => setDetailProject(hovered)} className="!px-3 !py-1.5 text-xs">
                View Details
              </PrimaryButton>
            </div>
          </div>
        )}
      </div>

      <AddProjectModal open={addOpen} onClose={() => setAddOpen(false)} onSave={onAddProject} />
      {detailProject && (
        <Modal open={!!detailProject} onClose={() => setDetailProject(null)} title={detailProject.title} wide>
          <div className="h-44 rounded-[16px] overflow-hidden mb-4">
            <ProjectVisual variant={detailProject.visual} className="h-full" />
          </div>
          <p className="text-sm text-[#738083] mb-4 leading-relaxed">{detailProject.description}</p>
          <div className="flex flex-wrap gap-1.5 mb-5">
            {detailProject.skills.map((s) => (
              <span key={s} className="px-2.5 py-1 rounded-full text-xs bg-[#FAF7F3] border border-[#E8E4DF] text-[#315C61]">
                {s}
              </span>
            ))}
          </div>
          <div className="flex gap-2.5">
            <a href={detailProject.github} target="_blank" rel="noopener noreferrer">
              <SecondaryButton>
                <Github size={15} /> GitHub
              </SecondaryButton>
            </a>
            <a href={detailProject.demo} target="_blank" rel="noopener noreferrer">
              <SecondaryButton>
                <ExternalLink size={15} /> Live Demo
              </SecondaryButton>
            </a>
          </div>
        </Modal>
      )}
    </Card>
  );
}

/* ============================================================
   DASHBOARD PAGE
   ============================================================ */
function DashboardPage({ skills, projects, onAddSkill, onAddProject, onNavigate, avatar }) {
  const [skillModal, setSkillModal] = useState(false);
  const verifiedCount = skills.filter((s) => s.verified).length;

  return (
    <div className="space-y-6">
      {/* HERO */}
      <Card className="overflow-hidden">
        <div className="grid lg:grid-cols-[1.3fr_1fr] items-center">
          <div className="p-7 sm:p-10">
            <p className="text-xs font-medium text-[#CF7F83] mb-2 tracking-wide">Your SkillVerse journey</p>
            <div className="flex items-center justify-between gap-4 mb-2">
              <h2 className="text-3xl sm:text-4xl font-semibold text-[#1F4045]">Hi, Rahul!</h2>
              <img
                src={avatar}
                alt="Rahul Sharma"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white shadow-[0_4px_16px_rgba(31,64,69,0.14)] shrink-0"
              />
            </div>
            <p className="text-base text-[#315C61] mb-3">Build your future, one skill at a time.</p>
            <p className="text-sm text-[#738083] mb-4 max-w-md leading-relaxed">
              Your skills, achievements, projects, certificates, and career progress—all in one place.
            </p>
            <p className="text-sm text-[#315C61] font-medium mb-5">B.Tech Computer Science · Semester 5 · ABC University</p>

            <div className="mb-6 max-w-xs">
              <div className="flex justify-between text-xs text-[#738083] mb-1.5">
                <span>Profile completion</span>
                <span className="font-medium text-[#1F4045]">78%</span>
              </div>
              <ProgressBar value={78} colorClass="bg-[#E9A6A6]" />
            </div>

            <div className="flex flex-wrap gap-3">
              <PrimaryButton onClick={() => onNavigate("profile")}>View My Profile</PrimaryButton>
              <SecondaryButton onClick={() => onNavigate("gap")}>Explore Career Readiness</SecondaryButton>
            </div>
          </div>
          <div className="hidden lg:flex items-center justify-center p-6 h-full bg-gradient-to-br from-[#F7E6E6]/60 to-[#E9F4EF]/60">
            <HeroIllustration />
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Career Readiness */}
        <Card className="p-6 lg:col-span-1">
          <SectionHeading title="Career Readiness" />
          <div className="flex items-center gap-4 mb-4">
            <CircularProgress value={72} label="Ready" />
            <div>
              <p className="text-xs text-[#738083]">Target career</p>
              <p className="text-base font-medium text-[#1F4045]">Data Analyst</p>
            </div>
          </div>
          <p className="text-sm text-[#4B8B79] mb-4">You are making strong progress toward your career goal.</p>

          <div className="space-y-3 mb-4">
            {[
              { label: "Academic", value: 78 },
              { label: "Technical Skills", value: 65 },
              { label: "Soft Skills", value: 74 },
              { label: "Practical Experience", value: 60 },
            ].map((m) => (
              <div key={m.label}>
                <div className="flex justify-between text-xs text-[#315C61] mb-1">
                  <span>{m.label}</span>
                  <span className="font-medium">{m.value}%</span>
                </div>
                <ProgressBar value={m.value} />
              </div>
            ))}
          </div>
          <button onClick={() => onNavigate("gap")} className="text-sm text-[#CF7F83] font-medium hover:underline">
            View Analysis →
          </button>
          <p className="text-xs text-[#738083] mt-3 leading-relaxed border-t border-[#E8E4DF] pt-3">
            Your score is calculated using your academic profile, demonstrated skills, projects, experience, and
            assessment results. This is a transparent, rule-based MVP score — not an ML prediction.
          </p>
        </Card>

        {/* Skills & Badges */}
        <Card className="p-6 lg:col-span-1">
          <SectionHeading
            title="Top Skills & Badges"
            action={
              <SecondaryButton onClick={() => setSkillModal(true)} className="!px-3 !py-1.5 text-xs">
                <Plus size={14} /> Add
              </SecondaryButton>
            }
          />
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.slice(0, 7).map((s) => (
              <span key={s.id} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E8E4DF] bg-[#FAF7F3] text-xs">
                <s.icon size={12} className="text-[#315C61]" />
                <span className="text-[#1F4045] font-medium">{s.name}</span>
                <LevelBadge level={s.level} />
                {s.verified && <BadgeCheck size={13} className="text-[#4B8B79]" />}
              </span>
            ))}
          </div>
          <p className="text-xs text-[#738083] mb-3">{verifiedCount} of {skills.length} skills assessed</p>
          <button onClick={() => onNavigate("skills")} className="text-sm text-[#CF7F83] font-medium hover:underline">
            View All Skills →
          </button>
        </Card>

        {/* Skill Gap */}
        <Card className="p-6 lg:col-span-1">
          <SectionHeading title="Priority Skill Gaps" />
          <div className="space-y-2.5 mb-4">
            {GAP_DATA.slice(0, 4).map((g) => (
              <div key={g.skill} className="flex items-center justify-between gap-2 text-sm">
                <span className="text-[#1F4045] truncate">{g.skill}</span>
                <PriorityBadge priority={gapPriority(g.curVal, g.reqVal)} />
              </div>
            ))}
          </div>
          <p className="text-xs text-[#738083] mb-3">Focus on high-priority gaps first to improve your Data Analyst readiness.</p>
          <button onClick={() => onNavigate("gap")} className="text-sm text-[#CF7F83] font-medium hover:underline">
            View Full Skill Gap Analysis →
          </button>
        </Card>
      </div>

      {/* Projects showcase */}
      <ProjectsShowcase projects={projects} onAddProject={onAddProject} />

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Certificates */}
        <Card className="p-6">
          <SectionHeading title="Recent Certificates" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            {[
              { label: "Certificates", value: 6 },
              { label: "Projects", value: 4 },
              { label: "Internships", value: 2 },
              { label: "Skill Badges", value: 8 },
            ].map((c) => (
              <div key={c.label} className="text-center p-2.5 rounded-xl bg-[#FAF7F3]">
                <p className="text-xl font-semibold text-[#1F4045]">{c.value}</p>
                <p className="text-[11px] text-[#738083]">{c.label}</p>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {CERTIFICATES.map((c) => (
              <div key={c.id} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E7EEEE] flex items-center justify-center shrink-0">
                  <FileBadge size={18} className="text-[#315C61]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1F4045] truncate">{c.title}</p>
                  <p className="text-xs text-[#738083]">{c.org} · {c.date}</p>
                </div>
                {c.verified && <BadgeCheck size={16} className="text-[#4B8B79] shrink-0" />}
              </div>
            ))}
          </div>
        </Card>

        {/* Growth chart */}
        <Card className="p-6">
          <SectionHeading title="Growth Progress" />
          <div className="h-44" role="img" aria-label="Line chart showing career readiness score rising from 61% in September to 81% in March">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={PROGRESS_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="#F1EEE9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#738083" }} axisLine={{ stroke: "#E8E4DF" }} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#738083" }} axisLine={false} tickLine={false} domain={[40, 100]} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E8E4DF" }} />
                <Line type="monotone" dataKey="score" stroke="#4B8B79" strokeWidth={3} dot={{ fill: "#9DCEBE", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-[#4B8B79] mt-2">Your readiness score has improved by 20% over the last 6 months.</p>
        </Card>
      </div>

      <AddSkillModal open={skillModal} onClose={() => setSkillModal(false)} onSave={onAddSkill} />
    </div>
  );
}

/* ============================================================
   PROFILE PAGE
   ============================================================ */
function ProfilePage({ profile, setProfile, avatar, setAvatar, showToast }) {
  const [form, setForm] = useState(profile);
  const fileRef = useRef(null);

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const save = () => {
    setProfile(form);
    showToast("Profile changes saved.");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <Card className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="text-center">
            <img src={avatar} alt="Profile" className="w-24 h-24 rounded-full object-cover border-2 border-[#E8E4DF] mb-3" />
            <div className="flex gap-2 justify-center flex-wrap">
              <SecondaryButton onClick={() => fileRef.current?.click()} className="!px-3 !py-1.5 text-xs">
                <Camera size={13} /> {avatar.includes("blob:") ? "Change Photo" : "Upload Photo"}
              </SecondaryButton>
              {avatar.includes("blob:") && (
                <button
                  onClick={() => setAvatar(DEFAULT_AVATAR)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs text-[#C15B5B] hover:bg-[#FBEAEA] transition-colors"
                >
                  <Trash2 size={13} /> Remove
                </button>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handlePhoto} />
            <p className="text-[11px] text-[#738083] mt-2 max-w-[160px]">Upload a JPG, PNG, or WebP image.</p>
          </div>

          <div className="flex-1 w-full grid sm:grid-cols-2 gap-x-4">
            <TextField label="Full name" value={form.name} onChange={set("name")} />
            <TextField label="College / University" value={form.college} onChange={set("college")} />
            <TextField label="Degree" value={form.degree} onChange={set("degree")} />
            <TextField label="Department" value={form.department} onChange={set("department")} />
            <TextField label="Current year / semester" value={form.year} onChange={set("year")} />
            <TextField label="Location" value={form.location} onChange={set("location")} />
            <TextField label="Email" type="email" value={form.email} onChange={set("email")} />
          </div>
        </div>
        <TextArea label="Short professional introduction" rows={3} value={form.bio} onChange={set("bio")} className="mt-2" />
      </Card>

      <Card className="p-6 sm:p-8">
        <SectionHeading title="Academic details" />
        <div className="grid sm:grid-cols-2 gap-x-4">
          <TextField label="CGPA" value={form.cgpa} onChange={set("cgpa")} />
        </div>
        <div className="mb-4">
          <span className="block text-sm font-medium text-[#1F4045] mb-1.5">Relevant coursework</span>
          <div className="flex flex-wrap gap-2">
            {COURSEWORK.map((c) => (
              <span key={c} className="px-3 py-1.5 rounded-full text-xs bg-[#E7EEEE] text-[#315C61]">
                {c}
              </span>
            ))}
          </div>
        </div>
        <TextArea label="Academic achievements" rows={2} value={form.achievements} onChange={set("achievements")} />
      </Card>

      <Card className="p-6 sm:p-8">
        <SectionHeading title="Career goal" />
        <SelectField label="Target career" options={CAREER_OPTIONS} value={form.careerGoal} onChange={set("careerGoal")} />
      </Card>

      <div className="flex gap-3 pb-4">
        <PrimaryButton onClick={save}>Save Changes</PrimaryButton>
        <SecondaryButton onClick={() => setForm(profile)}>Cancel</SecondaryButton>
      </div>
    </div>
  );
}

/* ============================================================
   SKILLS & BADGES PAGE
   ============================================================ */
function SkillsPage({ skills, onAddSkill }) {
  const [modal, setModal] = useState(false);
  const verifiedCount = skills.filter((s) => s.verified).length;
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <SectionHeading
          title="Skills & Badges"
          action={
            <PrimaryButton onClick={() => setModal(true)} className="!px-4 !py-2 text-sm">
              <Plus size={15} /> Add Skill
            </PrimaryButton>
          }
        />
        <p className="text-sm text-[#738083] mb-5">{verifiedCount} of {skills.length} skills assessed</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {skills.map((s) => (
            <div key={s.id} className="flex items-center gap-3 p-3.5 rounded-xl border border-[#E8E4DF] bg-[#FAF7F3]">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E8E4DF] flex items-center justify-center shrink-0">
                <s.icon size={17} className="text-[#315C61]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#1F4045] truncate">{s.name}</p>
                <LevelBadge level={s.level} />
              </div>
              {s.verified && <BadgeCheck size={17} className="text-[#4B8B79] shrink-0" />}
            </div>
          ))}
        </div>
      </Card>
      <AddSkillModal open={modal} onClose={() => setModal(false)} onSave={onAddSkill} />
    </div>
  );
}

/* ============================================================
   SKILL GAP / CAREER READINESS PAGE
   ============================================================ */
function GapAnalysisPage({ careerGoal }) {
  return (
    <div className="space-y-6">
      <Card className="p-6 sm:p-8">
        <SectionHeading title={`Career Readiness — ${careerGoal}`} />
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
          <CircularProgress value={72} size={120} label="Ready" />
          <div className="flex-1 space-y-3 w-full">
            {[
              { label: "Academic", value: 78 },
              { label: "Technical Skills", value: 65 },
              { label: "Soft Skills", value: 74 },
              { label: "Practical Experience", value: 60 },
            ].map((m) => (
              <div key={m.label}>
                <div className="flex justify-between text-xs text-[#315C61] mb-1">
                  <span>{m.label}</span>
                  <span className="font-medium">{m.value}%</span>
                </div>
                <ProgressBar value={m.value} />
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-[#738083] border-t border-[#E8E4DF] pt-4">
          This is a transparent, rule-based MVP score calculated from your academic profile, demonstrated skills,
          projects, experience, and assessment results — not an ML prediction.
        </p>
      </Card>

      <Card className="p-6 sm:p-8">
        <SectionHeading title="Full Skill Gap Analysis" />
        <p className="text-sm text-[#738083] mb-5">
          Levels are scored Beginner = 1, Intermediate = 2, Advanced = 3. A gap of 2+ is High priority, a gap of 1 is
          Medium, and a gap of 0 or less is Ready.
        </p>
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-sm min-w-[520px]">
            <thead>
              <tr className="text-left text-xs text-[#738083] border-b border-[#E8E4DF]">
                <th className="py-2.5 px-2 font-medium">Skill</th>
                <th className="py-2.5 px-2 font-medium">Current level</th>
                <th className="py-2.5 px-2 font-medium">Required level</th>
                <th className="py-2.5 px-2 font-medium">Priority</th>
              </tr>
            </thead>
            <tbody>
              {GAP_DATA.map((g) => (
                <tr key={g.skill} className="border-b border-[#F1EEE9] last:border-0">
                  <td className="py-3 px-2 text-[#1F4045] font-medium">{g.skill}</td>
                  <td className="py-3 px-2 text-[#738083]">{g.current}</td>
                  <td className="py-3 px-2 text-[#738083]">{g.required}</td>
                  <td className="py-3 px-2">
                    <PriorityBadge priority={gapPriority(g.curVal, g.reqVal)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* ============================================================
   PROJECTS PAGE (full)
   ============================================================ */
function ProjectsPage({ projects, onAddProject }) {
  return (
    <div className="space-y-6">
      <ProjectsShowcase projects={projects} onAddProject={onAddProject} />
    </div>
  );
}

/* ============================================================
   CERTIFICATES PAGE (full)
   ============================================================ */
function CertificatesPage() {
  return (
    <Card className="p-6 sm:p-8">
      <SectionHeading title="Certificates & Achievements" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Certificates", value: 6 },
          { label: "Projects", value: 4 },
          { label: "Internships", value: 2 },
          { label: "Skill Badges", value: 8 },
        ].map((c) => (
          <div key={c.label} className="text-center p-4 rounded-xl bg-[#FAF7F3]">
            <p className="text-2xl font-semibold text-[#1F4045]">{c.value}</p>
            <p className="text-xs text-[#738083]">{c.label}</p>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        {CERTIFICATES.map((c) => (
          <div key={c.id} className="flex items-center gap-3.5 p-3.5 rounded-xl border border-[#E8E4DF]">
            <div className="w-11 h-11 rounded-xl bg-[#E7EEEE] flex items-center justify-center shrink-0">
              <FileBadge size={19} className="text-[#315C61]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#1F4045]">{c.title}</p>
              <p className="text-xs text-[#738083]">{c.org} · {c.date}</p>
            </div>
            {c.verified && (
              <span className="hidden sm:inline-flex items-center gap-1 text-xs text-[#4B8B79] font-medium">
                <BadgeCheck size={14} /> Verified
              </span>
            )}
            <button className="text-xs text-[#CF7F83] font-medium hover:underline shrink-0">View Certificate</button>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ============================================================
   PROGRESS PAGE (full)
   ============================================================ */
function ProgressPage() {
  return (
    <div className="space-y-6">
      <Card className="p-6 sm:p-8">
        <SectionHeading title="Growth Progress" />
        <div className="h-64" role="img" aria-label="Line chart showing career readiness score rising from 61% in September to 81% in March">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={PROGRESS_DATA} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid stroke="#F1EEE9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#738083" }} axisLine={{ stroke: "#E8E4DF" }} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#738083" }} axisLine={false} tickLine={false} domain={[40, 100]} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E8E4DF" }} />
              <Line type="monotone" dataKey="score" stroke="#4B8B79" strokeWidth={3} dot={{ fill: "#9DCEBE", r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-[#4B8B79] mt-2">Your readiness score has improved by 20% over the last 6 months.</p>
      </Card>

      <Card className="p-6 sm:p-8">
        <SectionHeading title="Badge & skill progression" />
        <div className="space-y-3">
          {BADGE_PROGRESSION.map((b) => (
            <div key={b.skill} className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF7F3]">
              <span className="text-sm font-medium text-[#1F4045]">{b.skill}</span>
              <div className="flex items-center gap-2 text-xs">
                <LevelBadge level={b.from} />
                <ArrowRight size={13} className="text-[#9DCEBE]" />
                <LevelBadge level={b.to} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ============================================================
   SIMPLE PLACEHOLDER PAGES
   ============================================================ */
function AssessmentsPage({ skills }) {
  return (
    <Card className="p-6 sm:p-8">
      <SectionHeading title="Assessments" />
      <p className="text-sm text-[#738083] mb-5">Skill assessments verify what you can actually do.</p>
      <div className="space-y-2.5">
        {skills.map((s) => (
          <div key={s.id} className="flex items-center justify-between p-3.5 rounded-xl border border-[#E8E4DF]">
            <div className="flex items-center gap-3">
              <s.icon size={16} className="text-[#315C61]" />
              <span className="text-sm font-medium text-[#1F4045]">{s.name}</span>
            </div>
            {s.verified ? (
              <span className="inline-flex items-center gap-1 text-xs text-[#4B8B79] font-medium">
                <BadgeCheck size={14} /> Assessed
              </span>
            ) : (
              <SecondaryButton className="!px-3 !py-1.5 text-xs">Take Assessment</SecondaryButton>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

function CareerGoalPage({ profile, setProfile, showToast }) {
  const [goal, setGoal] = useState(profile.careerGoal);
  return (
    <Card className="p-6 sm:p-8 max-w-lg">
      <SectionHeading title="Career Goal" />
      <p className="text-sm text-[#738083] mb-5">Your target career shapes your Career Readiness score and skill-gap analysis.</p>
      <SelectField label="Target career" options={CAREER_OPTIONS} value={goal} onChange={(e) => setGoal(e.target.value)} />
      <PrimaryButton
        onClick={() => {
          setProfile({ ...profile, careerGoal: goal });
          showToast("Career goal updated.");
        }}
      >
        Save Career Goal
      </PrimaryButton>
    </Card>
  );
}

function SettingsPage() {
  return (
    <Card className="p-10 text-center max-w-lg mx-auto">
      <Settings size={28} className="mx-auto text-[#9DCEBE] mb-3" />
      <p className="text-[#1F4045] font-medium mb-1">Settings</p>
      <p className="text-sm text-[#738083]">Account and notification settings are coming soon.</p>
    </Card>
  );
}

/* ============================================================
   AVATAR / GLOBAL STATE
   ============================================================ */
const DEFAULT_AVATAR =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
  <svg xmlns='http://www.w3.org/2000/svg' width='96' height='96'>
    <rect width='96' height='96' rx='48' fill='#E7EEEE'/>
    <circle cx='48' cy='38' r='17' fill='#315C61'/>
    <path d='M14 90c4-22 22-32 34-32s30 10 34 32' fill='#315C61'/>
  </svg>`);

const PAGE_TITLES = {
  dashboard: null,
  profile: "My Profile",
  skills: "Skills & Badges",
  assessments: "Assessments",
  goal: "Career Goal",
  gap: "Skill Gap Analysis",
  projects: "Projects",
  certificates: "Certificates",
  progress: "Progress",
  settings: "Settings",
};

/* ============================================================
   ROOT APP
   ============================================================ */
export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [avatar, setAvatar] = useState(DEFAULT_AVATAR);
  const [skills, setSkills] = useState(INITIAL_SKILLS);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [profile, setProfile] = useState({
    name: "Rahul Sharma",
    college: "ABC University",
    degree: "B.Tech",
    department: "Computer Science",
    year: "3rd Year · Semester 5",
    location: "Bengaluru, India",
    email: "rahul.sharma@example.edu",
    bio: "Aspiring data analyst passionate about turning raw data into clear, actionable insight.",
    cgpa: "8.2",
    achievements: "Dean's List — Semester 4; Runner-up, Inter-college Data Hackathon 2025.",
    careerGoal: "Data Analyst",
  });

  const showToast = useCallback((message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 2600);
  }, []);

  const handleAddSkill = (skill) => {
    setSkills((prev) => [skill, ...prev]);
    showToast("Skill added.");
  };
  const handleAddProject = (project) => {
    setProjects((prev) => [project, ...prev]);
    showToast("Project added.");
  };

  useEffect(() => {
    document.title = "SkillVerse";
  }, []);

  let page;
  switch (activePage) {
    case "profile":
      page = <ProfilePage profile={profile} setProfile={setProfile} avatar={avatar} setAvatar={setAvatar} showToast={showToast} />;
      break;
    case "skills":
      page = <SkillsPage skills={skills} onAddSkill={handleAddSkill} />;
      break;
    case "assessments":
      page = <AssessmentsPage skills={skills} />;
      break;
    case "goal":
      page = <CareerGoalPage profile={profile} setProfile={setProfile} showToast={showToast} />;
      break;
    case "gap":
      page = <GapAnalysisPage careerGoal={profile.careerGoal} />;
      break;
    case "projects":
      page = <ProjectsPage projects={projects} onAddProject={handleAddProject} />;
      break;
    case "certificates":
      page = <CertificatesPage />;
      break;
    case "progress":
      page = <ProgressPage />;
      break;
    case "settings":
      page = <SettingsPage />;
      break;
    default:
      page = (
        <DashboardPage
          skills={skills}
          projects={projects}
          onAddSkill={handleAddSkill}
          onAddProject={handleAddProject}
          onNavigate={setActivePage}
          avatar={avatar}
        />
      );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F3] font-[Inter,sans-serif] flex" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap');
        h1, h2, h3, .font-display { font-family: 'Poppins', Inter, sans-serif; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes detailFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes tabPop { from { opacity: 0; transform: translateX(-6px) scale(0.97); } to { opacity: 1; transform: translateX(0) scale(1); } }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
        }
      `}</style>

      <Sidebar activePage={activePage} onNavigate={setActivePage} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="flex-1 min-w-0 pb-20 md:pb-0">
        <Header
          onNavigate={setActivePage}
          title={activePage === "dashboard" ? null : PAGE_TITLES[activePage]}
        />
        {activePage === "dashboard" && (
          <div className="px-4 sm:px-8 pt-5">
            <p className="text-sm text-[#738083]">Good afternoon, Rahul</p>
          </div>
        )}
        <main className="p-4 sm:p-8 pt-4">{page}</main>
      </div>

      <Toast show={toast.show} message={toast.message} />
    </div>
  );
}
