import React from "react";
import { Check } from "lucide-react";

export function Toast({ message, show }) {
  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-2.5 bg-[#101218] text-white px-5 py-3 rounded-full shadow-2xl border border-[#2B2E3C] text-sm font-semibold">
        <div className="w-5 h-5 rounded-full bg-[#BA203B] flex items-center justify-center">
          <Check size={13} className="text-white" />
        </div>
        {message}
      </div>
    </div>
  );
}

export default Toast;
