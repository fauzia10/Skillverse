import React, { useState } from "react";
import { User, Menu, X } from "lucide-react";
import { NAV_ITEMS } from "../../constants/navigation";
import { SkillVerseIcon } from "../common/Logo";

export function Sidebar({ activePage, onNavigate, mobileOpen, setMobileOpen }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {/* Desktop sidebar — expands on hover */}
      <aside
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        className={`hidden md:flex md:flex-col shrink-0 h-screen sticky top-0 bg-white border-r border-[#E9E2E5] py-5 transition-[width] duration-200 ease-out overflow-hidden z-40 ${
          expanded ? "w-24 shadow-[4px_0_24px_rgba(186,32,59,0.06)]" : "w-12"
        }`}
      >
        <div className="flex flex-col items-center gap-1.5 mb-5 px-1">
          <div className="w-9 h-9 shrink-0 rounded-xl bg-[#101218] border border-[#2B2D38] flex items-center justify-center shadow-sm">
            <SkillVerseIcon size={26} />
          </div>
          {expanded && (
            <div className="text-center">
              <p className="text-[10px] font-extrabold tracking-[0.15em] text-[#101218] font-display leading-none">
                SKILL<span className="text-[#BA203B]">VERSE</span>
              </p>
            </div>
          )}
        </div>

        <nav className="flex-1 px-1.5 space-y-1 overflow-y-auto overflow-x-hidden">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                aria-label={item.label}
                className={`w-full flex flex-col items-center gap-1 py-2 px-0.5 rounded-xl text-center transition-all ${
                  active
                    ? "bg-[#FCEBEF] text-[#BA203B] font-semibold shadow-sm"
                    : "text-[#707584] hover:bg-[#F8F6F8] hover:text-[#101218]"
                }`}
              >
                <Icon size={17} className={`shrink-0 ${active ? "text-[#BA203B]" : "text-[#707584]"}`} />
                {expanded && (
                  <span className="text-[9px] leading-[1.15] break-words">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="px-1.5 pt-3 mt-3 border-t border-[#E9E2E5]">
          <button
            onClick={() => onNavigate("profile")}
            className="w-full flex flex-col items-center gap-1 py-2 rounded-xl hover:bg-[#F8F6F8] transition-colors"
          >
            <div className="w-7 h-7 shrink-0 rounded-full bg-[#FCEBEF] border border-[#E9E2E5] flex items-center justify-center">
              <User size={13} className="text-[#BA203B]" />
            </div>
            {expanded && <span className="text-[9px] text-[#101218] font-medium leading-tight">Rahul</span>}
          </button>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E9E2E5] flex items-center justify-around px-1 py-1.5">
        {NAV_ITEMS.slice(0, 4).map((item) => {
          const Icon = item.icon;
          const active = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg min-w-[56px] transition-colors ${
                active ? "text-[#BA203B] font-semibold" : "text-[#707584]"
              }`}
              aria-label={item.label}
            >
              <Icon size={19} />
              <span className="text-[10px]">{item.label.split(" ")[0]}</span>
            </button>
          );
        })}
        <button
          onClick={() => setMobileOpen(true)}
          className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg text-[#707584]"
          aria-label="More navigation"
        >
          <Menu size={19} />
          <span className="text-[10px]">More</span>
        </button>
      </nav>

      {/* Mobile full menu sheet */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-[#101218]/50 backdrop-blur-sm"
          onMouseDown={(e) => e.target === e.currentTarget && setMobileOpen(false)}
        >
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[24px] p-4 max-h-[75vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-3 px-2">
              <div className="flex items-center gap-2">
                <SkillVerseIcon size={22} />
                <span className="font-bold text-sm text-[#101218] tracking-wider">SKILL<span className="text-[#BA203B]">VERSE</span></span>
              </div>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="p-1.5 text-[#707584] hover:text-[#101218]">
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setMobileOpen(false);
                    }}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl text-xs transition-colors ${
                      active ? "bg-[#FCEBEF] text-[#BA203B] font-semibold" : "text-[#707584] hover:bg-[#F8F6F8] hover:text-[#101218]"
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
