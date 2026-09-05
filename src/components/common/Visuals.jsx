import React from "react";
import { Smartphone, Globe, Cpu, Briefcase, BadgeCheck, Phone, Mail, MapPin, Building2, Lock, Edit3 } from "lucide-react";
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
      <div className={`relative overflow-hidden rounded-2xl ${className}`} style={{ background: "linear-gradient(135deg,#EDF9D4,#FFFFFF)" }}>
        <svg viewBox="0 0 300 160" className={common} preserveAspectRatio="none">
          <polyline points="10,120 60,100 110,110 160,70 210,85 290,40" fill="none" stroke="#2E4D0C" strokeWidth="3" strokeLinecap="round" />
          <polyline points="10,140 60,130 110,120 160,125 210,100 290,95" fill="none" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
          {[10, 60, 110, 160, 210, 290].map((x, i) => (
            <circle key={i} cx={x} cy={[120, 100, 110, 70, 85, 40][i]} r="4" fill="#2E4D0C" />
          ))}
        </svg>
      </div>
    );
  }
  if (variant === "expense") {
    return (
      <div className={`relative overflow-hidden rounded-2xl ${className}`} style={{ background: "linear-gradient(135deg,#DDF5F2,#FFFFFF)" }}>
        <svg viewBox="0 0 300 160" className={common} preserveAspectRatio="none">
          <rect x="30" y="30" width="240" height="100" rx="14" fill="#FFFFFF" stroke="#E2EBF0" />
          <rect x="48" y="50" width="60" height="8" rx="4" fill="#0C453E" />
          <rect x="48" y="66" width="100" height="6" rx="3" fill="#E2EBF0" />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={48 + i * 40} y={100 - [30, 45, 20, 38, 26][i]} width="20" height={[30, 45, 20, 38, 26][i]} rx="4" fill={i % 2 ? "#0C453E" : "#111827"} />
          ))}
        </svg>
      </div>
    );
  }
  if (variant === "campus") {
    return (
      <div className={`relative overflow-hidden rounded-2xl ${className}`} style={{ background: "linear-gradient(135deg,#FDE5E5,#FFFFFF)" }}>
        <svg viewBox="0 0 300 160" className={common} preserveAspectRatio="none">
          <rect x="24" y="24" width="252" height="24" rx="8" fill="#111827" />
          <circle cx="40" cy="36" r="4" fill="#F8B6B6" />
          <circle cx="54" cy="36" r="4" fill="#5C1B1B" />
          <rect x="24" y="60" width="118" height="76" rx="10" fill="#FFFFFF" stroke="#E2EBF0" />
          <rect x="154" y="60" width="118" height="36" rx="10" fill="#FFFFFF" stroke="#E2EBF0" />
          <rect x="154" y="100" width="118" height="36" rx="10" fill="#FFFFFF" stroke="#E2EBF0" />
          <rect x="38" y="76" width="90" height="8" rx="4" fill="#5C1B1B" />
          <rect x="38" y="92" width="70" height="6" rx="3" fill="#E2EBF0" />
          <rect x="38" y="106" width="80" height="6" rx="3" fill="#E2EBF0" />
        </svg>
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`} style={{ background: "linear-gradient(135deg,#EBF2F6,#FFFFFF)" }}>
      <svg viewBox="0 0 300 160" className={common} preserveAspectRatio="none">
        <rect x="120" y="30" width="60" height="60" rx="8" fill="#111827" />
        <line x1="150" y1="90" x2="150" y2="120" stroke="#64748B" strokeWidth="3" />
        <circle cx="90" cy="130" r="10" fill="#2E4D0C" />
        <circle cx="150" cy="135" r="10" fill="#0C453E" />
        <circle cx="210" cy="130" r="10" fill="#5C1B1B" />
        <line x1="90" y1="130" x2="150" y2="120" stroke="#64748B" strokeWidth="2" />
        <line x1="210" y1="130" x2="150" y2="120" stroke="#64748B" strokeWidth="2" />
      </svg>
    </div>
  );
}

export function CertificateVisual({ index = 0, className = "" }) {
  const palette = CERT_PALETTES[index % CERT_PALETTES.length];
  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`} style={{ background: palette.bg }}>
      <svg viewBox="0 0 300 160" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <rect x="26" y="24" width="248" height="112" rx="12" fill="#FFFFFF" stroke="#E2EBF0" />
        <rect x="42" y="42" width="130" height="8" rx="4" fill="#111827" />
        <rect x="42" y="58" width="90" height="6" rx="3" fill="#E2EBF0" />
        <rect x="42" y="72" width="110" height="6" rx="3" fill="#E2EBF0" />
        <circle cx="230" cy="90" r="26" fill={palette.seal} opacity="0.9" />
        <path d="M230 74 l5 11 12 1 -9 8 3 12 -11 -6 -11 6 3 -12 -9 -8 12 -1 z" fill="#FFFFFF" opacity="0.9" />
        <path d="M216 112 l-8 18 12 -4 6 10 8 -18z" fill={palette.ribbon} />
      </svg>
    </div>
  );
}
