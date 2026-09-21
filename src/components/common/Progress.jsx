import React from "react";

export function ProgressBar({ value, colorClass = "bg-[#00C0F3]" }) {
  return (
    <div className="w-full h-2.5 rounded-full bg-[#1F293D] overflow-hidden">
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
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#1F293D" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#00C0F3"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold text-[#F1F5F9]">{value}%</span>
        {label && <span className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider">{label}</span>}
      </div>
    </div>
  );
}
