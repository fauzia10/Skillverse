import React from "react";
import { Smartphone, Globe, Cpu, Briefcase, BadgeCheck } from "lucide-react";
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

export function StudentDeskIllustration({ avatar, name = "Rahul" }) {
  return (
    <div className="relative w-full max-w-[340px] h-[240px] flex items-end justify-center select-none overflow-visible">
      {/* Decorative ambient dots and sparkles like the reference banner */}
      <div className="absolute top-2 right-12 w-2 h-2 rounded-full bg-[#BA203B]/30 animate-ping" />
      <div className="absolute top-8 left-10 w-2.5 h-2.5 rounded-full bg-[#BA203B]/40" />
      <div className="absolute top-3 right-28 text-[#BA203B]/40 text-sm font-bold">✦</div>
      <div className="absolute top-14 right-4 text-[#BA203B]/40 text-xs font-bold">+</div>
      <div className="absolute top-20 left-4 text-[#BA203B]/30 text-xs font-bold">✦</div>

      {/* Ergonomic Office Chair Back */}
      <div className="absolute bottom-14 right-20 w-28 h-36 rounded-t-full bg-gradient-to-b from-[#2A2D3A] via-[#1C1F2B] to-[#101218] shadow-lg" />

      {/* Character: Shoulders + Real Profile Picture Head */}
      <div className="relative z-10 flex flex-col items-center -mb-2 mr-8">
        {/* Profile Avatar Head (Replaces bitmoji/cartoon head with student's actual profile pic) */}
        <div className="relative group cursor-pointer" title="Your Profile Identity">
          <img
            src={avatar}
            alt={name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white shadow-2xl ring-2 ring-[#BA203B]/30 group-hover:scale-105 transition-transform duration-200"
          />
          <div
            className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#2D9F75] border-2 border-white flex items-center justify-center text-white shadow"
            title="Verified Student Identity"
          >
            <BadgeCheck size={14} />
          </div>
        </div>

        {/* Character Cardigan / Jacket (Stylish Crimson & White like reference) */}
        <div className="w-28 h-14 rounded-t-3xl bg-gradient-to-r from-[#BA203B] via-[#E23E5B] to-[#831124] shadow-md mt-[-6px] flex items-center justify-center overflow-hidden">
          <div className="w-10 h-12 bg-white rounded-t-full mt-2 opacity-95 shadow-inner" />
        </div>
      </div>

      {/* Desk and Workstation Foreground */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        {/* Coffee Cup and Laptop on Desk */}
        <div className="relative flex items-end justify-between px-4 pb-1">
          {/* Steaming Coffee Mug */}
          <div className="relative flex flex-col items-center ml-2">
            <div className="flex gap-1 mb-1">
              <span className="w-1 h-3 rounded-full bg-[#BA203B]/40 animate-[bounce_1.6s_infinite]" />
              <span className="w-1 h-4 rounded-full bg-[#BA203B]/60 animate-[bounce_1.6s_infinite_0.3s]" />
            </div>
            <div className="w-7 h-8 bg-white border border-[#E9E2E5] rounded-b-lg shadow-sm flex items-center justify-center relative">
              <div className="w-2.5 h-3.5 border-2 border-[#E9E2E5] rounded-r-full absolute -right-2 top-1.5" />
              <span className="text-[10px] text-[#BA203B]">☕</span>
            </div>
          </div>

          {/* Open Laptop Screen */}
          <div className="relative mr-4 flex flex-col items-center">
            {/* Laptop Display Screen */}
            <div className="w-28 sm:w-32 h-20 rounded-t-xl bg-[#101218] border-2 border-[#262934] p-1.5 shadow-xl relative">
              <div className="w-full h-full rounded bg-[#1C1F2B] p-1.5 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#BA203B]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E23E5B]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2D9F75]" />
                  </div>
                  <span className="text-[7px] text-[#707584] font-mono font-bold">SkillVerse</span>
                </div>
                <div className="space-y-1">
                  <div className="w-3/4 h-1 rounded bg-[#BA203B]" />
                  <div className="w-1/2 h-1 rounded bg-[#707584]/60" />
                  <div className="w-2/3 h-1 rounded bg-[#2D9F75]" />
                </div>
                <div className="flex justify-end">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#BA203B]/30 flex items-center justify-center">
                    <span className="text-[7px] text-[#BA203B]">⚡</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Laptop Base / Keyboard */}
            <div className="w-36 sm:w-40 h-2 bg-[#262934] rounded-b-lg shadow-md" />
          </div>
        </div>

        {/* Beveled 3D Desk Platform */}
        <div className="w-full h-3.5 bg-white border-t-2 border-b-4 border-t-[#E9E2E5] border-b-[#DCD5D8] rounded-xl shadow-[0_4px_14px_rgba(16,18,24,0.08)]" />
      </div>
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
