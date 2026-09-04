import React from "react";
import { Smartphone, Globe, Cpu, Briefcase } from "lucide-react";
import { CERT_PALETTES } from "../../constants/colors";

export const CATEGORY_ICON = {
  App: Smartphone,
  Website: Globe,
  Hardware: Cpu,
  Other: Briefcase,
};

export function ProjectVisual({ variant, className = "" }) {
  const common = "absolute inset-0 w-full h-full";
  if (variant === "churn") {
    return (
      <div className={`relative overflow-hidden rounded-t-[18px] ${className}`} style={{ background: "linear-gradient(135deg,#FCEBEF,#FFFFFF)" }}>
        <svg viewBox="0 0 300 160" className={common} preserveAspectRatio="none">
          <polyline points="10,120 60,100 110,110 160,70 210,85 290,40" fill="none" stroke="#BA203B" strokeWidth="3" strokeLinecap="round" />
          <polyline points="10,140 60,130 110,120 160,125 210,100 290,95" fill="none" stroke="#101218" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
          {[10, 60, 110, 160, 210, 290].map((x, i) => (
            <circle key={i} cx={x} cy={[120, 100, 110, 70, 85, 40][i]} r="4" fill="#831124" />
          ))}
        </svg>
      </div>
    );
  }
  if (variant === "expense") {
    return (
      <div className={`relative overflow-hidden rounded-t-[18px] ${className}`} style={{ background: "linear-gradient(135deg,#F8F6F8,#FCEBEF)" }}>
        <svg viewBox="0 0 300 160" className={common} preserveAspectRatio="none">
          <rect x="30" y="30" width="240" height="100" rx="14" fill="#FFFFFF" stroke="#E9E2E5" />
          <rect x="48" y="50" width="60" height="8" rx="4" fill="#BA203B" />
          <rect x="48" y="66" width="100" height="6" rx="3" fill="#E9E2E5" />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={48 + i * 40} y={100 - [30, 45, 20, 38, 26][i]} width="20" height={[30, 45, 20, 38, 26][i]} rx="4" fill={i % 2 ? "#BA203B" : "#101218"} />
          ))}
        </svg>
      </div>
    );
  }
  if (variant === "campus") {
    return (
      <div className={`relative overflow-hidden rounded-t-[18px] ${className}`} style={{ background: "linear-gradient(135deg,#F5ECEF,#FCEBEF)" }}>
        <svg viewBox="0 0 300 160" className={common} preserveAspectRatio="none">
          <rect x="24" y="24" width="252" height="24" rx="8" fill="#101218" />
          <circle cx="40" cy="36" r="4" fill="#BA203B" />
          <circle cx="54" cy="36" r="4" fill="#E23E5B" />
          <rect x="24" y="60" width="118" height="76" rx="10" fill="#FFFFFF" stroke="#E9E2E5" />
          <rect x="154" y="60" width="118" height="36" rx="10" fill="#FFFFFF" stroke="#E9E2E5" />
          <rect x="154" y="100" width="118" height="36" rx="10" fill="#FFFFFF" stroke="#E9E2E5" />
          <rect x="38" y="76" width="90" height="8" rx="4" fill="#BA203B" />
          <rect x="38" y="92" width="70" height="6" rx="3" fill="#E9E2E5" />
          <rect x="38" y="106" width="80" height="6" rx="3" fill="#E9E2E5" />
        </svg>
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden rounded-t-[18px] ${className}`} style={{ background: "linear-gradient(135deg,#FCEBEF,#F8F6F8)" }}>
      <svg viewBox="0 0 300 160" className={common} preserveAspectRatio="none">
        <rect x="120" y="30" width="60" height="60" rx="8" fill="#101218" />
        <line x1="150" y1="90" x2="150" y2="120" stroke="#707584" strokeWidth="3" />
        <circle cx="90" cy="130" r="10" fill="#BA203B" />
        <circle cx="150" cy="135" r="10" fill="#E23E5B" />
        <circle cx="210" cy="130" r="10" fill="#831124" />
        <line x1="90" y1="130" x2="150" y2="120" stroke="#BA203B" strokeWidth="2" />
        <line x1="210" y1="130" x2="150" y2="120" stroke="#BA203B" strokeWidth="2" />
        <path d="M135 55 q15 -12 30 0" fill="none" stroke="#BA203B" strokeWidth="3" />
      </svg>
    </div>
  );
}

export function CertificateVisual({ index = 0, className = "" }) {
  const palette = CERT_PALETTES[index % CERT_PALETTES.length];
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: palette.bg }}>
      <svg viewBox="0 0 300 160" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <rect x="26" y="24" width="248" height="112" rx="10" fill="#FFFFFF" stroke="#E9E2E5" />
        <rect x="42" y="42" width="130" height="8" rx="4" fill="#101218" />
        <rect x="42" y="58" width="90" height="6" rx="3" fill="#E9E2E5" />
        <rect x="42" y="72" width="110" height="6" rx="3" fill="#E9E2E5" />
        <circle cx="230" cy="90" r="26" fill={palette.seal} opacity="0.9" />
        <path d="M230 74 l5 11 12 1 -9 8 3 12 -11 -6 -11 6 3 -12 -9 -8 12 -1 z" fill="#FFFFFF" opacity="0.9" />
        <path d="M216 112 l-8 18 12 -4 6 10 8 -18z" fill={palette.ribbon} />
      </svg>
    </div>
  );
}

export function HeroIllustration() {
  return (
    <svg viewBox="0 0 360 300" className="w-full h-full max-w-[360px]" aria-hidden="true">
      <defs>
        <linearGradient id="heroCrimsonGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E23E5B" />
          <stop offset="100%" stopColor="#831124" />
        </linearGradient>
        <linearGradient id="heroDarkGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1C1F2B" />
          <stop offset="100%" stopColor="#101218" />
        </linearGradient>
      </defs>

      {/* Main Card */}
      <rect x="70" y="70" width="170" height="120" rx="18" fill="#FFFFFF" stroke="#E9E2E5" filter="drop-shadow(0 10px 25px rgba(186,32,59,0.08))" />
      <circle cx="100" cy="100" r="14" fill="url(#heroCrimsonGrad)" />
      <rect x="122" y="92" width="80" height="8" rx="4" fill="#101218" />
      <rect x="122" y="106" width="55" height="6" rx="3" fill="#E9E2E5" />
      <rect x="86" y="132" width="200" height="6" rx="3" fill="#FAF8F9" />
      <rect x="86" y="146" width="150" height="6" rx="3" fill="#FAF8F9" />
      <rect x="86" y="160" width="170" height="6" rx="3" fill="#FAF8F9" />


      {/* Floating Badge 2: Python L2 */}
      <g>
        <rect x="30" y="200" width="120" height="34" rx="17" fill="url(#heroCrimsonGrad)" />
        <text x="90" y="222" textAnchor="middle" fontSize="12" fill="#FFFFFF" fontFamily="Inter, sans-serif" fontWeight="700" letterSpacing="0.5">
          Python · L2
        </text>
      </g>

      {/* Pixel Grid Pattern Accent (SkillVerse mark tribute) */}
      <g fill="#BA203B">
        <rect x="280" y="90" width="8" height="8" rx="2" />
        <rect x="292" y="90" width="8" height="8" rx="2" />
        <rect x="280" y="102" width="8" height="8" rx="2" />
        <rect x="292" y="102" width="8" height="8" rx="2" />
        <rect x="304" y="90" width="8" height="8" rx="2" />
      </g>

      {/* Small Stat Card */}
      <g transform="translate(230,140)">
        <rect x="0" y="0" width="76" height="96" rx="12" fill="#FFFFFF" stroke="#E9E2E5" />
        <rect x="12" y="14" width="46" height="6" rx="3" fill="#101218" />
        <rect x="12" y="26" width="30" height="5" rx="2.5" fill="#E9E2E5" />
        <circle cx="38" cy="62" r="18" fill="none" stroke="#FCEBEF" strokeWidth="4" />
        <path d="M38 44 a18 18 0 0 1 15 28" fill="none" stroke="#BA203B" strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* Trajectory Curve */}
      <polyline points="60,260 100,240 140,250 180,220 220,235 260,205" fill="none" stroke="#BA203B" strokeWidth="3" strokeLinecap="round" />
      <circle cx="260" cy="205" r="5" fill="#831124" />

      {/* Star Nodes */}
      <g fill="#BA203B">
        <circle cx="40" cy="60" r="3" />
        <circle cx="330" cy="120" r="3" />
        <circle cx="300" cy="260" r="3" />
      </g>
      <g stroke="#BA203B" strokeWidth="2">
        <path d="M20 150 l6 0 M23 147 l0 6" strokeLinecap="round" />
        <path d="M310 60 l8 0 M314 56 l0 8" strokeLinecap="round" />
      </g>
    </svg>
  );
}
