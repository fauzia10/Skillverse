import React from "react";
import { Search, Mic, Command, Bell, HelpCircle, User, ChevronDown, Sparkles, Layers } from "lucide-react";

export function Header({ title, onNavigate }) {
  return (
    <header className="sticky top-0 z-30 bg-[#0A0D14]/90 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 border-b border-[#1F293D]/60 transition-all">
      {/* Left / Title or Search Pill */}
      <div className="flex-1 max-w-xl">
        {title ? (
          <h1 className="text-xl sm:text-2xl font-black text-[#F1F5F9] truncate font-display tracking-tight">
            {title}
          </h1>
        ) : (
          <div className="relative max-w-md w-full">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
            <input
              type="text"
              placeholder="Search skills, verified certificates, proofs…"
              className="w-full pl-9 pr-20 py-2 rounded-full border border-[#1F293D] bg-[#131824] text-xs placeholder:text-[#64748B] text-[#F1F5F9] focus:outline-none focus:ring-2 focus:ring-[#00C0F3] focus:border-transparent transition-all shadow-sm"
            />
            {/* Keyboard shortcut & mic icon on right */}
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-[#64748B]">
              <span className="flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-[#182030] text-[#94A3B8] border border-[#232F47]">
                ⌘K
              </span>
              <button className="hover:text-[#F1F5F9] transition-colors p-0.5" title="Voice Search">
                <Mic size={13} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Right Side: Quick Action & Notifications */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          className="w-9 h-9 rounded-full bg-[#131824] border border-[#1F293D] hover:bg-[#182030] text-[#94A3B8] hover:text-[#F1F5F9] relative flex items-center justify-center shadow-sm transition-all"
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#10B981] ring-2 ring-[#131824]" />
        </button>
      </div>
    </header>
  );
}

export default Header;
