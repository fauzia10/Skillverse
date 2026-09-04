import React from "react";
import { Search, Bell, HelpCircle, User, ChevronDown } from "lucide-react";

export function Header({ title, onNavigate }) {
  return (
    <header className="sticky top-0 z-30 bg-[#F8F6F8]/90 backdrop-blur-md border-b border-[#E9E2E5] px-4 sm:px-8 py-3.5 flex items-center gap-3">
      <div className="flex-1 min-w-0">
        {title ? (
          <h1 className="text-lg font-bold text-[#101218] truncate font-display">{title}</h1>
        ) : (
          <div className="relative max-w-md hidden sm:block">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A0A6B5]" />
            <input
              type="text"
              placeholder="Search skills, certificates, projects…"
              className="w-full pl-10 pr-4 py-2 rounded-full border border-[#E9E2E5] bg-white text-sm placeholder:text-[#A0A6B5] text-[#101218] focus:outline-none focus:ring-2 focus:ring-[#BA203B] focus:border-transparent transition-all shadow-sm"
            />
          </div>
        )}
      </div>
      <div className="flex items-center gap-1.5 sm:gap-3">
        <button
          className="p-2 rounded-xl hover:bg-white text-[#707584] hover:text-[#101218] relative transition-colors"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#BA203B] ring-2 ring-white" />
        </button>
        <button
          className="p-2 rounded-xl hover:bg-white text-[#707584] hover:text-[#101218] hidden sm:block transition-colors"
          aria-label="Help"
        >
          <HelpCircle size={18} />
        </button>
        <button
          onClick={() => onNavigate?.("profile")}
          className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white transition-colors"
          aria-label="Profile"
        >
          <div className="w-8 h-8 rounded-full bg-[#FCEBEF] border border-[#E9E2E5] flex items-center justify-center">
            <User size={15} className="text-[#BA203B]" />
          </div>
          <ChevronDown size={14} className="text-[#707584] hidden sm:block" />
        </button>
      </div>
    </header>
  );
}

export default Header;
