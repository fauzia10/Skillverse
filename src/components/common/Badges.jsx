import React from "react";
import { AlertTriangle, Check } from "lucide-react";

export function LevelBadge({ level }) {
  const styles = {
    Beginner: "bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]",
    Intermediate: "bg-[#EDF9D4] text-[#2E4D0C] font-semibold border border-[#D5F29B]",
    Advanced: "bg-[#111827] text-[#FFFFFF] font-semibold",
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
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FDE5E5] text-[#991B1B] border border-[#F8B6B6] shadow-sm">
        <AlertTriangle size={12} /> High Priority
      </span>
    );
  }
  if (priority === "Medium") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] shadow-sm">
        <AlertTriangle size={12} /> Medium
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#DDF5F2] text-[#0C453E] border border-[#A5E3DC] shadow-sm">
      <Check size={12} /> Verified Ready
    </span>
  );
}

export function BentoTag({ label, color = "default" }) {
  const colors = {
    lime: "bg-[#D5F29B] text-[#2E4D0C]",
    aqua: "bg-[#A5E3DC] text-[#0C453E]",
    coral: "bg-[#F8B6B6] text-[#5C1B1B]",
    dark: "bg-[#111827] text-white",
    default: "bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${colors[color] || colors.default}`}>
      {label}
    </span>
  );
}
