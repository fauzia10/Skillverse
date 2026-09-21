import React from "react";
import { AlertTriangle, Check } from "lucide-react";

export function LevelBadge({ level }) {
  const styles = {
    Beginner: "bg-[#182030] text-[#94A3B8] border border-[#232F47]",
    Intermediate: "bg-[#1B3310] text-[#A3E635] font-semibold border border-[#2D5A1B]",
    Advanced: "bg-[#00C0F3] text-[#0A0D14] font-bold shadow-[0_2px_10px_rgba(0,192,243,0.3)]",
  };
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-[11px] tracking-wide font-medium shadow-sm ${styles[level] || styles.Beginner}`}>
      {level}
    </span>
  );
}

export function PriorityBadge({ priority }) {
  if (priority === "High") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#36121C] text-[#FB7185] border border-[#541B2C] shadow-sm">
        <AlertTriangle size={12} /> High Priority
      </span>
    );
  }
  if (priority === "Medium") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#3A2A10] text-[#FBBF24] border border-[#5C4218] shadow-sm">
        <AlertTriangle size={12} /> Medium
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0D2D3E] text-[#00C0F3] border border-[#164863] shadow-sm">
      <Check size={12} /> Verified Ready
    </span>
  );
}

export function BentoTag({ label, color = "default" }) {
  const colors = {
    lime: "bg-[#1B3310] text-[#A3E635] border border-[#2D5A1B]",
    aqua: "bg-[#0D2D3E] text-[#00C0F3] border border-[#164863]",
    coral: "bg-[#36121C] text-[#FB7185] border border-[#541B2C]",
    dark: "bg-[#182030] text-[#F1F5F9] border border-[#232F47]",
    default: "bg-[#182030] text-[#94A3B8] border border-[#232F47]",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${colors[color] || colors.default}`}>
      {label}
    </span>
  );
}
