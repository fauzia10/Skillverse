import React from "react";

export function ProgressBar({ value, colorClass = "bg-[#BA203B]" }) {
  return (
    <div className="w-full h-2.5 rounded-full bg-[#EFE8EB] overflow-hidden">
      <div
        className={`h-full rounded-full ${colorClass} transition-all duration-700 ease-out`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export function CircularProgress({ value, size = 96, stroke = 9, label }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="circleCrimson" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E23E5B" />
            <stop offset="100%" stopColor="#BA203B" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#EFE8EB" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#circleCrimson)"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold text-[#101218]">{value}%</span>
        {label && <span className="text-[10px] font-semibold text-[#707584] uppercase tracking-wider">{label}</span>}
      </div>
    </div>
  );
}
