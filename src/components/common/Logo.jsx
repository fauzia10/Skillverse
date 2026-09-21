import React, { useState } from "react";

export function SkillVerseIcon({ size = 36, className = "" }) {
  const [useFallback, setUseFallback] = useState(false);

  if (!useFallback) {
    return (
      <img
        src="./logo.png"
        alt="SkillVerse Logo"
        onError={() => setUseFallback(true)}
        className={`object-contain rounded-lg ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Top Green-to-Cyan Gradient */}
        <linearGradient id="svTopGrad" x1="10%" y1="10%" x2="90%" y2="80%">
          <stop offset="0%" stopColor="#A3E635" />
          <stop offset="45%" stopColor="#2DD4BF" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>

        {/* Bottom Cyan-to-Blue Gradient */}
        <linearGradient id="svBottomGrad" x1="20%" y1="20%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#00C8FF" />
          <stop offset="60%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>

        {/* Inner Fold Depth Gradient */}
        <linearGradient id="svFoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0369A1" stopOpacity="1" />
        </linearGradient>

        {/* Subtle Highlight */}
        <linearGradient id="svHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Floating Pixel Matrix on Top-Right */}
      <rect x="74" y="14" width="7" height="7" rx="1.5" fill="#A3E635" />
      <rect x="63" y="16" width="6" height="6" rx="1.5" fill="#22D3EE" />
      <rect x="72" y="24" width="6" height="6" rx="1.5" fill="#06B6D4" />
      <rect x="54" y="22" width="6" height="6" rx="1.5" fill="#38BDF8" />
      <rect x="54" y="31" width="6" height="6" rx="1.5" fill="#00C8FF" />

      {/* Lower Ribbon Loop (Cyan to Blue tail) */}
      <path
        d="M 44 48
           C 54 44 68 50 72 62
           C 76 74 68 84 56 86
           C 46 88 34 82 24 94
           L 16 96
           C 18 84 26 76 36 72
           C 46 68 56 66 52 56
           C 50 52 46 50 44 48
           Z"
        fill="url(#svBottomGrad)"
      />

      {/* Main Upper Ribbon Loop (Spring Green to Cyan) */}
      <path
        d="M 52 18
           C 40 18 28 26 22 36
           C 16 46 18 58 28 66
           C 36 72 46 68 52 62
           C 56 58 54 54 48 52
           C 40 50 32 46 34 38
           C 36 30 44 26 52 26
           C 55 26 58 28 60 30
           L 66 22
           C 62 19 57 18 52 18
           Z"
        fill="url(#svTopGrad)"
      />

      {/* 3D Fold Twist Overlay */}
      <path
        d="M 36 50
           C 42 46 50 46 56 52
           C 60 56 58 64 48 68
           C 42 66 38 58 36 50
           Z"
        fill="url(#svFoldGrad)"
        opacity="0.85"
      />

      {/* Top Edge Highlight */}
      <path
        d="M 52 18
           C 40 18 28 26 22 36
           C 20 40 20 44 22 48
           C 21 44 22 38 26 34
           C 32 26 42 22 52 22
           L 58 20
           Z"
        fill="url(#svHighlight)"
      />
    </svg>
  );
}

export function SkillVerseLogo({
  size = 40,
  className = "",
}) {
  return (
    <div className={`flex items-center ${className}`}>
      <SkillVerseIcon size={size} className="w-auto max-w-full object-contain" />
    </div>
  );
}

export default SkillVerseLogo;
