import React from "react";
import { Search, Mic, Command, Bell, HelpCircle, User, ChevronDown, Sparkles, Layers } from "lucide-react";

export function Header({ title, onNavigate }) {
  return (
    <header className="sticky top-0 z-30 bg-[#EBF2F6]/90 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 transition-all">
      {/* Left / Title or Search Pill */}
      <div className="flex-1 max-w-xl">
        {title ? (
          <h1 className="text-xl sm:text-2xl font-black text-[#111827] truncate font-display tracking-tight">
            {title}
          </h1>
        ) : (
          <div className="relative max-w-md w-full">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Search skills, verified certificates, proofs…"
              className="w-full pl-9 pr-20 py-2 rounded-full border border-[#E2EBF0] bg-white text-xs placeholder:text-[#94A3B8] text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#111827] focus:border-transparent transition-all shadow-sm"
            />
            {/* Keyboard shortcut & mic icon on right */}
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-[#94A3B8]">
              <span className="flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]">
                ⌘K
              </span>
              <button className="hover:text-[#111827] transition-colors p-0.5" title="Voice Search">
                <Mic size={13} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Right Side: Notifications & User Profile */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          className="w-9 h-9 rounded-full bg-white border border-[#E2EBF0] hover:bg-[#F4F8FA] text-[#64748B] hover:text-[#111827] relative flex items-center justify-center shadow-sm transition-all"
          aria-label="Notifications"
        >
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#2D9F75] ring-2 ring-white" />
        </button>

        <button
          onClick={() => onNavigate?.("profile")}
          className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full bg-white border border-[#E2EBF0] hover:bg-[#F4F8FA] shadow-sm transition-all"
          aria-label="Profile"
        >
          <img
            src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80"
            alt="Profile"
            className="w-7 h-7 rounded-full object-cover border border-white"
          />
          <ChevronDown size={13} className="text-[#64748B] hidden sm:block" />
        </button>
      </div>
    </header>
  );
}

export default Header;
