import React from "react";
import { AlertTriangle, Check } from "lucide-react";

export function LevelBadge({ level }) {
  const styles = {
    Beginner: "bg-[#F0ECF0] text-[#707584] border border-[#E9E2E5]",
    Intermediate: "bg-[#FCEBEF] text-[#BA203B] font-semibold border border-[#F5CAD3]",
    Advanced: "bg-[#101218] text-[#FFFFFF] font-semibold",
  };
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] ${styles[level] || styles.Beginner}`}>
      {level}
    </span>
  );
}

export function PriorityBadge({ priority }) {
  if (priority === "High") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FCEBEF] text-[#BA203B] border border-[#F5CAD3]">
        <AlertTriangle size={12} /> High
      </span>
    );
  }
  if (priority === "Medium") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]">
        <AlertTriangle size={12} /> Medium
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#E8F7F1] text-[#1B7352] border border-[#C6EFE0]">
      <Check size={12} /> Ready
    </span>
  );
}
