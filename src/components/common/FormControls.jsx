import React from "react";

export function TextField({ label, ...props }) {
  return (
    <label className="block mb-4">
      <span className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-1.5">{label}</span>
      <input
        {...props}
        className="w-full px-4 py-2.5 rounded-2xl border border-[#E2EBF0] bg-[#F4F8FA] text-[#111827] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#111827] focus:bg-white transition-all shadow-sm text-sm"
      />
    </label>
  );
}

export function TextArea({ label, className = "", ...props }) {
  return (
    <label className={`block mb-4 ${className}`}>
      <span className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-1.5">{label}</span>
      <textarea
        {...props}
        className="w-full px-4 py-2.5 rounded-2xl border border-[#E2EBF0] bg-[#F4F8FA] text-[#111827] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#111827] focus:bg-white transition-all shadow-sm resize-none text-sm"
      />
    </label>
  );
}

export function SelectField({ label, options, ...props }) {
  return (
    <label className="block mb-4">
      <span className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-1.5">{label}</span>
      <select
        {...props}
        className="w-full px-4 py-2.5 rounded-2xl border border-[#E2EBF0] bg-[#F4F8FA] text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#111827] focus:bg-white transition-all shadow-sm text-sm"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

export function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-[#111827] text-white text-sm font-semibold hover:bg-[#1F2937] active:scale-[0.98] transition-all shadow-[0_4px_14px_rgba(17,24,39,0.18)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#111827] ${className}`}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl border border-[#E2EBF0] text-[#111827] text-sm font-semibold bg-white hover:bg-[#F4F8FA] hover:border-[#CBD5E1] active:scale-[0.98] transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#111827] ${className}`}
    >
      {children}
    </button>
  );
}

export function AccentButton({ children, color = "lime", className = "", ...props }) {
  const styles = {
    lime: "bg-[#D5F29B] text-[#2E4D0C] hover:bg-[#C8EC84]",
    aqua: "bg-[#A5E3DC] text-[#0C453E] hover:bg-[#92DDD5]",
    coral: "bg-[#F8B6B6] text-[#5C1B1B] hover:bg-[#F6A1A1]",
  };
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold active:scale-[0.98] transition-all shadow-sm ${styles[color] || styles.lime} ${className}`}
    >
      {children}
    </button>
  );
}
