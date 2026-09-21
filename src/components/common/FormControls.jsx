import React from "react";

export function TextField({ label, ...props }) {
  return (
    <label className="block mb-4">
      <span className="block text-xs font-bold text-[#F1F5F9] uppercase tracking-wider mb-1.5">{label}</span>
      <input
        {...props}
        className="w-full px-4 py-2.5 rounded-2xl border border-[#232F47] bg-[#182030] text-[#F1F5F9] placeholder:text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#00C0F3] focus:bg-[#1E293B] transition-all shadow-sm text-sm"
      />
    </label>
  );
}

export function TextArea({ label, className = "", ...props }) {
  return (
    <label className={`block mb-4 ${className}`}>
      <span className="block text-xs font-bold text-[#F1F5F9] uppercase tracking-wider mb-1.5">{label}</span>
      <textarea
        {...props}
        className="w-full px-4 py-2.5 rounded-2xl border border-[#232F47] bg-[#182030] text-[#F1F5F9] placeholder:text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#00C0F3] focus:bg-[#1E293B] transition-all shadow-sm resize-none text-sm"
      />
    </label>
  );
}

export function SelectField({ label, options, ...props }) {
  return (
    <label className="block mb-4">
      <span className="block text-xs font-bold text-[#F1F5F9] uppercase tracking-wider mb-1.5">{label}</span>
      <select
        {...props}
        className="w-full px-4 py-2.5 rounded-2xl border border-[#232F47] bg-[#182030] text-[#F1F5F9] focus:outline-none focus:ring-2 focus:ring-[#00C0F3] focus:bg-[#1E293B] transition-all shadow-sm text-sm"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#131824] text-[#F1F5F9]">
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
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-[#00C0F3] text-[#0A0D14] text-sm font-bold hover:bg-[#38BDF8] active:scale-[0.98] transition-all shadow-[0_4px_18px_rgba(0,192,243,0.35)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00C0F3] ${className}`}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl border border-[#232F47] text-[#F1F5F9] text-sm font-semibold bg-[#182030] hover:bg-[#202B40] hover:border-[#2A3754] active:scale-[0.98] transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00C0F3] ${className}`}
    >
      {children}
    </button>
  );
}

export function AccentButton({ children, color = "lime", className = "", ...props }) {
  const styles = {
    lime: "bg-[#A3E635] text-[#0A0D14] hover:bg-[#BEF264]",
    aqua: "bg-[#00C0F3] text-[#0A0D14] hover:bg-[#38BDF8]",
    coral: "bg-[#FB7185] text-[#0A0D14] hover:bg-[#FDA4AF]",
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
