import React, { useState } from "react";
import {
  LayoutDashboard,
  Award,
  ClipboardCheck,
  Target,
  TrendingUp,
  FolderKanban,
  FileBadge,
  LineChart as LineChartIcon,
  Settings,
  User,
  ChevronDown,
  Headphones,
  Mic,
  Bell,
  Sliders,
  MoreVertical,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { SkillVerseIcon } from "../common/Logo";

export function Sidebar({ activePage, onNavigate, mobileOpen, setMobileOpen }) {
  const [openSections, setOpenSections] = useState({
    menu: true,
    skills: true,
    showcase: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const menuItems = [
    { id: "dashboard", label: "My Activity", icon: LayoutDashboard },
    { id: "progress", label: "My Stats", icon: LineChartIcon },
    { id: "profile", label: "Overview", icon: User },
  ];

  const skillItems = [
    { id: "skills", label: "Skills List", icon: Award },
    { id: "assessments", label: "Proof Ledger", icon: ClipboardCheck },
    { id: "gap", label: "Gap Analysis", icon: TrendingUp },
  ];

  const showcaseItems = [
    { id: "projects", label: "Projects", icon: FolderKanban },
    { id: "certificates", label: "Certificates", icon: FileBadge },
    { id: "goal", label: "Career Goal", icon: Target },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const renderNavGroup = (title, items, sectionKey) => (
    <div className="mb-4">
      <div
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between px-3 py-1 text-xs font-bold text-[#64748B] uppercase tracking-wider cursor-pointer hover:text-[#111827] select-none"
      >
        <span>{title}</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${
            openSections[sectionKey] ? "rotate-0" : "-rotate-90 text-[#94A3B8]"
          }`}
        />
      </div>

      {openSections[sectionKey] && (
        <div className="space-y-1 mt-1">
          {items.map((item) => {
            const Icon = item.icon;
            const active = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileOpen?.(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all select-none ${
                  active
                    ? "bg-[#111827] text-white shadow-sm"
                    : "text-[#64748B] hover:bg-white hover:text-[#111827]"
                }`}
              >
                <Icon
                  size={16}
                  className={`shrink-0 ${active ? "text-white" : "text-[#64748B]"}`}
                />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col shrink-0 w-60 h-screen sticky top-0 bg-[#EBF2F6] border-r border-[#E2EBF0] p-4 justify-between z-40 overflow-y-auto">
        {/* Top Logo */}
        <div>
          <div className="flex items-center gap-2.5 px-3 py-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-[#111827] flex items-center justify-center shadow-sm shrink-0">
              <SkillVerseIcon size={20} />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-[#111827] font-display">
                SkillVerse
              </span>
            </div>
          </div>

          {/* Navigation Groups */}
          <nav className="space-y-1">
            {renderNavGroup("Menu", menuItems, "menu")}
            {renderNavGroup("Skills & Growth", skillItems, "skills")}
            {renderNavGroup("Showcase", showcaseItems, "showcase")}
          </nav>
        </div>

        {/* Bottom Floating Micro-Dock & Profile Widget */}
        <div className="mt-4 pt-2">
          {/* Micro-Control Dock */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-[#E2EBF0] p-2 shadow-sm mb-2.5">
            <div className="flex items-center justify-between text-[#64748B] px-1">
              <button className="p-1.5 rounded-xl hover:bg-[#F1F5F9] hover:text-[#111827] transition-colors" title="Audio / Support">
                <Headphones size={15} />
              </button>
              <button className="p-1.5 rounded-xl hover:bg-[#F1F5F9] hover:text-[#111827] transition-colors" title="Voice Input">
                <Mic size={15} />
              </button>
              <button className="p-1.5 rounded-xl hover:bg-[#F1F5F9] hover:text-[#111827] relative transition-colors" title="Notifications">
                <Bell size={15} />
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#2D9F75] text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                  2
                </span>
              </button>
              <button
                onClick={() => onNavigate("settings")}
                className="p-1.5 rounded-xl hover:bg-[#F1F5F9] hover:text-[#111827] transition-colors"
                title="Settings"
              >
                <Sliders size={15} />
              </button>
            </div>
          </div>

          {/* User Mini Card */}
          <div
            onClick={() => onNavigate("profile")}
            className="flex items-center justify-between p-2 rounded-2xl bg-white border border-[#E2EBF0] shadow-sm hover:border-[#CBD5E1] cursor-pointer transition-all"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80"
                alt="Rahul Sharma"
                className="w-8 h-8 rounded-xl object-cover border border-white shrink-0"
              />
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-[#111827] truncate font-display">Rahul Sharma</h4>
                <p className="text-[10px] text-[#64748B] truncate">rahul@university.edu</p>
              </div>
            </div>
            <button className="p-1 text-[#94A3B8] hover:text-[#111827] transition-colors">
              <MoreVertical size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E2EBF0] flex items-center justify-around px-2 py-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[10px] font-semibold transition-colors ${
                active ? "text-[#111827] font-bold" : "text-[#64748B]"
              }`}
            >
              <Icon size={18} />
              <span>{item.label.split(" ")[0]}</span>
            </button>
          );
        })}
        <button
          onClick={() => setMobileOpen(true)}
          className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[10px] font-semibold text-[#64748B]"
        >
          <Menu size={18} />
          <span>More</span>
        </button>
      </nav>

      {/* Mobile Slide-Up Menu */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-[#111827]/50 backdrop-blur-sm"
          onMouseDown={(e) => e.target === e.currentTarget && setMobileOpen(false)}
        >
          <div className="absolute bottom-0 left-0 right-0 bg-[#EBF2F6] rounded-t-[32px] p-5 max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#111827] flex items-center justify-center text-white">
                  <SkillVerseIcon size={20} />
                </div>
                <span className="font-extrabold text-base text-[#111827] tracking-tight">SkillVerse</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#64748B]"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3">
              {renderNavGroup("Menu", menuItems, "menu")}
              {renderNavGroup("Skills & Growth", skillItems, "skills")}
              {renderNavGroup("Showcase", showcaseItems, "showcase")}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
