import React from "react";

export function TextField({ label, ...props }) {
  return (
    <label className="block mb-4">
      <span className="block text-sm font-semibold text-[#101218] mb-1.5">{label}</span>
      <input
        {...props}
        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E2E5] bg-[#FAF8F9] text-[#101218] placeholder:text-[#A0A6B5] focus:outline-none focus:ring-2 focus:ring-[#BA203B] focus:border-transparent transition-all shadow-sm"
      />
    </label>
  );
}

export function TextArea({ label, className = "", ...props }) {
  return (
    <label className={`block mb-4 ${className}`}>
      <span className="block text-sm font-semibold text-[#101218] mb-1.5">{label}</span>
      <textarea
        {...props}
        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E2E5] bg-[#FAF8F9] text-[#101218] placeholder:text-[#A0A6B5] focus:outline-none focus:ring-2 focus:ring-[#BA203B] focus:border-transparent transition-all shadow-sm resize-none"
      />
    </label>
  );
}

export function SelectField({ label, options, ...props }) {
  return (
    <label className="block mb-4">
      <span className="block text-sm font-semibold text-[#101218] mb-1.5">{label}</span>
      <select
        {...props}
        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E2E5] bg-[#FAF8F9] text-[#101218] focus:outline-none focus:ring-2 focus:ring-[#BA203B] focus:border-transparent transition-all shadow-sm"
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
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#BA203B] to-[#911428] text-white text-sm font-semibold hover:from-[#CD2847] hover:to-[#A3182F] active:scale-[0.98] transition-all shadow-[0_4px_14px_rgba(186,32,59,0.25)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BA203B] ${className}`}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-[#E9E2E5] text-[#101218] text-sm font-medium bg-white hover:bg-[#FAF8F9] hover:border-[#D8CED3] active:scale-[0.98] transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BA203B] ${className}`}
    >
      {children}
    </button>
  );
}
