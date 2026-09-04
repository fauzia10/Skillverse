import React from "react";

export function SkillVerseIcon({ size = 36, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logoCrimson" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E23E5B" />
          <stop offset="40%" stopColor="#BA203B" />
          <stop offset="100%" stopColor="#6F0C1D" />
        </linearGradient>
        <linearGradient id="whiteFold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="90%" stopColor="#EDF0F5" />
          <stop offset="100%" stopColor="#D5DCE6" />
        </linearGradient>
      </defs>

      {/* Pixel matrix on top right */}
      <rect x="74" y="16" width="7" height="7" rx="1.5" fill="#BA203B" />
      <rect x="84" y="16" width="7" height="7" rx="1.5" fill="#BA203B" />
      <rect x="74" y="26" width="7" height="7" rx="1.5" fill="#BA203B" />
      <rect x="84" y="26" width="7" height="7" rx="1.5" fill="#BA203B" />
      <rect x="64" y="26" width="7" height="7" rx="1.5" fill="#BA203B" />

      {/* Main Crimson S Loop */}
      <path
        d="M 68 18 
           L 46 34
           C 32 44 32 58 44 68
           L 70 86
           C 78 92 78 100 68 106
           C 50 114 42 100 46 92
           C 48 88 52 84 56 80
           C 58 84 62 90 64 94
           C 68 98 62 102 56 102
           C 50 102 46 96 50 90
           L 38 98
           C 32 106 44 118 64 112
           C 84 106 88 88 74 78
           L 50 62
           C 40 54 42 44 54 36
           L 68 26
           Z"
        fill="url(#logoCrimson)"
      />

      {/* Inner White Ribbon Fold */}
      <path
        d="M 50 48 
           L 72 64 
           C 82 72 84 84 76 96
           C 80 88 80 76 70 68
           L 52 54
           Z"
        fill="url(#whiteFold)"
      />
    </svg>
  );
}

export function SkillVerseLogo({ size = 32, dark = false, showTagline = false, className = "" }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="w-8 h-8 rounded-xl bg-[#12141C] border border-[#2B2D38] flex items-center justify-center shrink-0 shadow-sm">
        <SkillVerseIcon size={24} />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center tracking-[0.2em] font-extrabold text-sm font-display leading-none">
          <span className={dark ? "text-white" : "text-[#101218]"}>SKILL</span>
          <span className="text-[#BA203B]">VERSE</span>
        </div>
        {showTagline && (
          <p className="text-[7.5px] font-semibold tracking-[0.25em] text-[#7A8092] uppercase mt-1">
            YOUR JOURNEY. VERIFIED. LIMITLESS.
          </p>
        )}
      </div>
    </div>
  );
}

export default SkillVerseLogo;
